import React, {Component} from 'react';
import { View, Text, StyleSheet, ImageBackground, FlatList, Image} from "react-native"
import { Card, Title, Paragraph } from "react-native-paper"
import BOOKS from "../booksData/BOOKS"

class HomeComponent extends Component {
    constructor(props){
        super(props)
        this.state = {
            books: BOOKS
        }
    }

    render(){
        // const Item = ({title}) => {
        //     return (
        //         <View>
        //             <Text>{title}</Text>
        //         </View>
        //     )
        // } 

        const RenderBooks = ({item}) => {
            return (
                <Card style={{marginBottom: 20, marginRight: 15, height: 400, width: 190}}>
                    <Card.Content>
                        <Title>{item.title}</Title>
                        <Paragraph>{item.author}</Paragraph>
                    </Card.Content>
                    <Card.Cover 
                        source={item.imageLink} style={styles.image}/>
                </Card>
            )
        }
        return (
            <ImageBackground source={require("../images/backgroundImage.jpg")} style={{resizeMode: "cover"}}>
                <View styles={styles.container}>
                    <FlatList
                        data={this.state.books}
                        renderItem={RenderBooks}
                        keyExtractor={item => item.title.toString()}
                        numColumns={2}
                    >
                    </FlatList>
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
        flexDirection: "row"
    },
    image: {
        flex: 1,
        resizeMode: "cover"
    }
})

export default HomeComponent;