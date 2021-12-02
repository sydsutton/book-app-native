import React, { Component } from 'react';
import { View, Text, StyleSheet, ImageBackground, FlatList, Image, ScrollView } from "react-native"
import { Card, Avatar, Button, Icon } from "react-native-elements"
import { connect } from "react-redux"
import { deleteBook } from "../redux/ActionCreators"
import { readBook } from "../redux/ActionCreators"
import moment from 'moment'

const mapStateToProps = state => {
    return {
        books: state.save.books,
        readBooks: state.read.readBooks,
        user: state.profile
    }
}

const mapDispatchToProps = {
    deleteBook,
    readBook
}

class SavedComponent extends Component {
    render(){
        const date = moment()
        .format('DD-MM-YY hh:mm a')

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
                                {item.author_name ? 
                                    <Text>By {item.author_name}</Text>
                                : 
                                item.authors ? 
                                    <Text>By {item.authors[0].name}</Text>
                                :
                                    <Text>By Unknown</Text>
                                }
                                <Text>Saved on {date}</Text>
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
                                onPress={() => {
                                    this.props.readBook(item)
                                    this.props.deleteBook(item)
                                }}
                            />
                        </View>
                    </Card>
                </View>
            )
        }
        return (
            <ImageBackground source={require("../images/backgroundImage.jpg")} style={{flex: 1, resizeMode: "cover"}}>
                <View style={styles.container}>
                    {this.props.user.isLoggedIn && this.props.books.length > 0 ? 
                         <FlatList
                            data={this.props.books}
                            renderItem={renderSaved}
                            keyExtractor={(item, index) => 'key'+index}
                        />
                    :
                    this.props.user.isLoggedIn && this.props.books.length === 0 ? 
                    <Text>You don't currently have any saved books </Text>
                    : 
                    <Text>Please log in to see your saved books</Text>
                    }
                </View>
            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 50
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