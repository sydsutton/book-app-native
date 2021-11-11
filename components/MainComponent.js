import React from 'react';
import Home from "./HomeComponent"
import Search from "./SearchComponent"
import Saved from "./SavedComponent"
import Profile from "./ProfileComponent"
import Welcome from "./WelcomeComponent"
import {Icon} from "react-native-elements"
import { NavigationContainer } from "@react-navigation/native"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"

const Tab = createBottomTabNavigator()

function MyTabs(){
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                let iconName;
    
                if (route.name === 'Home') {
                    iconName = focused ? 'house-user' : 'house-user';
                } else if (route.name === 'Saved') {
                    iconName = focused ? 'book-open' : 'book-open';
                } else if (route.name === "Profile"){
                    iconName = focused ? "user-circle" : "user-circle"
                } else if (route.name === "Welcome"){
                    iconName = focused ? "hand-paper" : "hand-paper"
                }
    
                return <Icon name={iconName} size={size} color={color} type="font-awesome-5"/>;
                },
                tabBarActiveTintColor: 'blue',
                tabBarInactiveTintColor: 'gray',
            })}>
            <Tab.Screen 
                name="Welcome"
                component={Welcome}
            />
            <Tab.Screen 
                name="Home"
                component={Home}
            />
            {/* <Tab.Screen 
                name="Search" 
                component={Search}
            /> */}
            <Tab.Screen 
                name="Saved" 
                component={Saved}
            />
            <Tab.Screen 
                name="Profile" 
                component={Profile}
            />
        </Tab.Navigator>
    )
}

function MainComponent() {
    return (
        <NavigationContainer>
            <MyTabs />
        </NavigationContainer>
    );
  }
  
export default MainComponent