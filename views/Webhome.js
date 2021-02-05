import React, {Component} from 'react';
import { NavigationContainer} from '@react-navigation/native';
import { createStackNavigator, CardStyleInterpolators  } from '@react-navigation/stack';
import WebMain from './webviews/WebMain';
import WebGuide from './webviews/WebGuide';
import WebReport from './webviews/WebReport';
import WebForeign from './webviews/WebForeign';


export default class Webhome extends Component {
    

    render(){

        const Stack = createStackNavigator();
  
        return(
           <NavigationContainer>
               <Stack.Navigator 
                   initialRouteName = 'Main' 
                   screenOptions={{
                        headerShown : false,
                        cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS
                   }}
                   mode="modal"
            >
                   <Stack.Screen name = "Main" component = {WebMain} />
                   <Stack.Screen name = "Guide" component = {WebGuide} />
                   <Stack.Screen name = "Report" component = {WebReport} />
                   <Stack.Screen name = "Foreign" component = {WebForeign} />
               </Stack.Navigator>
           </NavigationContainer>
            
        );
    }
}


