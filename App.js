import React, {Component} from 'react';
import { Dimensions, AsyncStorage} from 'react-native';
import TodoView from './container_views/TodoViewContainer';
import Webhome from './views/Webhome';
import AppLoading from "expo-app-loading";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './modules';
import {persistStore, persistReducer} from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react'


const persistConfig = {
    key : 'root',
    storage : AsyncStorage
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(persistedReducer);

let persistor = persistStore(store);

const WebHomeRoute = ()=>{
   return <Webhome />
}

const ToDoRoute = ()=>{
   return <TodoView/>
}

const renderTabBar = props=>{
  return(
    
       <TabBar 
          {...props} 
          indicatorStyle={{backgroundColor : "transperant"}}
          style ={{backgroundColor:"white", borderTopColor : "#dadada", borderBottomColor : "#dadada"}} 
          activeColor={"#feb915"}
          inactiveColor={"#dadada"} 
          pressColor={"#dadada"} 
          pressOpacity={0.2} 
        />

      
        );
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
      <Provider store = {store}>
        <PersistGate loading={null} persistor={persistor}>
          <TabView
              navigationState = {{index, routes}}
              renderScene = {renderScene}
              onIndexChange= {this._changeIndex}
              initialLayout={initialLayout}
              tabBarPosition ={'bottom'}
              renderTabBar = {renderTabBar}
              swipeEnabled = {false}
          />
        </PersistGate>
      </Provider>
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

