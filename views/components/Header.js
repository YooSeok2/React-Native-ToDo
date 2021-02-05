import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import { AntDesign } from '@expo/vector-icons';

export default class Header extends Component{
  
    render(){
        const {clickHeader, webInfo} = this.props;
        
        return(
            <View style = {styles.container}>
                <TouchableOpacity onPress={()=>clickHeader()}>
                    <AntDesign name="arrowleft" size={24} color="white"/>
                </TouchableOpacity>
                <Text  style={styles.text}>{webInfo.title}</Text> 
            </View>
        )
    }

   
}

const styles = StyleSheet.create({
    container: { 
        justifyContent: 'flex-start',
        alignItems : 'center',
        flexDirection : 'row'
    },
    text : {
        color : '#ffffff',
        fontSize : 21,
        marginLeft : 25
    }
})