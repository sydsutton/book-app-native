import React from 'react';
import Home from "./HomeComponent"
import Search from "./SearchComponent"
import Saved from "./SavedComponent"
import Profile from "./ProfileComponent"
import { ImageBackground, StyleSheet } from "react-native"
import Constants from "expo-constants"
import { NavigationContainer } from "@react-navigation/native"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { createAppContainer } from "react-navigation";


const Tab = createBottomTabNavigator()

function MyTabs(){
    return (
        <ImageBackground source={{uri: "https://images.unsplash.com/photo-1604339454409-701c5278c546?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1827&q=80"}} resizeMode="cover" style={styles.image}>
            <Tab.Navigator>
                <Tab.Screen 
                    name="Home"
                    component={Home}
                />
                <Tab.Screen 
                    name="Search" 
                    component={Search}
                />
                <Tab.Screen 
                    name="Saved" 
                    component={Saved}
                />
                <Tab.Screen 
                    name="Profile" 
                    component={Profile}
                />
            </Tab.Navigator>
        </ImageBackground>
    )
}

function MainComponent() {
    return (
        <NavigationContainer>
            <MyTabs />
        </NavigationContainer>
    );
  }
  
  const styles = StyleSheet.create({
      image: {
          flex: 1,
          resizeMode: "cover",
          justifyContent: "center",
          height: null,
          width: null
      }
  })

export default MainComponent;