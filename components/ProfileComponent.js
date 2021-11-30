import React, { Component } from 'react';
import {View, ImageBackground, StyleSheet, FlatList, ScrollView, TouchableOpacity } from "react-native"
import { Button, Image, Text, Card, Icon } from "react-native-elements"
import { connect } from "react-redux"
import * as ImagePicker from 'expo-image-picker'
import Welcome from "./WelcomeComponent"
import { saveProfile } from "../redux/ActionCreators"


const mapStateToProps = state => {
    return {
        userInfo: state,
        readBooks: state.read.readBooks
    }
}

const mapDispatchToProps = {
    saveProfile: (userInfo) => saveProfile(userInfo)
}

class ProfileComponent extends Component {
    constructor(props){
        super(props)
        this.state = {
            password: "",
            image: "",
            isLoggedIn: this.props.userInfo.profile.isLoggedIn,
            bookInfo: {
                title: ""
            }
        }
    }

    componentDidMount(){
        (async () => {
            if (Platform.OS !== 'web') {
              const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
              if (status !== 'granted') {
                alert('Sorry, we need camera roll permissions to make this work!');
              }
            }
          }
        )
        // if(this.props.userInfo.profile.isLoggedIn){
        //     this.setState({password: this.props.userInfo.profile.password.replace(/[a-z0-9]/gi, "*")})
        // } else {
        //     null
        // }
        if(this.props.userInfo.profile.password){
            let password = this.props.userInfo.profile.password
            let newPassword = password.replace(/[a-z0-9]/gi, "*")
            this.setState({password: newPassword})
        } else {
            null
        }
    }

    pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });

        if (!result.cancelled) {
            this.setState({image: result.uri})
          }
        }

    handlePassword = () => {
        if(this.state.password.includes("*")){
            this.setState({
                password: this.props.userInfo.profile.password
            })
        } else {
            this.setState({
                password: this.props.userInfo.profile.password.replace(/[a-z0-9]/gi, "*")
            })
        }
    }

    render(){
        // const renderRead = ({item}) => {
        //     return(
        //         <View>
        //             <TouchableOpacity onPress={() => this.setState({bookInfo: {title: item.title}})}>
        //                 <Image 
        //                     source={{uri: `https://covers.openlibrary.org/b/OLID/${item.cover_edition_key}.jpg`}}
        //                     style={{height: 300, width: 75, margin: 2, borderRadius: 8}}
        //                     alt={item.title} 
        //                 /> 
        //             </TouchableOpacity>
        //         </View>
        //     )
        // }
        return (
                <ImageBackground source={require("../images/backgroundImage.jpg")} style={styles.imageBackground}>
                    {!this.props.userInfo.profile.isLoggedIn ? 
                    <Welcome />
                    :
                    <ScrollView>
                        <View style={styles.container}>
                            <Button onPress={() => {
                                this.setState({isLoggedIn: false})
                                this.props.saveProfile(this.state)
                                }} 
                                buttonStyle={{marginLeft: 300, marginTop: 50, borderRadius: 8}}
                                title=""
                                icon={<Icon name="sign-out" type="font-awesome" color="white"  />} 
                            />
                            <Card containerStyle={styles.card}>
                                <View style={styles.imageContainer}>
                                    {this.state.image ? 
                                    <Image style={styles.image}
                                        source={{uri: this.state.image}} 
                                    />
                                    :
                                    <Image style={styles.image} 
                                        source={{uri: `https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png`}} 
                                    /> 
                                    }
                                </View>
                                <Button onPress={() => this.pickImage()} title="+" buttonStyle={styles.addImage}/>
                                <View style={styles.nameContainer}>
                                    <Text h4 style={styles.firstName}>{this.props.userInfo.profile.firstName}</Text>
                                    <Text h4 style={styles.lastName}>{this.props.userInfo.profile.lastName}</Text>
                                </View>
                                <View style={styles.userContainer}>
                                    <Text style={{fontSize: 15}}>Username: <Text style={styles.text}>{this.props.userInfo.profile.username}</Text></Text>
                                    <View style={styles.passContainer}>
                                        <Text style={styles.password}>Password: <Text style={styles.text}>{this.state.password}</Text></Text>
                                        {this.state.password.includes("*") ? <Button buttonStyle={styles.passwordButton} title="Show password" onPress={this.handlePassword} /> : <Button buttonStyle={styles.passwordButton} title="Hide password" onPress={this.handlePassword} />}
                                    </View>
                                </View>
                            </Card>
                            <Text style={{fontSize: 20, fontWeight: "bold", textAlign: "center", marginTop: 20}}>Your Shelf</Text>
                            {this.state.bookInfo.title ? 
                                <Card>
                                    <Text>{this.state.bookInfo.title}</Text>
                                </Card>
                            : null
                            }
                            <View style={{width: "80%", flex: 1, flexWrap: "wrap", flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
                                {this.props.readBooks.map(item => {
                                    return(
                                        <View>
                                            {item.cover_edition_key ? 
                                            <Image 
                                                source={{uri: `https://covers.openlibrary.org/b/OLID/${item.cover_edition_key}.jpg`}}
                                                style={{height: 300, width: 65, margin: 2, borderRadius: 8}}
                                                alt={item.title} 
                                            /> 
                                            : 
                                            <Image 
                                                source={{uri: `https://images.squarespace-cdn.com/content/v1/539dffebe4b080549e5a5df5/1556136681564-1HI5D6ITPKFKRETHU38X/Bronte-Jane-Eyre-book-spine-wall-art-museum-outlets.jpg?format=300w`}}
                                                style={{height: 300, width: 65, margin: 2, borderRadius: 8}}
                                                alt={item.title} 
                                            /> 
                                            }
                                        </View>
                                    )
                                })}
                                {/* <FlatList
                                    horizontal
                                    data={this.props.readBooks}
                                    renderItem={renderRead}
                                    keyExtractor={(item, index) => 'key'+index}
                                /> */}
                            </View>
                        </View>
                    </ScrollView>
                    }
                </ImageBackground>
        )
    }
}

const styles = StyleSheet.create({
    imageBackground: {
        flex: 1,
        resizeMode: "cover"
    },
    container: {
        flex: 1,
        alignItems: "center"
    },
    card: {
        justifyContent: "center", 
        borderRadius: 30, 
        marginTop: 100,
        width: "80%"
    },
    imageContainer: {
        position: "absolute", 
        bottom: 160, 
        left: 61, 
        top:-95
    },
    image: {
        width: 160, 
        height: 160, 
        borderRadius: 300
    },
    nameContainer: {
        borderBottomWidth: 1, 
        borderColor: "rgba(0,0,0,.2)", 
        paddingBottom: 10
    },
    firstName: {
        fontWeight: "bold", 
        alignSelf: "center", 
    },
    lastName: {
        fontWeight: "bold", 
        alignSelf: "center"
    },
    userContainer: {
        margin: 0, 
        paddingTop: 40, 
        height: 160
    },
    passContainer: {
        flex: 1, 
        flexDirection: "row", 
        alignItems: "center"
    },
    password: {
        fontSize: 15, 
        marginRight: 20
    },
    text: {
        fontWeight: "bold", 
        fontSize: 18
    },
    passwordButton: {
        fontSize: 8,
        width: 150,
        padding: 2,
        borderRadius: 20
    },
    addImage: {
        width: 40,
        borderRadius: 200,
        marginLeft: 175,
        marginTop: 20
    },
    noUser: {
        fontWeight: "bold", 
        alignSelf: "center", 
        marginTop: 70
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(ProfileComponent)