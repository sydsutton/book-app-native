import React, { Component } from 'react';
import BOOKS from "../booksData/BOOKS"
import { View, Text, StyleSheet, ImageBackground, FlatList, Image, ScrollView } from "react-native"
import { Card, Avatar, Button, Icon } from "react-native-elements"
import { connect } from "react-redux"

const mapStateToProps = (state) => {
    return {
        books: state.books
    }
}

class SavedComponent extends Component {
    constructor(props){
        super(props)
        this.state = {
            savedBooks: BOOKS
        }
    }
    render(){
        const {books} = this.props
        
        const renderSaved = ({item}) => {
            return(
                <View>
                    <Card style={{flex: 1, flexDirection: "row", justifyContent: "space-around"}}>
                        <View style={{flex: 1, flexDirection: "row"}}>
                            <Avatar 
                                source={item.imageLink}
                                size="large"
                                icon={{name: 'user', type: 'font-awesome'}}
                            />
                            <View style={{flexDirection: "column", marginLeft: 20}}>
                                <Text style={{fontSize: 20}}>{item.title}</Text>
                                <Text>By {item.author}</Text>
                            </View>
                        </View>
                        <View style={{flex: 1, flexDirection: "row", alignItems: "center", justifyContent: "space-around"}}>
                            <Button buttonStyle={{backgroundColor: "orange", marginTop: 20, borderRadius: 20}}title="Remove book"/>
                            <Button buttonStyle={{backgroundColor: "green", marginTop: 20, borderRadius: 20}}title="Move to bookshelf"/>
                        </View>
                    </Card>
                </View>
            )
        }
        return (
            <ImageBackground source={require("../images/backgroundImage.jpg")} style={{resizeMode: "cover"}}>
                <View>
                    <FlatList
                        data={books}
                        renderItem={renderSaved}
                        keyExtractor={(item, index) => 'key'+index}
                    />
                </View>
            </ImageBackground>
        );
    }
}

export default connect(mapStateToProps)(SavedComponent);