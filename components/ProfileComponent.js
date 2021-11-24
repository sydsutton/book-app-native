import React, { Component } from 'react';
import {View, ImageBackground, StyleSheet } from "react-native"
import { Button, Image, Text, Card } from "react-native-elements"
import { connect } from "react-redux"

const mapStateToProps = state => {
    return {
        userInfo: state
    }
}

class ProfileComponent extends Component {
    constructor(props){
        super(props)
        this.state = {
            password: ""
        }
    }

//     async componentDidMount(){
//         const url = `https://randomuser.me/api/`
        
//         const res = await fetch(url)
//         const data = await res.json()
//         this.setState({userData: data.results[0]})
//         // console.log(this.state.userData)
//         let password = this.state.userData.login.password
//         let newPassword = password.replace(/[a-z0-9]/gi, "*")
//         this.setState({password: newPassword})
// }

    componentDidMount(){
        if(this.props.userInfo.user.password){
            let password = this.props.userInfo.user.password
            let newPassword = password.replace(/[a-z0-9]/gi, "*")
            this.setState({password: newPassword})
        } else {
            null
        }
    }

    handlePassword = () => {
        if(this.state.password.includes("*")){
            this.setState({
                password: this.props.userInfo.user.password
            })
        } else {
            this.setState({
                password: this.props.userInfo.user.password.replace(/[a-z0-9]/gi, "*")
            })
        }
    }

    render(){
        return (
            <ImageBackground source={require("../images/backgroundImage.jpg")} style={styles.imageBackground}>
                <View style={styles.container}>
                    {this.props.userInfo.user.isLoggedIn ? 
                    <Card containerStyle={styles.card}>
                        <View style={styles.imageContainer}>
                            <Image style={styles.image} 
                                source={{uri: `https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png`}} 
                            /> 
                        </View>
                        <View style={styles.nameContainer}>
                            <Text h4 style={styles.firstName}>{this.props.userInfo.user.firstName}</Text>
                            <Text h4 style={styles.lastName}>{this.props.userInfo.user.lastName}</Text>
                        </View>
                        <View style={styles.userContainer}>
                            <Text style={{fontSize: 15}}>Username: <Text style={styles.text}>{this.props.userInfo.user.username}</Text></Text>
                            <View style={styles.passContainer}>
                                <Text style={styles.password}>Password: <Text style={styles.text}>{this.state.password}</Text></Text>
                                {this.state.password.includes("*") ? <Button buttonStyle={styles.passwordButton} title="Show password" onPress={this.handlePassword} /> : <Button buttonStyle={styles.passwordButton} title="Hide password" onPress={this.handlePassword} />}
                            </View>
                        </View>
                        <Button title="press" onPress={() => console.log(this.props.userInfo)} />
                    </Card>
                    : 
                    <Card containerStyle={styles.card}>
                        <View style={styles.imageContainer}>
                            <Image style={styles.image} 
                                source={{uri: `https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png`}} 
                            /> 
                        </View>
                        <View style={styles.nameContainer}>
                            <Text h4 style={styles.firstName}>No user data</Text>
                        </View>
                        <View style={styles.userContainer}>
                            
                        </View>
                    </Card>}
                </View>
            </ImageBackground>
        )
    }
}

const styles = StyleSheet.create({
    imageBackground: {
        resizeMode: "cover", 
        flex: 1
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
        marginTop: 70
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
        width: 100,
        padding: 2
    }
})

export default connect(mapStateToProps)(ProfileComponent)