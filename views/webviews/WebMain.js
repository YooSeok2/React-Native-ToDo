import React, {Component} from 'react';
import { View, StyleSheet, StatusBar, Text, Dimensions } from 'react-native';
import { WebView } from 'react-native-webview';


export default class WebMain extends Component{
  
    webview  =  null ; 

    render(){
        return(
            <View style ={styles.container}>
                <StatusBar barStyle='light-content' backgroundColor="#feb915"/>
                <View style={styles.header}> 
                        <Text  style={styles.title}>PAM</Text>
                    </View>
                <View style={styles.content}>
                    <WebView
                        ref = { ( ref )  => { ( this.webview  =  ref )} } 
                        source={{ uri: 'https://thehanpam.co/app/index_app'}}
                        onNavigationStateChange = { (event)=>{ 
                            this.handleWebViewNavigationStateChange(event)
                        }}
                        onHttpError={() => {
                            this.webview.stopLoading();
                        }}
                    />    
                </View>
            </View>
        );
    }


  
    handleWebViewNavigationStateChange= (newNavState)=>{
        const {navigation}  = this.props;
        

        var parseUrl  = newNavState.url.split('/');
        var urlArrayLength = parseUrl.length;

        if(newNavState.url !== 'https://thehanpam.co/app/index_app'){
            this.webview.stopLoading();
        }
        
        if(newNavState.loading === false){
            switch(parseUrl[3]){
                case 'app' :
                   if(parseUrl[urlArrayLength-1] === 'banner'){
                        navigation.navigate('Guide');
                        this.webview.goBack();
                        break;
                   }else if(parseUrl[urlArrayLength-1] === 'analysis_detail'){
                        navigation.navigate('Guide');
                        this.webview.goBack();
                        break;
                   }else if(parseUrl[urlArrayLength-1] === 'foreigner_detail'){
                        navigation.navigate('Foreign');
                        this.webview.goBack();
                        break;
                   }else{
                        break;
                   }
                case 'product' :
                    navigation.navigate('Manager',{expertId : parseUrl[urlArrayLength-1]});
                    this.webview.goBack();
                    break;
                default :
                    break;
            }
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
        justifyContent : 'center',
    },
    content : {
        flex : 10
    },
    title : {
        color : '#ffffff',
        fontSize : 30
    }
})