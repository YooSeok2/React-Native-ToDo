import React, {Component} from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';
import { WebView } from 'react-native-webview';
import Header from './components/Header';

export default class Webhome extends Component {
    state = {
        web_info : {},
        ref_web : '',
        isloaded : false
    }

    webview  =  null ; 
   
    render(){
        const {web_info} = this.state;
        return(
            <View style = {styles.container}>
                <StatusBar barStyle='light-content' backgroundColor="#feb915"/>
                <View style={styles.header}>
                    <Header clickHeader = {this.clickHeaderListener} webInfo = {web_info}/>
                </View>
                <View style={styles.content}>
                    <WebView
                     ref = { ( ref )  =>  ( this . webview  =  ref ) } 
                     source={{ uri: 'https://thehanpam.co/app/index_app' }}
                     onNavigationStateChange = { this.handleWebViewNavigationStateChange } 
                      />    
                </View>
                
            </View>
            
        );
    }

    clickHeaderListener = (route)=>{
        const {isloaded} = this.state;
        console.log(isloaded);
        if(route !== 'https://thehanpam.co/app/index_app' && isloaded){
            const  newURL  =  'https://thehanpam.co/app/index_app' ; 
            const  redirectTo  =  'window.location = "'  +  newURL +  ' "' ; 
            this.webview.injectJavaScript( redirectTo );
            this.setState({
                isloaded : false
            })
        }
    }

    

    handleWebViewNavigationStateChange= (newNavState)=>{
        if(!newNavState.loading){
            this.setState({
                web_info : newNavState,
                isloaded : true
            })
        }
 
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
        flex : 10
    }
})

