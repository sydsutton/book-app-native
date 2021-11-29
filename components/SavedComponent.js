import React, { Component } from 'react';
import { View, Text, StyleSheet, ImageBackground, FlatList, Image, ScrollView } from "react-native"
import { Card, Avatar, Button, Icon } from "react-native-elements"
import { connect } from "react-redux"
import { deleteBook } from "../redux/ActionCreators"

const mapStateToProps = state => {
    return {
        books: state.save.books
    }
}

const mapDispatchToProps = {
    deleteBook
}

class SavedComponent extends Component {
    render(){
        const renderSaved = ({item}) => {
            return(
                <View>
                    <Card containerStyle={styles.card}>
                        <View style={styles.avatarContainer}>
                            <Avatar 
                                source={{uri: `https://covers.openlibrary.org/b/OLID/${item.cover_edition_key}.jpg`}}
                                size="large"
                                icon={{name: 'user', type: 'font-awesome'}}
                            />
                            <View style={styles.textContainer}>
                                <Text style={styles.title}>{item.title}</Text>
                                {/* <Text>By {item.author}</Text> */}
                            </View>
                        </View>
                        <View style={styles.buttonContainer}>
                            <Button 
                                buttonStyle={styles.removeButton}
                                title="   Remove book"
                                titleStyle={{fontSize: 12}}
                                icon={<Icon name="minus" color="#fff" size={12} type="font-awesome"/>}
                                onPress={() => this.props.deleteBook(item)}
                            />
                            <Button 
                                buttonStyle={styles.readButton}
                                icon={<Icon name="arrow-right" color="#fff" size={12} type="font-awesome"/>}
                                title="   I've read it"
                                titleStyle={{fontSize: 12}}
                            />
                        </View>
                    </Card>
                </View>
            )
        }
        return (
            <ImageBackground source={require("../images/backgroundImage.jpg")} style={{flex: 1, resizeMode: "cover"}}>
                <View style={styles.container}>
                    <FlatList
                        data={this.props.books}
                        renderItem={renderSaved}
                        keyExtractor={(item, index) => 'key'+index}
                    />
                </View>
            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    card: {
        backgroundColor: "rgba(255,255,255,0.5)", 
        borderWidth: 2, 
        borderColor: "white"
    },
    avatarContainer: {
        flex: 1, 
        flexDirection: "row"
    },
    textContainer: {
        flexDirection: "column", 
        marginLeft: 20
    },
    title: {
        fontSize: 20, 
        flex: 1, 
        flexWrap: "wrap", 
        width: 200
    },
    buttonContainer: {
        flex: 1, 
        flexDirection: "row", 
        alignItems: "center", 
        justifyContent: "space-around"
    },
    removeButton: {
        marginTop: 20, 
        backgroundColor:"#CB2A2A", 
        borderRadius: 20, 
        paddingLeft: 15, 
        paddingRight: 15
    },
    readButton: {
        backgroundColor: "#2E7A2D", 
        marginTop: 20, 
        borderRadius: 20, 
        paddingLeft: 15, 
        paddingRight: 15
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(SavedComponent)