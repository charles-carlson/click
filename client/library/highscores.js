import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';

export default class HighscoresScreen extends Component {
    constructor(props){
        super(props);
        this.state = {
            topScores: ''
        };
    }

    getScores(){
        fetch('http://192.168.0.12:3001/score/getHighscores',{
            method:'GET',
            headers:{
                'Content-Length': '0'
               }
        }).then(res=>{
            if(response.json(res)){
                this.setState({topScores: response.json(res)})
            }
            else{
                Alert.alert('error')
            }
        }).catch(err=>{
            Alert.alert('error')
            throw err
        })
    
}

    render() {
	return (
            <View style={{ flex: 1, alignItems: 'center',
                           justifyContent: 'center' }}>
              <Text>Top Scores:</Text>
              getScores();
              <Text>{this.state.topScores}</Text>
            </View>
        );
    }
}