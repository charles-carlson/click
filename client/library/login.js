import React, { Component } from 'react';
import { Button, View, Text, TextInput,Alert,StyleSheet,TouchableOpacity} from 'react-native';


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
       fetch('http://192.168.0.12:3001/login',{
           method:'POST',
           body: JSON.stringify(loginInfo),
           headers:{
            'Content-Type': 'application/json'
           }
       }).then(res=>{
           return res.json()
       }).then(json=>{
        console.log(json.uid)
        console.log(json.message)
        if(json.message == 'Wrong password or username'){
            Alert.alert('Wrong password or username')
        }
        else if(json.message == 'Login'){
            Alert.alert('You are logged in!')
            this.props.navigation.navigate('Main')
        }
    }).catch(err=>{
        throw err;
       })
    }
    render(){
        return (
            <View style={{paddingTop: 50, paddingLeft: 0}}>
                <TextInput
                    placeholder='username'
                    onChangeText={(username) => this.setState({username})}
                    value={this.state.username}  
                    style={styles.textInputContainer}        
                />

                <TextInput
                    placeholder='password'
                    onChangeText={(password) => this.setState({password})}
                    value={this.state.password} 
                    secureTextEntry={true} 
                    style={styles.textInputContainer}      
                />
                <View style={{padding: 10}}/> 
                <TouchableOpacity title="Confirm"
                      onPress={this.onSubmit}
                      style={styles.button}>
                    <Text style={styles.box}>Login</Text>
                      </TouchableOpacity>
                <View style={{padding: 10}}/>      
              <TouchableOpacity title="Signup"
                      onPress={() => this.props.navigation.navigate('Signup')}
                      style={styles.button}>
            <Text style={styles.box}>Signup</Text>
            </TouchableOpacity>  
            </View>
        )
    }
}
const styles = StyleSheet.create({
    button:{
        height:50,
        width:100,
        borderRadius:24,
        justifyContent: 'center',
        alignItems: 'center'
    },
    box:{
        height:50,
        width:100,
        fontSize:24,
        borderRadius:24,
        backgroundColor:'#405365',
        color:'white',
        justifyContent: 'center',
        textAlignVertical: 'center',
        textAlign: 'center' 
    },
    textInputContainer:{
    borderBottomColor:'#405365',
    borderBottomWidth:2,
    margin:15,
    alignSelf: "stretch"
    }
})