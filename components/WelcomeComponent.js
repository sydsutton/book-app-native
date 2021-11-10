import React from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity } from "react-native"
import {Button } from "react-native-paper"


const WelcomeComponent = () => {

    return (
        <ImageBackground source={require("../images/coverImage.jpg")} style={style.image}> 
            <View style={style.container}>
                <Text style={style.text}>YourShelf</Text>
                <TouchableOpacity>
                    <Button icon="login" style={style.loginBtn}>Login</Button>
                </TouchableOpacity>
            </View>
        </ImageBackground>
    );
}

const style = StyleSheet.create({
    container:{
        flex: 1,
        flexDirection: "column",
        paddingTop: ( Platform.OS === 'ios' ) ? 20 : 0,
        alignItems: "center",
        justifyContent: "center"
    },
    image: {
        flex: 1,
        resizeMode: "cover"
    },
    text: {
        flex: 1,
        top: 40,
        color: "#fff",
        fontSize: 50,
        fontFamily: 'Roboto'
    },
    loginBtn: {
        borderWidth: 1,
        backgroundColor: "#fff",
        borderColor: "#ffd059",
        borderRadius: 20,
        width: 200,
        bottom: 50
    }
})

export default WelcomeComponent;