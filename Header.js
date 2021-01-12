import * as React from 'react';
import {View, Text, StyleSheet} from 'react-native';

export default function Header(){
    
    return(
        <View style = {styles.container}></View>
    )
}

const styles = StyleSheet.create({
    container : {
        flex : 1,
        backgroundColor : "#feb915"
    }
})