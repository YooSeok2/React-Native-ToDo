import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

export default class Header extends Component{
  
    render(){
        const {clickHeader, webInfo} = this.props;
        console.log(webInfo);
        return(
            <View>
                <TouchableOpacity onPress={()=>clickHeader()}>
                    <Text  style={styles.text}>{webInfo.title}</Text> 
                </TouchableOpacity>
            </View>
        )
    }

   
}

const styles = StyleSheet.create({
    text : {
        color : '#ffffff',
        fontSize : 20
    }
})