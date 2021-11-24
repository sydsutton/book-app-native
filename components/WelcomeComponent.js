import React, {Component} from 'react';
import { View, StyleSheet, ImageBackground, TouchableOpacity, Modal } from "react-native"
import {Button, Icon, Text, Overlay, Card, Input } from "react-native-elements"
import { connect } from "react-redux"
import { saveProfile } from "../redux/ActionCreators"

const mapStateToProps = state => {
    return {
        userInfo: state
    }
}

const mapDispatchToProps = {
    saveProfile: (userInfo) => saveProfile(userInfo)
}

class WelcomeComponent extends Component {
    constructor(props){
        super(props)
        this.state = {
            isLoginOpen: false,
            isCreateOpen: false,
            firstName: "",
            lastName: "",
            email: "",
            username: "",
            password: "",
            loginUsername: "",
            loginPassword: "",
            isLoggedIn: false
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

    async handleLogin(){
        if(this.state.loginUsername != "" && this.state.loginPassword != ""){
            if(this.state.loginUsername === this.props.userInfo.user.username && this.state.loginPassword === this.props.userInfo.user.password){
                await this.setState({isLoggedIn: true})
                this.props.saveProfile(this.state)
            } else null
        } else {
            this.props.saveProfile(this.state)
            console.log("Sorry, we don't have record of that username/ password combo")
        }
    }

    render(){
        return (
            <ImageBackground source={require("../images/coverImage.jpg")} style={styles.image}> 
                <View style={styles.container}>
                    <Text h2 style={styles.title}>YourShelf</Text>
                    <Text style={styles.subtitle}>Your very own digital bookshelf</Text>
                    <Text>{JSON.stringify(this.props.userInfo.user.isLoggedIn)}</Text>
                    <TouchableOpacity>
                        <Button 
                            icon={<Icon name="login" color="#fff" style={{marginRight: 10}}/>} 
                            buttonStyle={styles.loginButton} 
                            title="login"
                            onPress={this.toggleLogin}/>
                        <Button 
                            buttonStyle={styles.createButton} 
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
                        <View style={styles.loginContainer}>
                            <Button buttonStyle={{backgroundColor: "transparent"}} title="" icon={<Icon name="times" type="font-awesome" />} onPress={() => this.toggleLogin()} />
                                <Text h4 style={{textAlign: "center"}}>Login</Text>
                                <Input 
                                    placeholder="   username"
                                    onChangeText={loginUsername => this.setState({loginUsername: loginUsername})}
                                    leftIcon={<Icon name="user" type="font-awesome" color="grey"/>}
                                    
                                />
                                <Input 
                                    placeholder="   password"
                                    leftIcon={<Icon name="lock" type="font-awesome" color="grey"/>}
                                    onChangeText={loginPassword => this.setState({loginPassword: loginPassword})}
                                    secureTextEntry={true}
                                />
                                <Button 
                                    title="login" 
                                    onPress={() => {
                                        this.handleLogin()
                                        this.toggleLogin()
                                    }}
                                    />
                        </View>
                    </Modal>

                    <Modal 
                        animationType="slide"
                        visible={this.state.isCreateOpen} 
                        onRequestClose={() => this.toggleCreate()}
                        statusBarTranslucent={true}
                    >
                        <View style={styles.loginContainer}>
                            <Button buttonStyle={{backgroundColor: "transparent", marginLeft: 300, marginBottom: 120}} title="" icon={<Icon name="times" type="font-awesome" />} onPress={() => this.toggleCreate()} />
                            <Text h4 style={{textAlign: "center" }}>Create an account</Text>
                            <View style={{justifyContent: "center", alignItems: "center", width: 250, marginTop: 50}}>
                                <Input 
                                    placeholder="first name"
                                    onChangeText={firstName => this.setState({firstName: firstName})}
                                    value={this.state.firstName}
                                />
                                <Input 
                                    placeholder="last name"
                                    onChangeText={lastName => this.setState({lastName: lastName})}
                                    value={this.state.lastName}
                                />
                                <Input 
                                    placeholder="email address"
                                    onChangeText={email => this.setState({email: email})}
                                    value={this.state.email}
                                />
                                <Input 
                                    placeholder="username"
                                    onChangeText={username => this.setState({username: username})}
                                    value={this.state.username}
                                />
                                <Input 
                                    placeholder="password"
                                    onChangeText={password => this.setState({password: password})}
                                    value={this.state.password}
                                    secureTextEntry={true}
                                />
                                <Input 
                                    placeholder="re-enter password"
                                    secureTextEntry={true}
                                />
                                <Button 
                                    title="create account" 
                                    onPress={() => {
                                        this.props.saveProfile(this.state)
                                        this.toggleCreate()
                                    }}
                                    />
                            </View>
                        </View>
                    </Modal>
                </View>
            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center"
    },
    image: {
        flex: 1,
        resizeMode: "cover"
    },
    title: {
        flex: 1, 
        top: 40, 
        color: "#fff"
    },
    subtitle: {
        color: 'white', 
        flex: 1, 
        bottom: 120
    },
    loginButton: {
        width: 200, 
        borderRadius: 20, 
        marginBottom: 20
    },
    createButton: {
        width: 200, 
        borderRadius: 20, 
        marginBottom: 50, 
        borderWidth: 2
    },
    loginContainer: {
        flex: 1, 
        alignItems: "center", 
        justifyContent: "center"
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(WelcomeComponent)