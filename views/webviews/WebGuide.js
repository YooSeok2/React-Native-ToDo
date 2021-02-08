import React, {Component} from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';
import { WebView } from 'react-native-webview';
import Header from '../components/Header';



export default class WebMain extends Component{
    constructor(props){
        super(props);
        this.state = {
            web_info : {}
        }
    }

    webview  =  null ; 


    render(){
        const {web_info} = this.state;
      

        return(
            <View style ={styles.container}>
                <StatusBar barStyle='light-content' backgroundColor="#feb915"/>
                    <View style={styles.header}> 
                        <Header clickHeader = {this.clickHeaderListener} webInfo = {web_info}/>
                    </View>
                    <View style={styles.content}>
                        <WebView
                            ref = { ( ref )  => { ( this . webview  =  ref )} } 
                            source={{ uri: 'https://thehanpam.co/app/index_app/banner'}}
                            onNavigationStateChange = { (event)=>{ 
                                this.handleWebViewNavigationStateChange(event)
                            }} 
                        />    
                    </View>
            </View>
        );
    }

    clickHeaderListener = ()=>{
        const {navigation}  = this.props;
        navigation.popToTop();
        
    }

    handleWebViewNavigationStateChange= (newNavState)=>{
        
        if(newNavState.loading === false){
            this.setState({
                web_info : newNavState,
            });
        }
    
    }
}

const styles = StyleSheet.create({
    container : {
        flex : 1
    },
    header : {
        height : 60,
        backgroundColor : "#feb915",
        paddingLeft : 15,
        paddingBottom : 15,
        justifyContent : 'flex-end'
    },
    content : {
        flex : 10
    },
    title : {
        color : '#ffffff',
        fontSize : 30
    }
})