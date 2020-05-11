import React, { Component } from 'react';
import { View, Text, Button, Alert } from 'react-native';


export default class MainScreen extends Component {
    constructor(props){
        super(props)
        this.state={
            score: 0
        }
        this.handlePress = this.handlePress.bind(this);
        this.logout = this.logout.bind(this)
    }

    logout(){
        fetch('http://192.168.0.12:3001/logout').then(res=>{
            Alert.alert('Logged out')
            this.props.navigation.navigate('Home')
        }).catch(err=>{
            console.log(err)
            throw err;
        })
    }
    
    handlePress(){
            fetch('http://192.168.0.12:3001/score/increase',{
                method:'PUT',
                headers:{
                    'Content-Length': '0'
                   }
            }).then(res=>{
                if(res.status == 200){
                    this.setState({score:this.state.score+1})
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
              <Text>Push the Button</Text>
              <Text>{this.state.score}</Text>
              <View style={{padding: 25}}/>   
              <Button title="Press"
                      onPress={this.handlePress}
                      />
              <Button title="View Highscores"
                      onPress={this.props.navigation.navigate('Highscores')}/>
            </View>
        );
    }
}