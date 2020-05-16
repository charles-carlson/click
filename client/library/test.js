import React, { Component } from 'react';
import { StyleSheet, View, Text, Button, Alert } from 'react-native';
import { Audio } from 'expo-av';
import clickAudio from '../assets/sounds/click.mp3'

const soundObject = new Audio.Sound();
soundObject.loadAsync(clickAudio)
export default class MainScreen extends Component {
    constructor(props){
        super(props)
        this.state={
            score: 0
        }
        this.handlePress = this.handlePress.bind(this);
        this.logout = this.logout.bind(this)
    }
    componentDidMount(){
        fetch('http://192.168.0.12:3001/score/getScore').then(res=>{
            return res.json()
            .then(myjson=>{
                console.log(myjson.rows[0].points)
                this.setState({score:myjson.rows[0].points})
            })
        }).catch(err=>{
            console.log(err)
            throw err;
        })
    }
    logout(e){
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
                    try{
                    soundObject.replayAsync();
                    }
                    catch(err){
                        throw err
                    }
                    
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
            <View style={generalStyle.container}>
              <Text style={titleStyle}>Push the Button</Text>
              <Text style={scoreStyle}>{this.state.score}</Text>
              <Button 
                title="View Highscores"
                onPress={() =>this.props.navigation.navigate('Highscores')}/>
              <View style={{padding: 40}}/>   
              <Button title="Press"
                      onPress={this.handlePress}
                      style={{margin:'20px'}}
                      />
            </View>
        );
    }
}

const generalStyle = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  })
  
const titleStyle = StyleSheet.create({
    container: {
        color: 'blue',
        //textShadowOffset: {width: 50, height: 50},
        fontSize: 36,
        fontWeight: 'bold',
        textShadowColor: 'black',
        textShadowRadius: 0,
        fontFamily: 'Optima', 
        letterSpacing: 0
      },
    })

const scoreStyle = StyleSheet.create({
    container: {
      color: 'purple',
      fontSize: 100,
      fontWeight: 'bold',
      fontFamily: 'Cochin'
    },
  })