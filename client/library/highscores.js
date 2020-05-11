import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';

export default class HighscoresScreen extends Component {
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
            </View>
        );
    }
}
