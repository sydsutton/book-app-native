import React, { Component } from 'react';
import {View, ImageBackground} from "react-native"
import { Button, Image, Text } from "react-native-elements"

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
        console.log(this.state.userData)
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
            <ImageBackground source={require("../images/backgroundImage.jpg")} style={{resizeMode: "cover", flex: 1}}>
                {this.state.userData ? 
                <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
                    <Image style={{width: 160, height: 160, borderRadius: 300, shadowOpacity: 0.26, shadowOffset: { width: 0, height: 2}, shadowRadius: 10, elevation: 3}} 
                        source={{uri: `${this.state.userData.picture.large}`}} 
                    /> 
                    <Text h4 style={{fontWeight: "bold"}}>{this.state.userData.name.first} {this.state.userData.name.last}</Text>
                    <View style={{margin: 0, paddingTop: 40, height: 160}}>
                        <Text style={{fontSize: 20}}>Username: <Text style={{fontWeight: "bold"}}>{this.state.userData.login.username}</Text></Text>
                        <View style={{flex: 1, flexDirection: "row", alignItems: "center"}}>
                            <Text style={{fontSize: 20, marginRight: 20}}>Password: <Text style={{fontWeight: "bold"}}>{this.state.password}</Text></Text>
                            {this.state.password.includes("*") ? <Button title="Show password" onPress={this.handlePassword} /> : <Button title="Hide password" onPress={this.handlePassword} />}
                        </View>
                    </View>
                </View>
               : null}
            </ImageBackground>
        )
    }
}

export default ProfileComponent;