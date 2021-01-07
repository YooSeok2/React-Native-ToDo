import React, {Component} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Dimensions, TextInput} from 'react-native';

const {width} = Dimensions.get("window");


export default class Todo extends React.Component{
    state = {
        isCompleted : false,
        isEditing : false,
        todoValue : this.props.text
    }
    
    render(){

        const {isCompleted, isEditing, todoValue} = this.state
        return(
            <View style ={styles.container}>
                <TouchableOpacity onPress={this._toggleCompleted}>
                    <View style = {[styles.circle, isCompleted ? styles.completedCircle : styles.uncompletedCircle]}></View>
                </TouchableOpacity>
                {isEditing ? (
                    <View style = {styles.contentView}>
                        <TextInput 
                        style={isCompleted ? styles.completedText : styles.text} 
                        autoCorrect ={false}
                        onChangeText={this._controllInput}
                        multiline = {true}
                        value = {todoValue}
                        onBlur = {this._finishEditing}
                        ></TextInput>
                        <View style={[styles.actionView, styles.editActionView]}>
                            <TouchableOpacity onPress = {this._finishEditing}>
                                <View style = {styles.actionContainer}>
                                    <Text>✔</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                ) : (
                    <View style = {styles.contentView}>
                        <Text style={isCompleted ? styles.completedText : styles.text}>{todoValue}</Text>
                        <View style={styles.actionView}>
                            <TouchableOpacity onPress ={this._startEditing}>
                                <View style = {styles.actionContainer}>
                                    <Text>🖊</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <View style = {styles.actionContainer}>
                                    <Text>❌</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                )
                }
                
            </View>
        )
    }

    _toggleCompleted = ()=>{
        this.setState(prevState=>{
            return {
                isCompleted : !prevState.isCompleted
            }
        })
    }

    _startEditing = ()=>{
        this.setState({
            isEditing : true
        })
    }

    _finishEditing = ()=>{
        this.setState({
            isEditing : false
        })
    }

    _controllInput = (text) =>{
        this.setState({
            todoValue : text
        })
    }
}

const styles = StyleSheet.create({
    container : {
        width : width - 50,
        borderBottomWidth : StyleSheet.hairlineWidth,
        borderBottomColor : '#bbb',
        flexDirection : 'row',
        alignItems : 'center',
        paddingTop : 15,
        paddingBottom : 15,
        paddingLeft : 10
    },
    text : {
        fontSize : 20,
        fontWeight : "600",
        color : '#1d1d1f',
        width : width /2 
    },
    circle : {
        width : 30,
        height : 30,
        borderRadius : 15,
        
        borderWidth : 2,
        marginRight : 20
    },
    completedCircle : {
        borderColor : '#bbb',
    },
    uncompletedCircle : {
        borderColor : '#f23657'
    },
    completedText : {
        color : '#bbb',
        fontSize : 20,
        fontWeight : "600",
        textDecorationLine:"line-through",
        width : width /2 
    },
    contentView : {
        flexDirection : "row",
        alignItems : 'center'
    },
    actionView : {
        width : width / 7,
        flexDirection : 'row',
        justifyContent : 'space-between',
        alignItems : "center"
    },
    editActionView :{
        marginLeft : 30
    },
    actionContainer :{
        marginVertical : 10,
        marginHorizontal : 10
    }
})