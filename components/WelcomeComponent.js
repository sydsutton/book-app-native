import React from 'react';
import { View, StyleSheet, ImageBackground, TouchableOpacity } from "react-native"
import {Button, Icon, Text, Divider } from "react-native-elements"


const WelcomeComponent = () => {

    return (
        <ImageBackground source={require("../images/coverImage.jpg")} style={style.image}> 
            <View style={style.container}>
                <Text h2 style={style.text}>YourShelf</Text>
                <Text style={{color: 'white', flex: 1, bottom: 120}}>Your very own digital bookshelf</Text>
                <TouchableOpacity>
                    <Button 
                        icon={<Icon name="login" color="#fff" style={{marginRight: 10}}/>} 
                        buttonStyle={{width: 200, borderRadius: 20, marginBottom: 20}} 
                        title="login"
                        onPress={() => alert("logged in")}/>
                    <Button 
                        buttonStyle={{width: 200, borderRadius: 20, marginBottom: 50, borderWidth: 2}} 
                        title="create account"
                        type="outline"
                        onPress={() => alert("account created")}/>
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
    }
})

export default WelcomeComponent;