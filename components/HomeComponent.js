import React, {Component} from 'react';
import { View, StyleSheet, ImageBackground, FlatList, ScrollView, Image, ActivityIndicator } from "react-native"
import { Picker } from "@react-native-picker/picker"
import { Card, Button, Icon, Text, Overlay, SearchBar } from "react-native-elements"
import GENRES from "../booksData/GENRES"
import RenderSelectedValue from "./RenderSelectedValues"
import { connect } from "react-redux"

const mapStateToProps = (state) => {
    return {
        books: state.books,
    }
}

class HomeComponent extends Component {
    constructor(props){
        super(props)
        this.state = {
            isOpen: false,
            search: "",
            selectedBookType: "",
            genres: GENRES, 
            searchedBooks: "", 
            isLoading: false,
            bookDescription: "",
            bookTitle: ""
        }
        this.handleChange = this.handleChange.bind(this)
    }

    toggleModal = () => {
        this.setState({
            isOpen: !this.state.isOpen
        })
    }

    async getDescription(props){
        const bookKey = props
        const res = await fetch(`https://openlibrary.org${bookKey}.json`)
        if(res.status === 200){
            const data = await res.json()
            console.log(data)
            this.setState({
                bookDescription: data,
                bookTitle: data.title
            })
        } else {
            alert("Sorry, something went wrong")
        }
        this.toggleModal()
    }

    updateSearch = (search) => {
        this.setState({
            search
        })
    }

    async handleChange(props){
        this.setState({searchedBooks: null})
        const selectedValue = props
        this.setState({
            selectedBookType: props,
            isLoading: true
        })
        const url = `https://openlibrary.org/subjects/${selectedValue}.json?limit=50`
                                                       
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

        const {books} = this.props
        const {search} = this.state

        const RenderBooks = ({item}) => {
            return (
                <View>
                    <Card containerStyle={{backgroundColor: "rgba(255,255,255,0.6)", borderWidth: 2, borderRadius: 20, borderColor: "white"}}>
                        <Image 
                            source={item.imageLink}
                            style={styles.image}
                        />
                        <Text style={styles.text}>{item.title}</Text>
                        <Text style={{paddingBottom: 10}}>{item.author}</Text>
                        <View style={{flex: 1, flexDirection: "row", justifyContent: "space-around"}}>
                            <Button 
                                buttonStyle={{width: 100}}
                                title="save"
                                onPress={() => alert(item.title)}
                            />
                            <Button 
                                type="outline" 
                                buttonStyle={{width: 100}}
                                title="more info"
                                onPress={this.toggleOverlay}
                            />
                        </View>
                    </Card>
                </View>
            )
        }
        return (
            <ImageBackground source={require("../images/backgroundImage.jpg")} style={{resizeMode: "cover", flex: 1}}>
                <View>
                    <ScrollView>
                        <SearchBar
                            placeholder="Search by title"
                            lightTheme
                            containerStyle={{backgroundColor: "transparent"}}
                            inputContainerStyle={{backgroundColor: "#fff", borderRadius: 30}}
                            onChangeText={this.updateSearch}
                            value={search}
                        />
                        <Text style={{textAlign: "center", fontSize: 25, color: "grey", marginTop: 10}}>OR</Text>
                        <View style={{justifyContent: "center", alignItems: "center", marginTop: 10}}>
                            <View>
                                <Picker
                                    style={{ height: 50, width: 200, color: "grey", marginLeft: "auto", borderRadius: 30, textAlign: "center", border: "none"}}
                                    mode="dialog"
                                    onValueChange={(itemValue) => this.handleChange(itemValue)}
                                    selectedValue={this.state.bookType}
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
                                <View style={{textAlign: "center", justifyContent: "center", marginTop: 50}}>
                                    <ActivityIndicator size="large" color="blue"/>
                                    <Text style={{color: "blue", textAlign: "center"}}>Loading...</Text>
                                </View> : null}
                        <ScrollView horizontal style={{height: 600}}>
                            {this.state.searchedBooks ? this.state.searchedBooks.map(book => {
                                return (
                                    <Card 
                                        containerStyle={{backgroundColor: "rgba(255,255,255,0.6)", borderWidth: 2, borderRadius: 20, borderColor: "white"}}
                                        key={book.cover_edition_key}
                                    >
                                        <Image 
                                            source={{uri: `https://covers.openlibrary.org/b/OLID/${book.cover_edition_key}.jpg`}}
                                            style={{height: 250, width: 170, resizeMode: "cover", marginRight: 5, marginLeft: 5, marginTop: 10}}
                                            alt={book.title} 
                                        /> 
                                        <Text style={{width: 150, flex: 1, flexWrap: "wrap", fontWeight: "bold"}}>{book.title}</Text>
                                        <Text style={{width: 150, flex: 1, flexWrap: "wrap"}}>By {book.authors[0] ? book.authors[0].name : 'Unknown'}</Text>
                                        {book.availability && book.availability.status === 'borrow_available' || book.availability && book.availability.status == 'open' ? 
                                            <View style={{flex: 1, flexDirection: "row", alignItems: "center"}}>
                                                <Icon name="check-circle" type="font-awesome" color="green" style={{marginRight: 4}}/><Text>Borrow available</Text>
                                            </View> 
                                            : 
                                            <View style={{flex: 1, flexDirection: "row", alignItems: "center"}}>
                                                <Icon name="times-circle" type="font-awesome" color="red" style={{marginRight: 4}}/>
                                                <Text>Borrow unavailable</Text>
                                            </View>
                                        }
                                        <View style={{flex: 1, flexDirection: "column", alignItems: "center", marginTop: 10}}>
                                            <Button 
                                                icon={<Icon name="book" size={15} style={{marginLeft: 5}} type="font-awesome" />} 
                                                iconRight
                                                buttonStyle={{marginBottom: 10}} title="Save"
                                            />
                                            <Button 
                                                icon={<Icon name="info-circle" size={15} style={{marginLeft: 5}} type="font-awesome" />} 
                                                iconRight
                                                buttonStyle={{}} 
                                                title="More Info"
                                                onPress={() => this.getDescription(book.key)}
                                            />
                                        </View>
                                        <View>
                                            <Overlay 
                                                style={{backgroundColor: "rgba(0,0,0,0.5)"}}
                                                isVisible={this.state.isOpen} 
                                                onBackdropPress={this.toggleModal}
                                                overlayStyle={{width: 500, alignSelf: "center", padding: 20}}
                                            >
                                                <ScrollView>
                                                    <ScrollView horizontal>
                                                        {this.state.bookDescription.covers ? this.state.bookDescription.covers.map(cover => {
                                                            return (
                                                                <Image style={{height:200, width:150, resizeMode: "cover"}} source={{uri: `https://covers.openlibrary.org/b/id/${cover}-M.jpg`}} />
                                                            )
                                                        }) : null}
                                                    </ScrollView>
                                                    <View style={{alignItems: "center", textAlign: "center"}}>
                                                        <Text h4 style={{textDecorationLine: "underline"}}>{this.state.bookTitle ? this.state.bookTitle : null}</Text>
                                                    </View>
                                                    {this.state.bookDescription.description && !this.state.bookDescription.description.value ? 
                                                        <Text style={{alignSelf: "center"}}>{this.state.bookDescription.description}</Text> 
                                                    : null}
                                                    {this.state.bookDescription.description && this.state.bookDescription.description.value ? 
                                                        <Text style={{alignSelf: "center"}}>{this.state.bookDescription.description.value}</Text> 
                                                    : null}
                                                    {!this.state.bookDescription.description ? 
                                                        <Text style={{alignSelf: "center"}}>Sorry, but there is not description for this book</Text> 
                                                    : null}
                                                    {this.state.bookDescription.subject_places ? <Text style={{marginTop: 15, fontWeight: "bold"}}>Subject Places: </Text> : null}
                                                    {this.state.bookDescription.subject_places ? this.state.bookDescription.subject_places.map(place => {
                                                        return (
                                                            <Text key={place}>{place}</Text>
                                                        )
                                                    }) : null}
                                                </ScrollView>
                                            </Overlay>
                                        </View>
                                    </Card>
                                )
                            }) : null}
                        </ScrollView>
                        {/* <Text style={{fontSize: 25, fontWeight: "bold"}}>100 Must-Read Books of All Time</Text> */}
                        {/* <FlatList
                            horizontal
                            data={books}
                            renderItem={RenderBooks}
                            keyExtractor={(item) => item.id}
                        >
                        </FlatList> */}
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
    }
})

export default connect(mapStateToProps)(HomeComponent)