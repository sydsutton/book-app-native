import React from 'react';
import Home from "./HomeComponent"
import Search from "./SearchComponent"
import Saved from "./SavedComponent"
import Profile from "./ProfileComponent"
import { NavigationContainer } from "@react-navigation/native"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"


const Tab = createBottomTabNavigator()

function MyTabs(){
    return (
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
    )
}

function MainComponent() {
    return (
        <NavigationContainer>
            <MyTabs />
        </NavigationContainer>
    );
  }
  
export default MainComponent;