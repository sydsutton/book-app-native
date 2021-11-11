import React, {Component} from 'react';
import { View, StyleSheet, ImageBackground, FlatList, Image, ScrollView } from "react-native"
import { Card, Button, Icon, Text, Overlay} from "react-native-elements"
import { connect } from "react-redux"

const mapStateToProps = (state) => {
    return {
        books: state.books
    }
}

class HomeComponent extends Component {
    constructor(props){
        super(props)
        this.state = {
            isOpen: false,
        }
    }

    toggleOverlay = () => {
        this.setState({
            isOpen: !this.state.isOpen
        })
    }

    render(){

        const {books} = this.props

        const RenderShelf = ({item}) => {
            return (
                <View>
                    <Card style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
                        <Image style={{width: 100, height: 400}} source={item.imageLink} />
                        <Text style={{transform: [{ rotate: '90deg' }], color: "white"}}>{item.title}</Text>
                    </Card>
                </View>
            )
        }
        const RenderBooks = ({item}) => {
            return (
                <View>
                    <Card style={styles.card}>
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
            <ImageBackground source={require("../images/backgroundImage.jpg")} style={{resizeMode: "cover"}}>
                <View>
                    <ScrollView>
                        <FlatList
                            horizontal
                            data={books}
                            renderItem={RenderBooks}
                            keyExtractor={(item, index) => 'key'+index}
                        >
                        </FlatList>
                        <FlatList
                            horizontal
                            data={books}
                            renderItem={RenderShelf}
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
    card: {
        height: 300
    },
    text: {
        fontSize: 20,
        paddingTop: 10
    },
    image: {
        height: 300,
        width: 200,
        resizeMode: "cover"
    }
})

export default connect(mapStateToProps)(HomeComponent)