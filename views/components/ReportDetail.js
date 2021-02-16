import React, {Component} from 'react';
import {Modal, View, Text, Dimensions,StatusBar, StyleSheet, Pressable} from 'react-native';
import { WebView } from 'react-native-webview';
import { AntDesign } from '@expo/vector-icons';
import PropTypes from 'prop-types';

const {width} = Dimensions.get('window');

export default class ReportDetail extends Component{
    constructor(props){
        super(props);
        this.state = {
            web_info : []
        }
    }

    webview  =  null ; 

    render(){
        const {modalVisible, setModalVisible, unique} = this.props;
        const {web_info} = this.state

        return(
            <Modal
                animationType = 'slide'
                visible = {modalVisible}
                transparent={true}
                
            >
                <StatusBar barStyle='light-content' backgroundColor="#feb915"/>
                <View style = {styles.header}>
                    <Pressable onPress={()=>setModalVisible()}>
                        <AntDesign name="arrowleft" size={24} color="white"/>
                    </Pressable>
                    <Text  style={styles.headerTitle}>{web_info.title}</Text> 
                </View>
                <WebView
                    ref = { ( ref )  => { ( this.webview  =  ref )} } 
                    source={{ 
                        uri: 'https://thehanpam.co/app/manager_reports/?unique='+unique,
                    }}
                    onNavigationStateChange = { (event)=>{ 
                        this.handleWebViewNavigationStateChange(event)
                    }}
                />
            </Modal>
        )  
    }


    handleWebViewNavigationStateChange=(newNavState)=>{
            if(newNavState.loading === false){
                this.setState({
                    web_info : newNavState,
                });
            }
    }
}

ReportDetail.propTypes = {
    modalVisible : PropTypes.bool,
    setModalVisible : PropTypes.func,
    unique : PropTypes.string
}


const styles = StyleSheet.create({
    header : {
        flexDirection : 'row',
        height : 50,
        backgroundColor : '#feb915',
        paddingHorizontal : 15,
        justifyContent : 'flex-start',
        alignItems : 'center'
    },
    headerTitle : {
        fontSize : 20,
        color : '#ffffff',
        marginLeft : 30
    },
})