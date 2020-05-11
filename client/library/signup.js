import React, { Component } from 'react';
import { Button, View, Text, TextInput, Alert} from 'react-native';
var bcrypt = require('react-native-bcrypt')
import isaac from "isaac";
bcrypt.setRandomFallback((len) => {
	const buf = new Uint8Array(len);

	return buf.map(() => Math.floor(isaac.random() * 256));
});
export default class LoginScreen extends Component{
    constructor(props){
        super(props)
        this.state = {
            username: '',
            password:'',
            textpassword:''
        }
        this.onSubmit = this.onSubmit.bind(this);
    }
    onSubmit(e){
        e.preventDefault()
        var randomSalt = bcrypt.genSaltSync(12)
        var hash = bcrypt.hashSync(this.state.textpassword,randomSalt)
        const loginInfo = {
            username: this.state.username,
            password: hash,
            salt: randomSalt
        }
        fetch('http://192.168.0.12:3002/join',{
            method:'POST',
            body: JSON.stringify(loginInfo),
            headers:{
                'Content-Type': 'application/json'
            }
        }).then(res=>{
            return res.json()
        }).then(json=>{
            console.log(json[0].message)
            if(json[0].message == 'username already exists'){
                Alert.alert('choose a new username')
            }
            else if(json[0].message == 'CREATED'){
                Alert.alert('User Created')
                this.props.navigation.navigate('Login')
            }
        })
        .catch(err=>{
            console.log("login info incorrect");
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
                    onChangeText={(textpassword) => this.setState({textpassword})}
                    value={this.state.textpassword}   
                />  
                <Button title='confirm' onPress={this.onSubmit}/>
            </View>
        )
    }
}