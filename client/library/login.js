import React, { Component } from 'react';
import { Button, View, Text, TextInput,Alert} from 'react-native';

export default class LoginScreen extends Component{
    constructor(props){
        super(props)
        this.state = {
            username: '',
            password:''
        }
        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit(e){
       const loginInfo = {
           username: this.state.username,
           password: this.state.password
       }
       fetch('http://192.168.0.12:3002/login',{
           method:'POST',
           body: JSON.stringify(loginInfo),
           headers:{
            'Content-Type': 'application/json'
           }
       }).then(res=>{
           return res.json()
       }).then(json=>{
        console.log(json[0].message)
        if(json[0].message == 'Wrong password or username'){
            Alert.alert('Wrong password or username')
        }
        else if(json[0].message == 'Login'){
            Alert.alert('You are logged in!')
        }
    }).catch(err=>{
        throw err;
       })
    }
    render(){
        return (
            <View style={{paddingTop: 50, paddingLeft: 50 }}>
                <TextInput
                    placeholder='username'
                    onChangeText={(username) => this.setState({username})}
                    value={this.state.username}          
                />

                <TextInput
                    placeholder='password'
                    onChangeText={(password) => this.setState({password})}
                    value={this.state.password}   
                />  
                <Button title='confirm' onPress={this.onSubmit}/>
                <Button title='signup' onPress={()=>this.props.navigation.navigate('Signup')}/>
            </View>
        )
    }
}
