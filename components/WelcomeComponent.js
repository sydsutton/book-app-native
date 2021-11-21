import React, {Component} from 'react';
import { View, StyleSheet, ImageBackground, TouchableOpacity, Modal } from "react-native"
import {Button, Icon, Text, Overlay, Card, Input } from "react-native-elements"


class WelcomeComponent extends Component {
    constructor(props){
        super(props)
        this.state = {
            isLoginOpen: false,
            isCreateOpen: false
        }
    }

    toggleLogin = () => {
        this.setState({
            isLoginOpen: !this.state.isLoginOpen
        })
    }

    toggleCreate = () => {
        this.setState({
            isCreateOpen: !this.state.isCreateOpen
        })
    }

    render(){
        return (
            <ImageBackground source={require("../images/coverImage.jpg")} style={style.image}> 
                <View style={style.container}>
                    <Text h2 style={{flex: 1, top: 40, color: "#fff"}}>YourShelf</Text>
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
                            onPress={this.toggleCreate}/>
                    </TouchableOpacity>

                    <Modal 
                        animationType="slide"
                        visible={this.state.isLoginOpen} 
                        onRequestClose={() => this.toggleLogin()}
                        statusBarTranslucent={true}
                    >
                        <View style={{flex: 1, alignItems: "center", justifyContent: "center"}}>
                            <Button buttonStyle={{backgroundColor: "transparent"}} title="" icon={<Icon name="times" type="font-awesome" />} onPress={() => this.toggleLogin()} />
                                <Text h4 style={{textAlign: "center"}}>Login</Text>
                                <Input 
                                    placeholder="   email or username"
                                    leftIcon={<Icon name="user" type="font-awesome" color="grey"/>}
                                />
                                <Input 
                                    placeholder="   password"
                                    leftIcon={<Icon name="lock" type="font-awesome" color="grey"/>}
                                    secureTextEntry={true}
                                />
                                <Button 
                                    title="create account" 
                                    onPress={this.toggleLogin}
                                    />
                        </View>
                    </Modal>

                    <Modal 
                        animationType="slide"
                        visible={this.state.isCreateOpen} 
                        onRequestClose={() => this.toggleCreate()}
                        statusBarTranslucent={true}
                    >
                        <View style={{flex: 1, alignItems: "center", justifyContent: "center"}}>
                            <Button buttonStyle={{backgroundColor: "transparent", marginLeft: 300, marginBottom: 120}} title="" icon={<Icon name="times" type="font-awesome" />} onPress={() => this.toggleCreate()} />
                            <Text h4 style={{textAlign: "center" }}>Create an account</Text>
                            <View style={{justifyContent: "center", alignItems: "center", width: 250, marginTop: 50}}>
                                <Input 
                                    placeholder="first name"
                                />
                                <Input 
                                    placeholder="last name"
                                />
                                <Input 
                                    placeholder="email address"
                                />
                                <Input 
                                    placeholder="username"
                                />
                                <Input 
                                    placeholder="password"
                                    secureTextEntry={true}
                                />
                                <Input 
                                    placeholder="re-enter password"
                                    secureTextEntry={true}
                                />
                                <Button 
                                    title="create account" 
                                    onPress={this.toggleCreate}
                                    />
                            </View>
                        </View>
                    </Modal>
                </View>
            </ImageBackground>
        );
    }
}

const style = StyleSheet.create({
    container:{
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center"
    },
    image: {
        flex: 1,
        resizeMode: "cover"
    }
})

export default WelcomeComponent;