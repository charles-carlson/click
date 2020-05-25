import React, { Component } from 'react';
import { Button, View, Text, TextInput, Alert,StyleSheet,TouchableOpacity} from 'react-native';
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
            textpassword:'',
            confirmpassword:''
        }
        this.onSubmit = this.onSubmit.bind(this);
    }
    onSubmit(e){
        e.preventDefault()
        if(this.state.confirmpassword == this.state.textpassword){
            var randomSalt = bcrypt.genSaltSync(12)
            var hash = bcrypt.hashSync(this.state.textpassword,randomSalt)
            const loginInfo = {
                username: this.state.username,
                password: hash,
                salt: randomSalt
            }
            fetch('http://INSERT_IP_HERE:3001/join',{
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
        else{
            Alert.alert('Password typed is incorrect')
        }
       
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
                    secureTextEntry={true}   
                />
                <TextInput
                    placeholder=' confirm password'
                    onChangeText={(confirmpassword) => this.setState({confirmpassword})}
                    value={this.state.confirmpassword}  
                    secureTextEntry={true}  
                />
                <View style={{padding: 10}}/>     
                <TouchableOpacity title="Confirm"
                      onPress={this.onSubmit}
                      style={styles.button}>
                    <Text style={styles.box}>Confirm</Text>
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