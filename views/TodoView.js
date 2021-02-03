import React, {Component} from 'react';
import { StyleSheet, Text, View, TextInput, Dimensions, Platform, ScrollView, AsyncStorage, StatusBar } from 'react-native';
import Todo from './components/Todo';
import uuid from "react-native-uuid";



const {width} = Dimensions.get("window");

export default class TodoView extends Component {
    state = {
        newToDo : ""
      }

    render(){
        
        const {toDos} = this.props || {};
        
        const {newToDo} = this.state;
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
    
    
      _addTodo = ()=>{
        const {onAddTodo} = this.props;
        
        const {newToDo} = this.state;
        if(newToDo !== ""){
          this.setState(prevState=>{
            const newState = {
              newToDo : ""
            }
            return {...newState};
          });
          const ID = uuid.v1();
          const newToDoObject = {
            [ID] :{
              id : ID,
              isCompleted : false,
              text : newToDo,
              createdAt : Date.now()
            }
          };
        
          onAddTodo(newToDoObject);
        }
      }
    
      _deleteTodo =(id)=>{
        const {onDeleteTodo} = this.props;
        onDeleteTodo([id]);

      }
      
      _unCompletedTodo = (id)=>{
        const {onUnCompletedTodo} = this.props;
        onUnCompletedTodo(id);
      }
    
      _completedTodo = (id)=>{  
        const {onCompletedTodo} = this.props;
        onCompletedTodo(id);
      }
    
      _updateTodo = (id, text) => {
        const {onUpdateTodo} = this.props;
        onUpdateTodo(id,text);

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