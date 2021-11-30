import React, {Component} from 'react';
import { View, StyleSheet, ImageBackground, TouchableOpacity, Modal, Alert } from "react-native"
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
            confirmPassword: "",
            loginUsername: "",
            loginPassword: "",
            isLoggedIn: false,
            errorMessage: ""
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

    handleLogOut = () => {
        Alert.alert(
            "Are you sure you want to log out?",
            "",
            [
                {
                    text: "Cancel",
                    style: "cancel",
                },
                {
                    text: "Ok", 
                    onPress: () => {
                        this.setState({isLoggedIn: false})
                        this.props.saveProfile(this.state)
                    }
                }
            ]
        )
    }

    async handleLogin(){
        this.setState({errorMessage: ""})
        if(this.state.loginUsername != "" && this.state.loginPassword != ""){
            if(this.state.loginUsername === this.props.userInfo.profile.username && this.state.loginPassword === this.props.userInfo.profile.password){
                await this.setState({isLoggedIn: true})
                this.props.saveProfile(this.state)
                this.toggleLogin()
            } else {
                this.setState({
                    errorMessage: "We don't have record of that user name/ password combination"
                })
            }
        } else {
            this.props.saveProfile(this.state)
        }
    }

    render(){
        const { isLoginOpen, isCreateOpen, firstName, lastName, email, username, password, confirmPassword, loginUsername, loginPassword, isLoggedIn, errorMessage } = this.state
        return (
            <ImageBackground source={require("../images/coverImage.jpg")} style={styles.image}> 
                <View style={styles.container}>
                    <Text h2 style={styles.title}>YourShelf</Text>
                    <Text style={styles.subtitle}>Your very own digital bookshelf</Text>
                    <TouchableOpacity>
                        {this.props.userInfo.profile.isLoggedIn ? 
                            <View>
                                <Button 
                                    icon={<Icon name="check" color="#fff" style={{marginRight: 10}}/>} 
                                    buttonStyle={[styles.loginButton, styles.loggedIn]} 
                                    title="logged in"
                                />
                                <Button 
                                    icon={<Icon name="sign-out" color="#1e81b0" type="font-awesome" style={{marginRight: 10}}/>}
                                    buttonStyle={styles.createButton} 
                                    title="log out"
                                    type="outline"
                                    onPress={() => this.handleLogOut()}
                                />
                            </View>
                        :
                            <View>
                                <Button 
                                    icon={<Icon name="login" color="#fff" style={{marginRight: 10}}/>} 
                                    buttonStyle={styles.loginButton} 
                                    title="login"
                                    onPress={this.toggleLogin}
                                />
                                <Button 
                                    buttonStyle={styles.createButton} 
                                    title="create account"
                                    type="outline"
                                    onPress={this.toggleCreate}
                                />
                            </View>
                        }
                    </TouchableOpacity>

                    <Modal 
                        animationType="slide"
                        visible={isLoginOpen} 
                        onRequestClose={() => this.toggleLogin()}
                        statusBarTranslucent={true}
                    >
                        <View style={styles.loginContainer}>
                            <Button buttonStyle={styles.closeButton} title="" icon={<Icon name="times" type="font-awesome" />} onPress={() => this.toggleLogin()} />
                                <Text h4 style={{textAlign: "center"}}>Login</Text>
                                <Input 
                                    placeholder="   username"
                                    onChangeText={loginUsername => this.setState({loginUsername: loginUsername})}
                                    leftIcon={<Icon name="user" type="font-awesome" color="grey"/>}
                                    errorMessage={loginUsername === "" ? "Username is required" : ""}
                                />
                                <Input 
                                    placeholder="   password"
                                    leftIcon={<Icon name="lock" type="font-awesome" color="grey"/>}
                                    onChangeText={loginPassword => this.setState({loginPassword: loginPassword})}
                                    secureTextEntry={true}
                                    errorMessage={loginPassword === "" ? "Password is required" : ""}
                                />
                                <Button 
                                    title="login" 
                                    onPress={() => this.handleLogin()}
                                />
                                <Text style={styles.errorMessage}>{errorMessage}</Text>
                        </View>
                    </Modal>

                    <Modal 
                        animationType="slide"
                        visible={isCreateOpen} 
                        onRequestClose={() => this.toggleCreate()}
                        statusBarTranslucent={true}
                    >
                        <View style={styles.loginContainer}>
                            <Button buttonStyle={styles.closeButton} title="" icon={<Icon name="times" type="font-awesome" />} onPress={() => this.toggleCreate()} />
                            <Text h4 style={{textAlign: "center" }}>Create an account</Text>
                            <View style={{justifyContent: "center", alignItems: "center", width: 250, marginTop: 50}}>
                                <Input 
                                    placeholder="first name"
                                    onChangeText={firstName => this.setState({firstName: firstName})}
                                    value={firstName}
                                    errorMessage={firstName === "" ? "Please enter a username" : null}
                                />
                                <Input 
                                    placeholder="last name"
                                    onChangeText={lastName => this.setState({lastName: lastName})}
                                    value={lastName}
                                    errorMessage={lastName === "" ? "Please enter a username" : null}
                                />
                                <Input 
                                    placeholder="email address"
                                    onChangeText={email => this.setState({email: email})}
                                    value={email}
                                    errorMessage={email === "" ? "Please enter a username" : null}
                                />
                                <Input 
                                    placeholder="username"
                                    onChangeText={username => this.setState({username: username})}
                                    value={username}
                                    errorMessage={username === "" ? "Please enter a username" : null}
                                />
                                <Input 
                                    placeholder="password"
                                    onChangeText={password => this.setState({password: password})}
                                    value={password}
                                    secureTextEntry={true}
                                    errorMessage={password === "" ? "Please enter a password" : null}
                                />
                                <Input 
                                    placeholder="re-enter password"
                                    secureTextEntry={true}
                                    onChangeText={confirmPassword => this.setState({confirmPassword: confirmPassword})}
                                    value={confirmPassword}
                                    errorMessage={(password != confirmPassword) && confirmPassword != "" ? "Those passwords don't match" : ""}
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
        alignItems: "center", 
        justifyContent: "center",
        marginLeft: 50,
        width: 300
    },
    closeButton: {
        backgroundColor: "transparent", 
        marginTop: 30, 
        marginLeft: 250
    },
    errorMessage: {
        color: "red",
        marginTop: 30,
        textAlign: "center"
    },
    loggedIn: {
        backgroundColor: "green"
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(WelcomeComponent)