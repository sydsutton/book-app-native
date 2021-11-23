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
            userData: "",
            password: ""
        }
    }

    async componentDidMount(){
        const url = `https://randomuser.me/api/`
        
        const res = await fetch(url)
        const data = await res.json()
        this.setState({userData: data.results[0]})
        // console.log(this.state.userData)
        let password = this.state.userData.login.password
        let newPassword = password.replace(/[a-z0-9]/gi, "*")
        this.setState({password: newPassword})
}

    handlePassword = () => {
        if(this.state.password.includes("*")){
            this.setState({
                password: this.state.userData.login.password
            })
        } else {
            this.setState({
                password: this.state.userData.login.password.replace(/[a-z0-9]/gi, "*")
            })
        }
    }

    render(){
        return (
            <ImageBackground source={require("../images/backgroundImage.jpg")} style={styles.imageBackground}>
                <View style={styles.container}>
                    {this.state.userData ? 
                    <Card containerStyle={styles.card}>
                        <View style={styles.imageContainer}>
                            <Image style={styles.image} 
                                source={{uri: `${this.state.userData.picture.large}`}} 
                            /> 
                        </View>
                        <View style={styles.nameContainer}>
                            <Text h4 style={styles.firstName}>{this.state.userData.name.first}</Text>
                            <Text h4 style={styles.lastName}>{this.state.userData.name.last}</Text>
                        </View>
                        <View style={styles.userContainer}>
                            <Text style={{fontSize: 15}}>Username: <Text style={styles.text}>{this.state.userData.login.username}</Text></Text>
                            <View style={styles.passContainer}>
                                <Text style={styles.password}>Password: <Text style={styles.text}>{this.state.password}</Text></Text>
                                {this.state.password.includes("*") ? <Button title="Show password" onPress={this.handlePassword} /> : <Button title="Hide password" onPress={this.handlePassword} />}
                            </View>
                        </View>
                        <Button title="press" onPress={() => console.log(this.props.userInfo)} />
                    </Card>
                    : null}
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
        marginTop: 100
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
    }
})

export default connect(mapStateToProps)(ProfileComponent)