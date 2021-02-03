import React, {Component} from 'react';
import { View, StyleSheet, StatusBar, Animated, Dimensions } from 'react-native';
import { WebView } from 'react-native-webview';
import Header from '../components/Header';

const {height} = Dimensions.get('window');

export default class WebMain extends Component{
    constructor(props){
        super(props);
        this.state = {
            web_info : {},
            bounceValue : new Animated.Value(height)
        }
    }

    webview  =  null ; 

    componentDidMount = async()=>{
        // const { bounceValue } = this.state
        // await Animated.timing(
        //     bounceValue,
        //     {
        //       toValue: 0,
        //       duration: 200
        //     }
        // ).start();
        // await this.setState({
        //     bounceValue : 0
        // });
    }

    componentWillUnmount = async()=>{
        // const { bounceValue } = this.state
        // await Animated.timing(
        //     bounceValue,
        //     {
        //       toValue: height,
        //       duration: 200
        //     }
        // ).start();
        // await this.setState({
        //     bounceValue : height
        // })
    }

    render(){
        const {web_info, bounceValue} = this.state;
        const animationStyles = {
            transform : [
               {translateY : bounceValue} 
            ]
        }

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
        this.webview.stopLoading();
    }

    handleWebViewNavigationStateChange= (newNavState)=>{
        console.log(newNavState);
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
        flex  :1,
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
        fontSize : 25
    }
})