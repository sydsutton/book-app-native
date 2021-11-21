import React, {Component} from 'react';
import { View, StyleSheet, ImageBackground, ScrollView, Image, Modal, ActivityIndicator } from "react-native"
import { Picker } from "@react-native-picker/picker"
import { Card, Button, Icon, Text, SearchBar } from "react-native-elements"
import GENRES from "../booksData/GENRES"
import { connect } from "react-redux"

import SearchSubject from "./SearchSubjectComponent"
import SearchTitle from "./SearchTitleComponent"

const mapStateToProps = (state) => {
    return {
        books: state.books,
    }
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
            bookTitle: ""
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
            console.log(this.state.bookDescription)
        } else {
            alert("Sorry, something went wrong")
        }

        {this.state.selectedBookType && !this.state.searchData ? this.toggleSubjectModal() : this.toggleTitleModal()  }
    }

    updateSearch = (search) => {
        this.setState({
            search
        })
    }

    async handleSearch(props){
        this.setState({searchedBooks: null, isLoading: true, selectedBookType: ""})
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
                searchedBooks: data.works.slice(0,20)
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
                        <Button onPress={() => this.handleSearch(this.state.search)} buttonStyle={{width: 300, justifyContent: "center", textAlign: "center", alignSelf: "center", borderRadius: 20, marginTop: 15}} title="Search" />
                        <Text style={{textAlign: "center", fontSize: 25, color: "grey", marginTop: 10}}>OR</Text>
                        <View style={{justifyContent: "center", alignItems: "center", marginTop: 10}}>
                            <View style={{backgroundColor: "white", borderRadius: 20, height: 40}}>
                                <Picker
                                    style={{height: 50, width: 200, color: "grey", marginLeft: "auto", borderRadius: 30, textAlign: "center", border: "none", marginBottom: 20}}
                                    mode="dialog"
                                    onValueChange={(itemValue) => this.handleChange(itemValue)}
                                    selectedValue={this.state.selectedBookType}
                                >
                                    <Picker.Item label="Search by subject" value="" />
                                    {this.state.genres ? this.state.genres.map(genre => {
                                        return (
                                            <Picker.Item 
                                                key={genre.value} 
                                                label={genre.name} 
                                                value={genre.value.toLowerCase()} f
                                            />
                                                )
                                            }) : null}
                                </Picker>
                            </View>
                        </View>
                        {this.state.isLoading ? 
                                <View style={{textAlign: "center", justifyContent: "center", marginTop: 50}}>
                                    <ActivityIndicator size="large" color="#B23963"/>
                                    <Text style={{color: "#B23963", textAlign: "center"}}>Loading...</Text>
                                </View> : null}
                        <ScrollView horizontal style={{height: 600}}>
                            {this.state.searchedBooks ? this.state.searchedBooks.map(book => {
                                return (
                                    <View key={book.cover_edition_key}>
                                        <Card 
                                            containerStyle={{backgroundColor: "(rgba(255,255,255,0.75)", borderRadius: 20, shadowColor: 'black',
                                            height: 550,
                                            shadowOpacity: 0.26,
                                            shadowOffset: { width: 0, height: 2},
                                            shadowRadius: 10,
                                            elevation: 3}}
                                        >
                                            <Image 
                                                source={{uri: `https://covers.openlibrary.org/b/OLID/${book.cover_edition_key}.jpg`}}
                                                style={{height: 250, width: 170, alignSelf: "center", resizeMode: "cover", marginRight: 5, marginLeft: 5, marginTop: 10}}
                                                alt={book.title} 
                                            /> 
                                            <Text style={{width: 200, fontWeight: "bold", fontSize: 18}}>{book.title}</Text>
                                            <Text style={{width: 150, marginTop: 20}}>By {book.authors[0] ? book.authors[0].name : 'Unknown'}</Text>
                                            {book.availability && book.availability.status === 'borrow_available' || book.availability && book.availability.status == 'open' ? 
                                                <View style={{alignItems: "center"}}>
                                                    <Icon name="check-circle" type="font-awesome" color="green" style={{marginRight: 4, marginTop: 20}}/><Text>Borrow available</Text>
                                                </View> 
                                                : 
                                                <View style={{alignItems: "center"}}>
                                                    <Icon name="times-circle" type="font-awesome" color="red" style={{marginRight: 4, marginTop: 20}}/>
                                                    <Text>Borrow unavailable</Text>
                                                </View>
                                            }
                                            <View style={{alignItems: "center", marginTop: 10}}>
                                                <Button 
                                                    icon={<Icon name="book" size={15} style={{marginLeft: 10}} color="white" type="font-awesome" />} 
                                                    iconRight
                                                    buttonStyle={{marginBottom: 10, width: 200, backgroundColor: "#B23963", textColor: "black"}} 
                                                    title="Save"
                                                />
                                                <Button 
                                                    icon={<Icon name="info-circle" size={15} style={{marginLeft: 10}} type="font-awesome" />} 
                                                    iconRight
                                                    buttonStyle={{width: 200}} 
                                                    title="More Info"
                                                    onPress={() => {
                                                        this.getDescription(book.key)
                                                        // this.toggleSubjectModal()
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
                                                                <Image key={cover} style={{height:200, width:150, resizeMode: "cover"}} source={{uri: `https://covers.openlibrary.org/b/id/${cover}-M.jpg`}} />
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
                                                        <Text style={{alignSelf: "center"}}>Sorry, but there is not description for this book</Text> 
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
                                    <View key={book.cover_edition_key}>
                                        <Card 
                                            containerStyle={{backgroundColor: "(rgba(255,255,255,0.75)", borderRadius: 20, shadowColor: 'black',
                                            height: 570,
                                            shadowOpacity: 0.26,
                                            shadowOffset: { width: 0, height: 2},
                                            shadowRadius: 10,
                                            elevation: 3}}
                                        >
                                            <Image 
                                                source={{uri: `https://covers.openlibrary.org/b/OLID/${book.cover_edition_key}.jpg`}}
                                                style={{height: 250, width: 170, alignSelf: "center", resizeMode: "cover", marginRight: 5, marginLeft: 5, marginTop: 10}}
                                                alt={book.title} 
                                            /> 
                                            <Text style={{width: 150, fontWeight: "bold", fontSize: 18}}>{book.title}</Text>
                                            <Text style={{width: 150, marginTop: 20}}>By {book.author_name ? book.author_name[0] : 'Unknown'}</Text>
                                            <Text>{book.first_publish_year ? `First published in ${book.first_publish_year}` : null}</Text>
                                            <View style={{alignItems: "center", marginTop: 10}}>
                                                <Button 
                                                    icon={<Icon name="book" size={15} style={{marginLeft: 10}} color="white" type="font-awesome" />} 
                                                    iconRight
                                                    buttonStyle={{marginBottom: 10, width: 200, backgroundColor: "#B23963", textColor: "black"}} 
                                                    title="Save"
                                                />
                                                <Button 
                                                    icon={<Icon name="info-circle" size={15} style={{marginLeft: 10}} type="font-awesome" />} 
                                                    iconRight
                                                    buttonStyle={{width: 200}} 
                                                    title="More Info"
                                                    onPress={() => {
                                                        this.getDescription(book.key)
                                                        // this.toggleTitleModal()
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
                                                                <Image key={cover} style={{height:200, width:150, resizeMode: "cover"}} source={{uri: `https://covers.openlibrary.org/b/id/${cover}-M.jpg`}} />
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
                                                        <Text style={{alignSelf: "center"}}>Sorry, but there is not description for this book</Text> 
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
    }
})

export default connect(mapStateToProps)(HomeComponent)