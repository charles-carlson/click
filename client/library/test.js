import React, { Component } from 'react';
import { View, Text, Button, Alert } from 'react-native';


export default class MainScreen extends Component {
    constructor(props){
        super(props)
        this.state={
            uid: this.props.route.params.uid,
            score: 0
        }
        this.handlePress = this.handlePress.bind(this);
        this.initialize = this.initialize.bind(this)
    }
    
    initialize(e){
        var userInfo={
            uid:this.state.uid
        }
        fetch('http://192.168.0.12:3001/score/initialize',{
            method:'POST',
            body:JSON.stringify(userInfo),
            headers:{
                'Content-Type': 'application/json; charset=UTF-8'
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
    handlePress(){
        console.log(this.state.uid)
        var userInfo={
            uid:this.state.uid
        }
            fetch('http://192.168.0.12:3001/score/increase',{
                method:'PUT',
                body:JSON.stringify(userInfo),
                headers:{
                    'Content-Type': 'application/json'
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
              <View style={{padding: 25}}/>   
              <Button title="Press"
                      onPress={this.handlePress}
                      />
            </View>
        );
    }
}