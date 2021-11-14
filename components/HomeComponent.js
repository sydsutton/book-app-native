import React, {Component} from 'react';
import { View, StyleSheet, ImageBackground, FlatList, Image, ScrollView } from "react-native"
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
            isLoading: false
        }
        this.handleChange = this.handleChange.bind(this)
    }

    toggleOverlay = () => {
        this.setState({
            isOpen: !this.state.isOpen
        })
    }
    updateSearch = (search) => {
        this.setState({
            search
        })
    }

    async handleChange(props){
        this.setState({
            selectedBookType: props,
            isLoading: true
        })
        const url = `https://openlibrary.org/subjects/${this.state.selectedBookType}.json`
                                                       
        const res = await fetch(url)
        if(res.status === 200){
            const data = await res.json()
            this.setState({
                searchedBooks: data.works
            })
            console.log(this.state.searchedBooks)
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
                    <Card containerStyle={{backgroundColor: "rgba(255,255,255,0.6)", borderWidth: 2, borderColor: "white"}}>
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
                        <View>
                            <Overlay backdropStyle={{opacity: .4}} isVisible={this.state.isOpen} onBackdropPress={this.toggleOverlay}>
                                <Card>
                                    <Text>{item.title}</Text>
                                    <Text>{item.author}</Text>
                                </Card>
                            </Overlay>
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
                            <Text>Search by subject</Text>
                            <View style={{backgroundColor: "white", borderRadius: 20, height: 40, width: 220, marginTop: 10, justifyContent: "center"}}>
                                <Picker
                                    // selectedValue={this.state.selectedBookType}
                                    style={{ height: 50, width: 200, color: "grey", marginLeft: "auto"}}
                                    mode="dialog"
                                    onValueChange={(itemValue) => this.handleChange(itemValue)}
                                >
                                    <Picker.Item label="Search by subject" value="" />
                                    {this.state.genres ? this.state.genres.map(genre => {
                                        return (
                                            <Picker.Item 
                                                key={genre.index} 
                                                label={genre.name} 
                                                value={genre.value.toLowerCase()} />
                                                )
                                            }) : null}
                                </Picker>
                            </View>
                        </View>
                        <View >
                            {/* {this.state.searchedBooks ? <RenderSelectedValue searchedBooks={this.state.searchedBooks}/> : null} */}
                            {this.state.searchedBooks ? this.state.searchedBooks.map(book => {
                                return (
                                    <Text>{book.title}</Text>
                                )
                            }) : null}
                        </View>
                        <Text style={{fontSize: 25, fontWeight: "bold"}}>100 Must-Read Books of All Time</Text>
                        <FlatList
                            horizontal
                            data={books}
                            renderItem={RenderBooks}
                            keyExtractor={(item, index) => 'key'+index}
                        >
                        </FlatList>
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