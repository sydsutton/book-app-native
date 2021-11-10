import React, {Component} from 'react';
import { View, Text, StyleSheet, ImageBackground, FlatList, Image } from "react-native"
import BOOKS from "../booksData/BOOKS"

class HomeComponent extends Component {
    constructor(props){
        super(props)
        this.state = {
            books: BOOKS
        }
    }

    render(){
        const Item = ({title}) => {
            return (
                <View>
                    <Text>{title}</Text>
                </View>
            )
        } 

        const renderBooks = ({item}) => {
            return (
                <View>
                    <Item title={item.title}/>
                </View>
            )
        }
        return (
            <ImageBackground source={{uri: "https://images.unsplash.com/photo-1604339454409-701c5278c546?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1827&q=80"}} resizeMode="cover" style={styles.image}>
                <View styles={styles.container}>
                    <FlatList
                        data={this.state.books}
                        renderItem={renderBooks}
                        keyExtractor={item => item.id}
                    >
                    </FlatList>
                </View>
            </ImageBackground>
        );    
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    image: {
        flex: 1,
        justifyContent: 'center',
        alignItems: "center",
        width: null,
        height: null
    }
})

export default HomeComponent;