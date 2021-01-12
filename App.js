import { StatusBar } from 'expo-status-bar';
import React, {Component} from 'react';
import { StyleSheet, Text, View, TextInput, Dimensions, Platform, ScrollView, AsyncStorage } from 'react-native';
import TodoView from './TodoView';
import Webhome from './Webhome';
import AppLoading from "expo-app-loading";
import uuid from "react-native-uuid";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";


const {width} = Dimensions.get("window");

const WebHomeRoute = ()=>{
   return <Webhome />
}

const ToDoRoute = ()=>{
   return <TodoView/>
}

const renderTabBar = props=>{
  return <TabBar 
          {...props} 
          indicatorStyle={{backgroundColor : "transperant"}}
          style ={{backgroundColor:"white", borderTopColor : "#dadada", borderBottomColor : "#dadada"}} 
          activeColor={"#feb915"}
          inactiveColor={"#dadada"} 
          pressColor={"#dadada"} 
          pressOpacity={0.2} 
        />
}

const initialLayout = {width : Dimensions.get('window').width};
export default class App extends Component {
   state = {
     isLoaded : false,
     index : 0,
     routes : [
       {key : 'webhome', title : 'Web'},
       {key : 'todos', title : 'ToDo'}
     ]
   }

   
  
   componentDidMount = ()=>{
     this._loadedToDo()
   }

  render(){
    const {isLoaded, routes, index} = this.state;

    const renderScene = SceneMap({
        webhome : WebHomeRoute,
        todos : ToDoRoute
    });
    if(!isLoaded){
      return <AppLoading/> 
    }else{
      return (
       <TabView
          navigationState = {{index, routes}}
          renderScene = {renderScene}
          onIndexChange= {this._changeIndex}
          initialLayout={initialLayout}
          tabBarPosition ={'bottom'}
          renderTabBar = {renderTabBar}
          swipeEnabled = {false}
       />
     );  
    }
  }

  _loadedToDo = async ()=>{
    this.setState({
      isLoaded : true,
    })
  }

  _changeIndex = (index)=>{
    this.setState({
      index : index
    });
  }

}

