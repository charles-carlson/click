import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';

export default class HighscoresScreen extends Component {
    constructor(props){
        super(props)
        this.state = {
            users : []
        }
    }

    render() {
	return (
            <View style={{ flex: 1, alignItems: 'center',
                           justifyContent: 'center' }}>
              <Text>Top Scores:</Text>
            </View>
        );
    }
}
