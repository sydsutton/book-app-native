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
        this.state.selectedBookType && !this.state.searchData ? this.toggleSubjectModal() : this.toggleTitleModal()  
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
            <ImageBackground source={require("../images/backgroundImage.jpg")} style={styles.imageBackground}>
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
                        <Button onPress={() => this.handleSearch(this.state.search)} buttonStyle={styles.searchButton} title="Search" />
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
                                    <ActivityIndicator size="large" color="#B23963"/>
                                    <Text style={styles.loadingText}>Loading...</Text>
                                </View> : null}
                        <ScrollView horizontal style={{height: 600}}>
                            {this.state.searchedBooks ? this.state.searchedBooks.map(book => {
                                return (
                                    <View key={book.key}>
                                        <Card containerStyle={styles.card}>
                                            <Image 
                                                source={{uri: `https://covers.openlibrary.org/b/OLID/${book.cover_edition_key}.jpg`}}
                                                style={styles.cardImage}
                                                alt={book.title} 
                                            /> 
                                            <Text style={styles.cardTitle}>{book.title}</Text>
                                            <Text style={{width: 150, marginTop: 20}}>By {book.authors[0] ? book.authors[0].name : 'Unknown'}</Text>
                                            <View style={{alignItems: "center", marginTop: 10}}>
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
                                                            raised
                                                            buttonStyle={styles.saveButton} 
                                                            title="Save"
                                                            onPress={() => {
                                                                this.props.saveBook(book)
                                                            }}
                                                        />
                                                }
                                                <Button 
                                                    icon={<Icon name="info-circle" size={15} style={{marginLeft: 10}} type="font-awesome" />} 
                                                    iconRight
                                                    raised
                                                    buttonStyle={{width: 200}} 
                                                    title="More Info"
                                                    onPress={() => {
                                                        this.getDescription(book.key)
                                                    }}
                                                />
                                            </View>
                                            <View>
                                            <Modal 
                                                animationType="slide"
                                                visible={this.state.isSubjectOpen} 
                                            >
                                                <ScrollView style={{alignSelf: "center", padding: 20}}>
                                                    <View style={{marginLeft: "auto"}}>
                                                        <Icon type="font-awesome" name="times" onPress={this.toggleSubjectModal}
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
                                        <Card containerStyle={styles.searchCardContainer}>
                                            <Image 
                                                source={{uri: `https://covers.openlibrary.org/b/OLID/${book.cover_edition_key}.jpg`}}
                                                style={styles.searchCardImage}
                                                alt={book.title} 
                                            /> 
                                            <Text style={styles.searchCardTitle}>{book.title}</Text>
                                            <Text style={{width: 150, marginTop: 20}}>By {book.author_name ? book.author_name[0] : 'Unknown'}</Text>
                                            <Text>{book.first_publish_year ? `First published in ${book.first_publish_year}` : null}</Text>
                                            <View style={{alignItems: "center", marginTop: 10}}>
                                            {!this.props.user.isLoggedIn ? 
                                                    <Button 
                                                        disabled={true}
                                                        disabledStyle={{backgroundColor: "#858984"}}
                                                        iconRight
                                                        buttonStyle={styles.loginToSaveButton} 
                                                        title="Login in to save"
                                                    />

                                                    :

                                                    this.props.user.isLoggedIn && this.props.books.includes(book) ? 
                                                        <Button 
                                                            icon={<Icon name="check" size={15} style={{marginLeft: 10}} color="white" type="font-awesome" />} 
                                                            iconRight
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
                                                    icon={<Icon name="info-circle" size={15} style={{marginLeft: 10}} type="font-awesome" />} 
                                                    iconRight
                                                    raised
                                                    buttonStyle={{width: 200}} 
                                                    title="More Info"
                                                    onPress={() => {
                                                        this.getDescription(book.key)
                                                    }}
                                                />
                                            </View>
                                            <View>
                                            <Modal 
                                                animationType="slide"
                                                visible={this.state.isTitleOpen} 
                                            >
                                                <ScrollView style={{alignSelf: "center", padding: 20}}>
                                                    <View style={{marginLeft: "auto"}}>
                                                        <Icon type="font-awesome" name="times" onPress={this.toggleTitleModal}
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
                                                        <Text style={{alignSelf: "center"}}>{this.state.bookDescription.description}</Text> 
                                                    : null}
                                                    {this.state.bookDescription.description && this.state.bookDescription.description.value ? 
                                                        <Text style={{alignSelf: "center"}}>{this.state.bookDescription.description.value}</Text> 
                                                    : null}
                                                    {!this.state.bookDescription.description ? 
                                                        <Text style={{alignSelf: "center"}}>Sorry, but there is no description for this book</Text> 
                                                    : null}
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
    text: {
        fontSize: 20,
        paddingTop: 10, 
        flex: 1,
        flexWrap: "wrap",
        width: 200
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
        backgroundColor: "#4163BE"
    },
    orText: {
        textAlign: "center", 
        fontSize: 25, 
        color: "grey", 
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
        color: "#B23963", 
        textAlign: "center"
    },
    card: {
        backgroundColor: "(rgba(255,255,255,0.75)", 
        borderRadius: 20, 
        shadowColor: 'black',
        height: 550,
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 2},
        shadowRadius: 10,
        elevation: 3
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
        width: 200, 
        fontWeight: "bold", 
        fontSize: 18
    },
    descriptionImage: {
        height:200, 
        width:150, 
        resizeMode: "cover"
    },
    searchCardContainer: {
        backgroundColor: "(rgba(255,255,255,0.75)", 
        borderRadius: 20, shadowColor: 'black',
        height: 570,
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 2},
        shadowRadius: 10,
        elevation: 3
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
        width: 150, 
        fontWeight: "bold", 
        fontSize: 18
    },
    loginToSaveButton: {
        marginBottom: 10,
        width: 200, 
    },
    savedButton: {
        marginBottom: 10, 
        width: 200, 
        backgroundColor: "green", 
        color: "black"
    },
    readItButton: {
        marginBottom: 10, 
        width: 200, 
        backgroundColor: "orange", 
        color: "black"
    },
    saveButton: {
        marginBottom: 10, 
        width: 200, 
        backgroundColor: "#B23963", 
        color: "black"
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(HomeComponent)

// export default HomeComponent