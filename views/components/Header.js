import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import * as Linking from 'expo-linking';




export default class Header extends Component{

    
    render(){
        const {clickHeader, webInfo}  = this.props;
        return(
            <View style = {styles.container}>
                <TouchableOpacity onPress={()=>clickHeader(webInfo.url)}>
                 {webInfo.title !== 'Document' ? <Text  style={styles.text}>{webInfo.title}</Text> : <Text  style={styles.text}>PAM</Text>}
                </TouchableOpacity>
            
            </View>
        )
    }
    
}



const styles = StyleSheet.create({
    container : {
        flex : 1,
        backgroundColor : "#feb915",
        paddingLeft : 15,
        paddingBottom : 10,
        justifyContent : 'flex-end'
    },
    text : {
        color : '#ffffff',
        fontSize : 20
    }
})