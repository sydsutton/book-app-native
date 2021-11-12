import React, {Component} from 'react';
import { View, StyleSheet, ImageBackground, TouchableOpacity } from "react-native"
import {Button, Icon, Text, Overlay, Card, Input } from "react-native-elements"


class WelcomeComponent extends Component {
    constructor(props){
        super(props)
        this.state = {
            isLoginOpen: false
        }
    }

    toggleLogin = () => {
        this.setState({
            isLoginOpen: !this.state.isLoginOpen
        })
    }

    render(){
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
                            onPress={this.toggleLogin}/>
                        <Button 
                            buttonStyle={{width: 200, borderRadius: 20, marginBottom: 50, borderWidth: 2}} 
                            title="create account"
                            type="outline"
                            onPress={this.toggleLogin}/>
                    </TouchableOpacity>
                    <Overlay isVisible={this.state.isLoginOpen} onBackdropPress={this.toggleLogin}>
                        <Card containerStyle={{width: 300}}>
                            <Text h4 style={{textAlign: "center"}}>Login</Text>
                            <Input 
                                placeholder="   email or username"
                                leftIcon={<Icon name="user" type="font-awesome" color="grey"/>}
                            />
                            <Input 
                                placeholder="   password"
                                leftIcon={<Icon name="unlock-alt" type="font-awesome" color="grey"/>}
                                secureTextEntry={true}
                            />
                            <Button title="login" onPress={this.toggleLogin}/>
                        </Card>
                    </Overlay>
                </View>
            </ImageBackground>
        );
    }
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