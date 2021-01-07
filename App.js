import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TextInput, Dimensions, Platform, ScrollView } from 'react-native';
import Todo from './Todo';

const {width} = Dimensions.get("window");
export default class App extends React.Component {
   state = {
     newToDo : ""
   }
  render(){

    const {newToDo} = this.state;
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
          >
          </TextInput>
          <ScrollView contentContainerStyle = {styles.todo}>
              <Todo text={"Hello I'm Todo"} />
          </ScrollView>
        </View>
      </View>
    );  
  }


  _controlNewToDo = text =>{
    this.setState({
      newToDo : text
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
