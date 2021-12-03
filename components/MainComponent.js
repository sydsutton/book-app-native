import React, { Component } from 'react';
import Home from "./HomeComponent"
import Saved from "./SavedComponent"
import Profile from "./ProfileComponent"
import { Icon } from "react-native-elements"
import { NavigationContainer } from "@react-navigation/native"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"

const Tab = createBottomTabNavigator()

function MyTabs() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                let iconName;
    
                if (route.name === 'Home') {
                    iconName = focused ? 'home' : 'home';
                } else if (route.name === 'Saved') {
                    iconName = focused ? 'bookmark' : 'bookmark';
                } else if (route.name === "Profile"){
                    iconName = focused ? "user" : "user"
                } 
    
                return <Icon name={iconName} size={28} color={color} type="font-awesome"/>;
                },
                tabBarActiveTintColor: '#4163BE',
                tabBarInactiveTintColor: '#A0AAC3',
                tabBarInactiveBackgroundColor: "rgba(0,0,0,.85)",
                tabBarActiveBackgroundColor: "rgba(0,0,0,.85)",
                tabBarLabel: () => {return null},
                style: {
                    height: "10%"
                }
            })}>
            <Tab.Screen 
                name="Home"
                component={Home}
                options={{  
                    headerShown: false,  
                  }}   
            />
            <Tab.Screen 
                name="Saved" 
                component={Saved}
                options={{  
                    headerShown: false,  
                  }}   
            />
            <Tab.Screen 
                name="Profile" 
                component={Profile}
                options={{  
                    headerShown: false,  
                  }}   
            />
        </Tab.Navigator>
    )

}

class MainComponent extends Component {
    render() {
        return (
            <NavigationContainer>
                <MyTabs/>
            </NavigationContainer>
        );
    }
  }
  
export default MainComponent