import React, {Component} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Dimensions, TextInput} from 'react-native';
import PropTypes from 'prop-types';
import Header from './Header';

const {width} = Dimensions.get("window");


export default class Todo extends Component{
    constructor(props){
        super(props);
        
        this.state={
            isEditing : false,
            todoValue : props.text
        }
    }
    static propsTypes ={
        text : PropTypes.string.isRequired,
        isCompleted : PropTypes.bool.isRequired,
        id : PropTypes.string.isRequired,
        deleteToDo : PropTypes.func.isRequired,
        completed : PropTypes.func.isRequired,
        uncompleted : PropTypes.func.isRequired,
        updateTodo : PropTypes.func.isRequired
    }
 
  
    render(){
        const { isEditing, todoValue} = this.state;
        const {text, id, deleteToDo, isCompleted} = this.props;
        return(
            <View style ={styles.container}>
                <TouchableOpacity onPressOut={this._toggleCompleted}>
                    <View style = {[styles.circle, isCompleted ? styles.completedCircle : styles.uncompletedCircle]}></View>
                </TouchableOpacity>
                {isEditing ? (
                    <View style = {styles.contentView}>
                        <TextInput 
                        style={[styles.input,isCompleted ? styles.completedText : styles.text]} 
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
                        <Text style={isCompleted ? styles.completedText : styles.text}>{text}</Text>
                        <View style={styles.actionView}>
                            <TouchableOpacity onPress ={this._startEditing}>
                                <View style = {styles.actionContainer}>
                                    <Text>🖊</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPressOut={()=>deleteToDo(id)}>
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
        const {completed, uncompleted, isCompleted, id} = this.props;

        if(isCompleted){
            uncompleted(id);
        }else{
            completed(id);
        }
    }

    _startEditing = ()=>{
        this.setState({
            isEditing : true
        })
    }

    _finishEditing = ()=>{
        const {todoValue} = this.state
        const {updateTodo, id} = this.props;
        updateTodo(id, todoValue);
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
    },
    input : {
        width : width /2
    }
})