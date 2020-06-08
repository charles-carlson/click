import React, { Component } from 'react';
import { Button, View, Text, TextInput,Alert,StyleSheet,TouchableOpacity} from 'react-native';


export default class LoginScreen extends Component{
    constructor(props){
        super(props)
        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit(e){
       fetch('http://IP-INSERT-HERE:3001/destroy',{
           method:'DELETE',
           headers:{
            'Content-Length': '0'
           }
       }).then(res=>{
        Alert.alert('Account Destroyed')
        this.props.navigation.navigate('Home')
       })
       .catch(err=>{
        console.log(err)
        throw err;
       })
    }
    render(){
        return (
            <View style={{paddingTop: 50, paddingLeft: 125}}>
                <View style={{padding: 10}}/> 
                <TouchableOpacity title="Delete Account"
                      onPress={this.onSubmit}
                      style={styles.button}>
                    <Text style={styles.box}>Delete Account</Text>
                </TouchableOpacity>     
            </View>
        )
    }
}
const styles = StyleSheet.create({
    button:{
        height:75,
        width:125,
        borderRadius:24,
        justifyContent: 'center',
        alignItems: 'center'
    },
    box:{
        height:75,
        width:125,
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
