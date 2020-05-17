import React, { Component } from 'react';
import { View, Text,Button,StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from './library/home'
import LoginScreen from './library/login';
import SignupScreen from './library/signup';
import MainScreen from './library/main';
import HighscoresScreen from './library/highscores';
import SettingsScreen from './library/Settings'
import './assets/fonts/PressStart2P-Regular.ttf'
const Stack = createStackNavigator();

export default class AuthExample extends Component {
  constructor(props){
    super(props)
    this.logout = this.logout.bind(this)
  }
  logout(e){
    fetch('http://192.168.0.12:3001/logout').then(res=>{
      Alert.alert('Logged out')
      }).catch(err=>{
      console.log(err)
      throw err;
    })
  }
  render(){
    return(
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name='Home' options={{title: 'Click Studio Presents',headerTitleAlign:'center'}} component={HomeScreen}/>
          <Stack.Screen name='Login' component={LoginScreen}/>
          <Stack.Screen name='Signup' component={SignupScreen}/>
          <Stack.Screen name='Main' component={MainScreen} 
              options={({navigation})=>({
              title: ' ',
              headerLeft: () =>( <Button title='Logout' onPress={()=>{this.logout();navigation.navigate('Home')}}/>
                ),
              headerRight: () => (<Button title='Settings' onPress={()=>{this.logout();navigation.navigate('Settings')}}/>)
              })
            }/>
          <Stack.Screen name='Highscores' 
          options={{
            headerTitleStyle:{
              fontSize: 36
            },
            headerStyle:{
            backgroundColor: 'red'
            },
            headerTitleAlign:'center'
          }}component={HighscoresScreen}/>
          <Stack.Screen name='Settings' component={SettingsScreen}/>
        </Stack.Navigator>
      </NavigationContainer>
    )
  }
}
