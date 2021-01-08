import { StatusBar } from 'expo-status-bar';
import React, {Component} from 'react';
import { StyleSheet, Text, View, TextInput, Dimensions, Platform, ScrollView } from 'react-native';
import Todo from './Todo';
import AppLoading from "expo-app-loading";
import uuid from "react-native-uuid";


const {width} = Dimensions.get("window");
export default class App extends Component {
   state = {
     newToDo : "",
     isLoaded : false,
     toDos : {}
   }
  
   componentDidMount = ()=>{
     this._loadedToDo()
   }

  render(){
    const {newToDo, isLoaded, toDos} = this.state;

    if(!isLoaded){
      return <AppLoading/> 
    }else{
      return (
        <View style={styles.container}>
           <StatusBar barStyle="light-content" />
           <Text style={styles.title}>YooGGu ToDo</Text>
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
             <ScrollView contentContainerStyle = {styles.todo}>
               {Object.values(toDos).map(todo=>{
                  return <Todo key={todo.id} {...todo} deleteToDo={this._deleteTodo} completed={this._toggleCompleted}/>
               })}
             </ScrollView>
           </View>
         </View>
     );  
    }
  }


  _controlNewToDo = text =>{
    this.setState({
      newToDo : text
    })
  }

  _loadedToDo = ()=>{
    this.setState({
      isLoaded : true
    })
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

      return {...newState}
    })
  }
  _toggleCompleted = (id)=>{
    this.setState(prevState =>{ 
        const toDos = prevState.toDos;
        
        if(toDos[id].isCompleted){
          toDos[id].isCompleted = false
        }else{
          toDos[id].isCompleted = true
        }

        const newState = {
          ...prevState,
          ...toDos
        }
        
        return {...newState};
    })
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f23657',
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
