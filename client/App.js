import React, { Component } from 'react';
import { View, Text,Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from './library/home'
import LoginScreen from './library/login';
import SignupScreen from './library/signup';
import MainScreen from './library/test';
import HighscoresScreen from './library/highscores';

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
          <Stack.Screen name='Home' component={HomeScreen}/>
          <Stack.Screen name='Login' component={LoginScreen}/>
          <Stack.Screen name='Signup' component={SignupScreen}/>
          <Stack.Screen name='Main' component={MainScreen} 
              options={({navigation})=>({
              title: 'Push the Button',
              headerLeft: () =>( <Button title='Logout' onPress={()=>{this.logout();navigation.navigate('Home')}}/>
                ),
              })
            }/>
          <Stack.Screen name='Highscores' component={HighscoresScreen}/>
        </Stack.Navigator>
      </NavigationContainer>
    )
  }
}