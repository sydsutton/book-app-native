//firebase authentification
//hooks

import React, {Component} from 'react';
import { View, StyleSheet, ImageBackground, ScrollView, Image, Modal, ActivityIndicator } from "react-native"
import { Picker } from "@react-native-picker/picker"
import { Card, Button, Icon, Text, SearchBar } from "react-native-elements"
import GENRES from "../booksData/GENRES"
import { connect } from "react-redux"
import { saveBook } from "../redux/ActionCreators"
import { deleteBook } from "../redux/ActionCreators"

const mapStateToProps = state => {
    return {
        books: state.save.books,
        user: state.profile,
        readBooks: state.read.readBooks
    }
}

const mapDispatchToProps = {
    saveBook,
    deleteBook
}

class HomeComponent extends Component {
    constructor(props){
        super(props)
        this.state = {
            isSubjectOpen: false,
            isTitleOpen: false,
            search: "",
            searchData: null,
            selectedBookType: "",
            genres: GENRES, 
            searchedBooks: "", 
            isLoading: false,
            bookDescription: {},
        }
        this.handleChange = this.handleChange.bind(this)
    }

    toggleSubjectModal = () => {
        this.setState({
            isSubjectOpen: !this.state.isSubjectOpen
        })
    }

    toggleTitleModal = () => {
        this.setState({
            isTitleOpen: !this.state.isTitleOpen
        })
    }

    async getDescription(props){
        const bookKey = props
        const res = await fetch(`https://openlibrary.org${bookKey}.json`)
        if(res.status === 200){
            const data = await res.json()
            this.setState({
                bookDescription: {
                    title: data.title,
                    covers: data.covers,
                    description: data.description,
                    subjectPlaces: data.subject_places,
                    places: data.places
                },
            })
        } else {
            alert("Sorry, something went wrong")
        }
    }

    updateSearch = (search) => {
        this.setState({
            search
        })
    }

    async handleSearch(props){
        this.setState({searchedBooks: null, isLoading: true, selectedBookType: "", searchData: null})
        const searchValue = props
        const res = await fetch(`http://openlibrary.org/search.json?q=${searchValue}`)
        if(res.status === 200){
            const data = await res.json()
            this.setState({
                searchData: data.docs.slice(0,20)
            })
        } else {
            alert("Sorry, something went wrong")
        }
        this.setState({isLoading: false})
    }

    async handleChange(props){
        this.setState({searchedBooks: null, searchData: null, search: ""})
        const selectedValue = props
        this.setState({
            selectedBookType: props,
            isLoading: true
        })
        const url = `https://openlibrary.org/subjects/${selectedValue}.json?limit=20`
                                                       
        const res = await fetch(url)
        if(res.status === 200){
            const data = await res.json()
            this.setState({
                searchedBooks: data.works
            })
        } else {
            alert('Sorry, but something went wrong')
        }
        this.setState({
            isLoading: false
        })
    }

    render(){
        const {search} = this.state

        return (
            <ImageBackground source={require("../images/coverImage.jpg")} style={styles.imageBackground}>
                <View>
                    <ScrollView>
                        <SearchBar
                            placeholder="Search by title"
                            lightTheme
                            containerStyle={{backgroundColor: "transparent", marginTop: 75}}
                            inputContainerStyle={styles.inputContainer}
                            onChangeText={this.updateSearch}
                            value={search}
                        />
                        <Button 
                            onPress={() => this.handleSearch(this.state.search)} 
                            buttonStyle={styles.searchButton} 
                            title="Search" 
                        />
                        <Text style={styles.orText}>OR</Text>
                        <View style={styles.outerContainer}>
                            <View style={styles.innerContainer}>
                                <Picker
                                    style={styles.picker}
                                    mode="dropdown"
                                    onValueChange={(itemValue) => this.handleChange(itemValue)}
                                    selectedValue={this.state.selectedBookType}
                                >
                                    <Picker.Item label="Search by subject" value="" />
                                    {this.state.genres ? this.state.genres.map(genre => {
                                        return (
                                            <Picker.Item 
                                                key={genre.value} 
                                                label={genre.name} 
                                                value={genre.value.toLowerCase()} 
                                            />
                                                )
                                            }) : null}
                                </Picker>
                            </View>
                        </View>
                        {this.state.isLoading ? 
                                <View style={styles.loadingContainer}>
                                    <ActivityIndicator size="large" color="rgba(0,0,0,.9)"/>
                                    <Text style={styles.loadingText}>Loading...</Text>
                                </View> : null}
                        <ScrollView horizontal style={{height: 600}}>
                            {this.state.searchedBooks ? this.state.searchedBooks.map(book => {
                                return (
                                    <View key={book.key}>
                                        <Card containerStyle={styles.card}>
                                            <View style={{flexDirection: "row"}}>
                                                {book.cover_edition_key ? 
                                                <Image 
                                                    source={{uri: `https://covers.openlibrary.org/b/OLID/${book.cover_edition_key}.jpg`}}
                                                    style={styles.cardImage}
                                                    alt={book.title} 
                                                /> 
                                                :
                                                <Image 
                                                    source={{uri: `https://cdn.pixabay.com/photo/2020/10/02/17/55/book-5621767_960_720.png`}}
                                                    style={styles.cardImage}
                                                    alt={book.title} 
                                                /> 
                                                }
                                                <View style={{flexDirection: "column", justifyContent: "space-around", marginLeft: 10}}>
                                                    <View>
                                                        <View style={{flexDirection: "row"}}>
                                                            <Text style={styles.cardTitle}>{book.title}</Text>
                                                        </View>
                                                        <View style={{flexDirection: "row"}}>
                                                            <Text style={styles.authorText}>By {book.authors[0] ? book.authors[0].name : 'Unknown'}</Text>
                                                        </View>
                                                    </View>
                                                    <View style={{alignItems: "flex-start", marginTop: 10}}>
                                                        {!this.props.user.isLoggedIn ? 
                                                            <Button 
                                                                disabled={true}
                                                                iconRight
                                                                buttonStyle={styles.loginToSaveButton} 
                                                                title="Login in to save"
                                                            />

                                                            :

                                                            this.props.user.isLoggedIn && this.props.books.includes(book) ? 
                                                                <Button 
                                                                    icon={<Icon name="check" size={15} style={{marginLeft: 10}} color="white" type="font-awesome" />} 
                                                                    iconRight
                                                                    titleStyle={{color: "white"}}
                                                                    buttonStyle={styles.savedButton} 
                                                                    title="Saved"
                                                                    // onPress={() => this.props.deleteBook(book)}
                                                                />
                                                                :
                                                            this.props.readBooks.includes(book) ? 

                                                                <Button 
                                                                    icon={<Icon name="book" size={15} style={{marginLeft: 10}} color="white" type="font-awesome" />} 
                                                                    iconRight
                                                                    buttonStyle={styles.readItButton} 
                                                                    title="You've read it!"
                                                                />
                                                            :
                                                                <Button 
                                                                    icon={<Icon name="book" size={15} style={{marginLeft: 10}} color="white" type="font-awesome" />} 
                                                                    iconRight
                                                                    buttonStyle={styles.saveButton} 
                                                                    title="Save"
                                                                    onPress={() => {
                                                                        this.props.saveBook(book)
                                                                    }}
                                                                />
                                                        }
                                                        <Button 
                                                            icon={<Icon name="info-circle" size={20} color={"white"} style={{marginLeft: 10}} type="font-awesome" />} 
                                                            iconRight
                                                            raised
                                                            buttonStyle={styles.moreInfoButton} 
                                                            title="More Info"
                                                            onPress={() => {
                                                                this.getDescription(book.key)
                                                                this.toggleSubjectModal()
                                                            }}
                                                        />
                                                    </View>
                                                </View>
                                            </View>
                                            <View>
                                            <Modal 
                                                animationType="slide"
                                                visible={this.state.isSubjectOpen} 
                                            >
                                                <ScrollView style={{alignSelf: "center", padding: 20}}>
                                                    <View style={{marginLeft: "auto", margin: 20}}>
                                                        <Icon type="font-awesome" name="times" color={"grey"} onPress={this.toggleSubjectModal}
                                                            title="close" 
                                                        />
                                                    </View>
                                                    <ScrollView horizontal>
                                                        {this.state.bookDescription.covers ? this.state.bookDescription.covers.map(cover => {
                                                            return (
                                                                <View key={cover}>
                                                                    <Image key={cover} style={styles.descriptionImage} source={{uri: `https://covers.openlibrary.org/b/id/${cover}-M.jpg`}} />
                                                                </View>
                                                            )
                                                        }) : null}
                                                    </ScrollView>
                                                    <View style={{alignItems: "center", textAlign: "center"}}>
                                                        <Text h4 style={{textDecorationLine: "underline"}}>{this.state.bookDescription.title ? this.state.bookDescription.title : null}</Text>
                                                    </View>
                                                    {this.state.bookDescription.description && !this.state.bookDescription.description.value ? 
                                                        <Text style={{alignSelf: "center"}}>{this.state.bookDescription.description}</Text> 
                                                    : null}
                                                    {this.state.bookDescription.description && this.state.bookDescription.description.value ? 
                                                        <Text style={{alignSelf: "center"}}>{this.state.bookDescription.description.value}</Text> 
                                                    : null}
                                                    {!this.state.bookDescription.description ? 
                                                        <Text style={{alignSelf: "center"}}>Sorry, but there is no description for this book</Text> 
                                                    : null}
                                                    <View style={{marginBottom: 30}}>
                                                        {this.state.bookDescription.subjectPlaces ? <Text style={{marginTop: 15, fontWeight: "bold"}}>Subject Places: </Text> : null}
                                                        {this.state.bookDescription.subjectPlaces ? this.state.bookDescription.subjectPlaces.map(place => {
                                                            return (
                                                                <Text key={place}>{place}</Text>
                                                            )
                                                        }) : null}
                                                        {this.state.bookDescription.places ? <Text style={{marginTop: 15, fontWeight: "bold"}}>Subject Places: </Text> : null}
                                                        {this.state.bookDescription.places ? this.state.bookDescription.places.map(place => {
                                                            return (
                                                                <Text key={place}>{place}</Text>
                                                            )
                                                        }) : null}
                                                    </View>
                                                </ScrollView>
                                            </Modal>
                                            </View>
                                        </Card>
                                    </View>
                                )
                            }) : null}
                            {this.state.searchData ? this.state.searchData.map(book => {
                                return (
                                    <View key={book.key}>
                                        <Card containerStyle={styles.card}>
                                            <View style={{flexDirection: "row"}}>
                                                {book.cover_edition_key ? 
                                                <Image 
                                                    source={{uri: `https://covers.openlibrary.org/b/OLID/${book.cover_edition_key}.jpg`}}
                                                    style={styles.searchCardImage}
                                                    alt={book.title} 
                                                /> 
                                                : 
                                                <Image 
                                                    source={{uri: `https://cdn.pixabay.com/photo/2020/10/02/17/55/book-5621767_960_720.png`}}
                                                    style={styles.cardImage}
                                                    alt={book.title} 
                                                /> 
                                                }  
                                                <View style={{flexDirection: "column", justifyContent: "space-around", marginLeft: 10}}>
                                                    <View>
                                                        <View style={{flexDirection: "row"}}>
                                                            <Text style={styles.cardTitle}>{book.title}</Text>
                                                        </View>
                                                        <View style={{flexDirection: "row"}}>
                                                        {book.author_name ? 
                                                            <Text style={styles.authorText}>By {book.author_name}</Text>
                                                        : 
                                                        book.authors ? 
                                                            <Text style={styles.authorText}>By {book.authors[0].name}</Text>
                                                        :
                                                            <Text style={styles.authorText}>By Unknown</Text>
                                                        }
                                                        </View>
                                                        <Text style={styles.publishedText}>{book.first_publish_year ? `First published in ${book.first_publish_year}` : null}</Text>
                                                    </View>
                                                    <View style={{alignItems: "flex-start", marginTop: 10}}>
                                                    {!this.props.user.isLoggedIn ? 
                                                            <Button 
                                                                disabled={true}
                                                                iconRight
                                                                buttonStyle={styles.loginToSaveButton} 
                                                                title="Login in to save"
                                                            />

                                                            :

                                                            this.props.user.isLoggedIn && this.props.books.includes(book) ? 
                                                                <Button 
                                                                    icon={<Icon name="check" size={15} style={{marginLeft: 10}} color="white" type="font-awesome" />} 
                                                                    iconRight
                                                                    titleStyle={{color: "white"}}
                                                                    buttonStyle={styles.savedButton} 
                                                                    title="Saved"
                                                                    // onPress={() => this.props.deleteBook(book)}
                                                                />
                                                                :
                                                            this.props.readBooks.includes(book) ? 

                                                                <Button 
                                                                    icon={<Icon name="book" size={15} style={{marginLeft: 10}} color="white" type="font-awesome" />} 
                                                                    iconRight
                                                                    buttonStyle={styles.readItButton} 
                                                                    title="You've read it!"
                                                                />
                                                            :
                                                                <Button 
                                                                    icon={<Icon name="book" size={15} style={{marginLeft: 10}} color="white" type="font-awesome" />} 
                                                                    iconRight
                                                                    buttonStyle={styles.saveButton} 
                                                                    title="Save"
                                                                    onPress={() => {
                                                                        this.props.saveBook(book)
                                                                    }}
                                                                />
                                                        }
                                                        <Button 
                                                            icon={<Icon name="info-circle" size={20} color={"white"} style={{marginLeft: 10}} type="font-awesome" />} 
                                                            iconRight
                                                            raised
                                                            buttonStyle={styles.moreInfoButton} 
                                                            title="More Info"
                                                            onPress={() => {
                                                                this.getDescription(book.key)
                                                                this.toggleTitleModal()
                                                            }}
                                                        />
                                                    </View>
                                                </View>
                                            </View>
                                            <View>
                                            <Modal 
                                                animationType="slide"
                                                visible={this.state.isTitleOpen} 
                                            >
                                                <ScrollView style={{alignSelf: "center", padding: 20}}>
                                                    <View style={{marginLeft: "auto", margin: 20}}>
                                                        <Icon type="font-awesome" name="times" color={"grey"} onPress={this.toggleTitleModal}
                                                            title="close" 
                                                        />
                                                    </View>
                                                    <ScrollView horizontal>
                                                        {this.state.bookDescription.covers ? this.state.bookDescription.covers.map(cover => {
                                                            return (
                                                                <View key={cover}>
                                                                    <Image style={{height:200, width:150, resizeMode: "cover"}} source={{uri: `https://covers.openlibrary.org/b/id/${cover}-M.jpg`}} />
                                                                </View>
                                                            )
                                                        }) : null}
                                                    </ScrollView>
                                                    <View style={{alignItems: "center", textAlign: "center"}}>
                                                        <Text h4 style={{textDecorationLine: "underline"}}>{this.state.bookDescription.title ? this.state.bookDescription.title : null}</Text>
                                                    </View>
                                                    {this.state.bookDescription.description && !this.state.bookDescription.description.value ? 
                                                        <Text style={{alignSelf: "center", marginBottom: 50}}>{this.state.bookDescription.description}</Text> 
                                                    : null}
                                                    {this.state.bookDescription.description && this.state.bookDescription.description.value ? 
                                                        <Text style={{alignSelf: "center", marginBottom: 50}}>{this.state.bookDescription.description.value}</Text> 
                                                    : null}
                                                    {!this.state.bookDescription.description ? 
                                                        <Text style={{alignSelf: "center"}}>Sorry, but there is no description for this book</Text> 
                                                    : null}
                                                    <View style={{marginBottom: 30}}>
                                                        {this.state.bookDescription.subjectPlaces ? <Text style={{marginTop: 15, fontWeight: "bold"}}>Subject Places: </Text> : null}
                                                        {this.state.bookDescription.subjectPlaces ? this.state.bookDescription.subjectPlaces.map(place => {
                                                            return (
                                                                <Text key={place}>{place}</Text>
                                                            )
                                                        }) : null}
                                                    </View>
                                                    {this.state.bookDescription.places ? <Text style={{marginTop: 15, fontWeight: "bold"}}>Subject Places: </Text> : null}
                                                    {this.state.bookDescription.places ? this.state.bookDescription.places.map(place => {
                                                        return (
                                                            <Text key={place}>{place}</Text>
                                                        )
                                                    }) : null}
                                                </ScrollView>
                                            </Modal>
                                            </View>
                                        </Card>
                                    </View>
                                )
                            }) : null}
                        </ScrollView>
                    </ScrollView>
                </View>
            </ImageBackground>
        );    
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    image: {
        height: 300,
        width: 200,
        resizeMode: "cover"
    },
    imageBackground: {
        resizeMode: "cover", 
        flex: 1
    },
    inputContainer: {
        backgroundColor: "#fff", 
        borderRadius: 30
    },
    searchButton: { 
        width: 200, 
        justifyContent: "center", 
        textAlign: "center", 
        alignSelf: "center", 
        borderRadius: 20, 
        marginTop: 15,
        backgroundColor: "rgba(0,0,0,.75)",
    },
    orText: {
        textAlign: "center", 
        fontSize: 25, 
        color: "white", 
        marginTop: 10
    },
    outerContainer: {
        flex: 1,
        justifyContent: "center", 
        alignItems: "center", 
        marginTop: 10,
    },
    innerContainer: {
        backgroundColor: "white", 
        borderRadius: 20, 
        height: 50,
        width: "50%"
    },
    picker: {
        height: 50,
        width: 200, 
        color: "grey", 
        marginLeft: "auto", 
        borderRadius: 30, 
        textAlign: "center", 
        marginBottom: 20,
    },
    loadingContainer: {
        textAlign: "center", 
        justifyContent: "center", 
        marginTop: 50
    },
    loadingText: {
        color: "rgba(0,0,0,.9)", 
        textAlign: "center"
    },
    card: {
        backgroundColor: "white", 
        maxWidth: "95%",
        borderRadius: 20, 
        shadowColor: 'black',
        marginTop: 30,
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 2},
        shadowRadius: 10,
        elevation: 3,
        borderWidth: 0,
        maxWidth: 375
    },
    cardImage: {
        height: 250,
        width: 170, 
        alignSelf: "center", 
        resizeMode: "cover", 
        marginRight: 5, 
        marginLeft: 5, 
        marginTop: 10
    },
    cardTitle: {
        fontWeight: "bold", 
        fontSize: 18,
        color: "rgba(0,0,0,.9)",
        flex: 1
    },
    authorText: {
        marginTop: 20, 
        color: "rgba(0,0,0,.9)",
        flex: 1
    },
    publishedText: {
        color: "rgba(0,0,0,.9)",
    },
    descriptionImage: {
        height:200, 
        width:150, 
        resizeMode: "cover"
    },
    searchCardImage: {
        height: 250, 
        width: 170, 
        alignSelf: "center", 
        resizeMode: "cover", 
        marginRight: 5, 
        marginLeft: 5, 
        marginTop: 10
    },
    searchCardTitle: {
        width: 200, 
        fontWeight: "bold", 
        fontSize: 18,
        color: "rgba(0,0,0,.9)",
    },
    loginToSaveButton: {
        marginBottom: 10,
        width: 150, 
    },
    savedButton: {
        marginBottom: 10, 
        width: 150, 
        backgroundColor: "green",
    },
    readItButton: {
        marginBottom: 10, 
        width: 150, 
        backgroundColor: "#5739DF", 
        color: "black"
    },
    saveButton: {
        marginBottom: 10, 
        width: 150, 
        backgroundColor: "#D1427D", 
        color: "black"
    },
    moreInfoButton: {
        width: 150, 
        backgroundColor: "#3998DF"
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(HomeComponent)
