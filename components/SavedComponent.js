import React, { Component } from 'react';
import BOOKS from "../booksData/BOOKS"
import { View, Text, StyleSheet, ImageBackground, FlatList, Image, ScrollView } from "react-native"
import { Card, Avatar, Button } from "react-native-elements"

class SavedComponent extends Component {
    constructor(props){
        super(props)
        this.state = {
            savedBooks: BOOKS
        }
    }
    render(){
        const renderSaved = ({item}) => {
            return(
                <View>
                    <Card style={{flex: 1, flexDirection: "row", justifyContent: "space-around"}}>
                        <Avatar 
                            source={item.imageLink}
                            size="large"
                            icon={{name: 'user', type: 'font-awesome'}}
                        />
                        <Text>{item.title}</Text>
                        <Text>By {item.author}</Text>
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
                    <ScrollView>
                        <FlatList
                            data={this.state.savedBooks}
                            renderItem={renderSaved}
                            keyExtractor={item => item.toString()}
                        >
                        </FlatList>
                    </ScrollView>
                </View>
            </ImageBackground>
        );
    }
}

export default SavedComponent;