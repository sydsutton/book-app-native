import React, { Component } from 'react';
import {View, ImageBackground} from "react-native"
import { Button, Image, Text, Card } from "react-native-elements"

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
                <View style={{flex: 1, alignItems: "center"}}>
                    {this.state.userData ? 
                    <Card containerStyle={{justifyContent: "center", borderRadius: 30, marginTop: 100}}>
                        <View style={{position: "absolute", bottom: 160, left: 61, top:-95}}>
                            <Image style={{width: 160, height: 160, borderRadius: 300}} 
                                source={{uri: `${this.state.userData.picture.large}`}} 
                            /> 
                        </View>
                        <View style={{borderBottomWidth: 1, borderColor: "rgba(0,0,0,.2)", paddingBottom: 10}}>
                            <Text h4 style={{fontWeight: "bold", alignSelf: "center", marginTop: 70}}>{this.state.userData.name.first}</Text>
                            <Text h4 style={{fontWeight: "bold", alignSelf: "center"}}>{this.state.userData.name.last}</Text>
                        </View>
                        <View style={{margin: 0, paddingTop: 40, height: 160}}>
                            <Text style={{fontSize: 15}}>Username: <Text style={{fontWeight: "bold", fontSize: 18}}>{this.state.userData.login.username}</Text></Text>
                            <View style={{flex: 1, flexDirection: "row", alignItems: "center"}}>
                                <Text style={{fontSize: 15, marginRight: 20}}>Password: <Text style={{fontWeight: "bold", fontSize: 18}}>{this.state.password}</Text></Text>
                                {this.state.password.includes("*") ? <Button title="Show password" onPress={this.handlePassword} /> : <Button title="Hide password" onPress={this.handlePassword} />}
                            </View>
                        </View>
                    </Card>
                    : null}
                </View>
            </ImageBackground>
        )
    }
}

export default ProfileComponent;