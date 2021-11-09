import React from 'react';
import Constants from "expo-constants"
import { View, Text, StyleSheet, ImageBackground } from "react-native"

const HomeComponent = () => {
    return (
        <ImageBackground source={{uri: "https://images.unsplash.com/photo-1604339454409-701c5278c546?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1827&q=80"}} resizeMode="cover" style={styles.image}>
            <View styles={styles.container}>
                <Text>HOME COMPONENT</Text>
            </View>
        </ImageBackground>
    );
    
}
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    image: {
        flex: 1,
        justifyContent: 'center',
        alignItems: "center",
        width: null,
        height: null
    }
})

export default HomeComponent;