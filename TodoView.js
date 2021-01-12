import React, {Component} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Dimensions, Platform, ScrollView, AsyncStorage } from 'react-native';
import Todo from './Todo';
import uuid from "react-native-uuid";


const {width} = Dimensions.get("window");

export default class Webhome extends Component {
    state = {
        newToDo : "",
        toDos : {}
      }
     
    componentDidMount = ()=>{
    this._loadedToDo()
    }
    render(){
        const {newToDo, toDos} = this.state;
        return(
            <View style={styles.container}>
                <StatusBar barStyle="light-content" />
                <Text style={styles.title}>YooGGu ToDos</Text>
                <View style= {styles.card}>
                <TextInput 
                    style={styles.input} 
                    placeholder={"New To Do"}
                    value = {newToDo}
                    onChangeText = {this._controlNewToDo}
                    autoCorrect = {false}
                    placeholderTextColor ={"#bbb"}
                    onEndEditing = {this._addTodo}
                >
                </TextInput>
                <ScrollView contentContainerStyle = {styles.todo} showsVerticalScrollIndicator={false}>
                    {Object.values(toDos).sort((prev,next)=>{return next.createdAt - prev.createdAt
                    }).map(todo=>{
                    return <Todo key={todo.id} {...todo} deleteToDo={this._deleteTodo} completed={this._completedTodo} uncompleted={this._unCompletedTodo} updateTodo={this._updateTodo}/>
                    })}
                </ScrollView>
                </View>
            </View>
        )
    }

      _controlNewToDo = text =>{
        this.setState({
          newToDo : text
        })
      }
    
      _loadedToDo = async ()=>{
        try{
          const getToDos = await AsyncStorage.getItem('todos');
          const parseToDos = JSON.parse(getToDos);
      
          this.setState({
            toDos : parseToDos || {}
          })
        }catch(err){
          console.error(err);
        }
      }
    
      _addTodo = ()=>{
        const {newToDo} = this.state;
        if(newToDo !== ""){
          this.setState(prevState=>{
            const ID = uuid.v1();
            const newToDoObject = {
              [ID] :{
                id : ID,
                isCompleted : false,
                text : newToDo,
                createdAt : Date.now()
              }
            };
            const newState = {
              ...prevState,
              newToDo : "",
              toDos : {
                ...prevState.toDos,
                ...newToDoObject
              }
            }
            this._saveTodos(newState.toDos);
            return {...newState};
          })
         
        }
      }
    
      _deleteTodo =(id)=>{
        this.setState(prevState => {
          const toDos = prevState.toDos;
          delete toDos[id]
          const newState = {
            ...prevState,
            ...toDos
          }
          this._saveTodos(newState.toDos);
          return {...newState}
        })
      }
      
      _unCompletedTodo = (id)=>{
        this.setState(prevState=>{
          const newState = {
              ...prevState,
              toDos : {
                ...prevState.toDos,
                [id] : {...prevState.toDos[id], isCompleted : false}  
              }  
          }
          this._saveTodos(newState.toDos);
          return {...newState};
        })    
      }
    
      _completedTodo = (id)=>{
        this.setState(prevState=>{
          const newState = {
            ...prevState,
            toDos : {
              ...prevState.toDos,
              [id] : {...prevState.toDos[id], isCompleted : true}  
            }
          }
          this._saveTodos(newState.toDos);
          return {...newState};
        })    
      }
    
      _updateTodo = (id, text) => {
          this.setState(prevState=>{
              const newState = {
                ...prevState,
                toDos : {
                  ...prevState.toDos,
                  [id] : {...prevState.toDos[id], text :text}
                }
              }
              this._saveTodos(newState.toDos);
              return {...newState};
          })
      }
    
     
    
      _saveTodos = (newToDos)=>{
        const KEY = 'todos'
        AsyncStorage.setItem(KEY,JSON.stringify(newToDos));
      }
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#feb915',
      alignItems: 'center'
    },
    title : {
      color : "white",
      fontSize : 30,
      marginTop : 70,
      fontWeight : "100",
      marginBottom : 30
    },
    card : {
      flex : 1,
      backgroundColor : 'white',
      width : width-25,
      borderTopLeftRadius : 10,
      borderTopRightRadius : 10,
      ...Platform.select({
        ios : {
          shadowColor : "rgb(50,50,50)",
          shadowOffset : {
            height : -1,
            width : 0
          },
          shadowOpacity : 0.5,
          shadowRadius : 5
        },
        android : {
          elevation : 5
        }
      })
    },
    input : {
      padding : 20,
      borderBottomColor : '#bbb',
      borderBottomWidth : 1,
      fontSize : 20
    },
    todo : {
      alignItems : 'center'
    }
  });