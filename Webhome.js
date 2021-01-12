import React, {Component} from 'react';
import { View, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';
import Header from './Header';

export default class Webhome extends Component {
    render(){
        return(
            <View style = {styles.container}>
                <View style={styles.header}>
                    <Header />
                </View>
                <View style={styles.content}>
                    <WebView source={{ uri: 'https://thehanpam.co/app/index_app' }} />    
                </View>
                
            </View>
            
        );
    }
}

const styles = StyleSheet.create({
    container : {
        flex : 1
    },
    header : {
        flex : 1
    },
    content : {
        flex : 7
    }
})

