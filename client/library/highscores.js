import React, { Component } from 'react';
import { View, Text, Button,Alert } from 'react-native';
export default class HighscoresScreen extends Component {
    constructor(props){
        super(props);
        this.state = {
            topScores: []
        };
        this.handlePress = this.handlePress.bind(this)
    }

    handlePress(e){
        fetch('http://192.168.0.12:3001/score/getHighscores',{
            method:'GET',
            headers:{
                'Content-Length': '0'
               }
        }).then(res=>{
            return res.json()
        }).then(myjson=>{
                console.log(myjson.rows)
                this.setState({
                    topScores: myjson.rows.map(score=>({
                        uid:score.uid,
                        username:score.username,
                        points: score.points
                    })
                )})
                console.log(this.state.topScores)
        }).catch(err=>{
            Alert.alert('error')
            throw err
        })
    
}

    render() {
        
	return (
            <View style={{ flex: 1, alignItems: 'center',
                           justifyContent: 'center' }}>
            <Text>Top 10 Users</Text>
            <Button title='confirm' onPress={this.handlePress}/>
              {this.state.topScores.map((list,key)=>(
                <Text key={key} >{list.uid} {list.username} {list.points}</Text>)
              )}
              
            </View>
        );
    }
}