import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';

export default class HomeScreen extends Component {
    render() {
	return (
            <View style={{ flex: 1, alignItems: 'center',
                           justifyContent: 'center' }}>
              <Text>Home Screen</Text>

              <View style={{padding: 25}}/>   
              <Button title="Login"
                      onPress={() => this.props.navigation.navigate('Login')}/>
              <Button title="Signup"
                      onPress={() => this.props.navigation.navigate('Signup')}/>
              <Button title="Go to button page (temp link)"
                      onPress={() => this.props.navigation.navigate('Button')}/>
            </View>
        );
    }
}
