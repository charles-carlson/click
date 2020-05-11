import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
import AuthExample from '../App';

export default class ButtonScreen extends Component {
    constructor(props){
        super(props);
        this.state = {
            score: 0
        };
    }

    incScore = () => {
        this.setState({score: this.state.score + 1})
    }

    render() {
	return (
            <View style={{ flex: 1, alignItems: 'center',
                           justifyContent: 'center' }}>
              <Text>Button page</Text>
              <Text>{this.state.score}</Text>
              
              <View style={{padding: 25}}/>   
              <Button title="Push me, bro"
                      onPress={() => this.incScore()}/>
              <Button title="Return to home"
                      onPress={() => this.props.navigation.navigate('Home')}/>
              <Button title="Leaderboard"
                      onPress={() => this.props.navigation.navigate('Highscores')}/>
            </View>
        );
    }
}
