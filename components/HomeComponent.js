import React, {Component} from 'react';
import { View, StyleSheet, ImageBackground, FlatList, Image, ScrollView } from "react-native"
import { Card, Button, Icon, Text,} from "react-native-elements"
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
                <Card>
                    <Image 
                        source={item.imageLink}
                    />
                    <Text>{item.title}</Text>
                    <Button 
                        type="outline" 
                        title="save"
                        onPress={() => alert(item.title)}>
                        Save
                    </Button>
                </Card>
            )
        }
        return (
            <ImageBackground source={require("../images/backgroundImage.jpg")} style={{resizeMode: "cover"}}>
                <ScrollView>
                    <View >
                        <FlatList
                            horizontal
                            data={this.state.books}
                            renderItem={RenderBooks}
                            keyExtractor={item => item.title.toString()}
                        >
                        </FlatList>
                    </View>
                    <Text>More information down here somewhere</Text> 
                    <Text>More information down here somewhere</Text> 
                    <Text>More information down here somewhere</Text> 
                    <Text>More information down here somewhere</Text> 
                    <Text>More information down here somewhere</Text> 
                </ScrollView>
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
})

export default HomeComponent;