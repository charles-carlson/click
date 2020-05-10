import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from './library/home'
import LoginScreen from './library/login';
import SignupScreen from './library/signup';

const Stack = createStackNavigator();

export default class AuthExample extends Component {
  render(){
    return(
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name='Home' component={HomeScreen}/>
          <Stack.Screen name='Login' component={LoginScreen}/>
          <Stack.Screen name='Signup' component={SignupScreen}/>
        </Stack.Navigator>
      </NavigationContainer>
    )
  }
}