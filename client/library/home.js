import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image,StyleSheet } from 'react-native';
import logo from "../assets/logo2.png"
export default class HomeScreen extends Component {
    render() {
	return (
            <View style={{alignItems: 'center',
                           justifyContent: 'center' }}>
            <Image source={logo}/>
              <View style={{padding: 100}}/>   
              <TouchableOpacity title="Login"
                      onPress={() => this.props.navigation.navigate('Login')}
                      style={styles.image}>
                    <Text style={styles.box}>Login</Text>
                      </TouchableOpacity>
                <View style={{padding: 10}}/>      
              <TouchableOpacity title="Signup"
                      onPress={() => this.props.navigation.navigate('Signup')}
                      style={styles.image}>
            <Text style={styles.box}>Signup</Text>
            </TouchableOpacity>
              

            </View>
        );
    }
}
const styles = StyleSheet.create({
    button:{
        height:50,
        width:100,
        borderRadius:24,
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
    }
})