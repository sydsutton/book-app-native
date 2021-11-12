import React from 'react';
import {View} from "react-native"
import {Text} from "react-native-elements"

const RenderSelectedValue = ({value}) =>{
    return (
        <View>
            <Text>{value}</Text>
        </View>
    );
}

export default RenderSelectedValue;