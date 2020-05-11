import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';

export default class ButtonScreen extends Component {
    render() {
	return (
            <View style={{ flex: 1, alignItems: 'center',
                           justifyContent: 'center' }}>
              <Text>Button page</Text>

              <View style={{padding: 25}}/>   
              <Button title="Push me, bro"
                      onPress={() => 5}/>
              <Button title="Return to home"
                      onPress={() => this.props.navigation.navigate('Home')}/>
              <Button title="Leaderboard"
                      onPress={() => this.props.navigation.navigate('Highscores')}/>
            </View>
        );
    }
}
