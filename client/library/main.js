import React, { Component } from 'react';
import { View, Text, Button, Alert,StyleSheet,Image} from 'react-native';
import { Audio } from 'expo-av';
import clickAudio from '../assets/sounds/click.mp3'
import { TouchableOpacity } from 'react-native-gesture-handler';
import emoji from '../assets/laughing-emoji2.jpeg';
import Sidebar from "react-sidebar";
const soundObject = new Audio.Sound();
soundObject.loadAsync(clickAudio)
export default class MainScreen extends Component {
    constructor(props){
        super(props)
        this.state={
            score: 0,
            sidebarOpen: true
        }
        this.handlePress = this.handlePress.bind(this);
        this.logout = this.logout.bind(this)
        this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
    }
    onSetSidebarOpen(open) {
        this.setState({ sidebarOpen: open });
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
 
            <View style={{ flex: 1, alignItems: 'center',
                           justifyContent: 'center' }}>

              <Text>Push the Button</Text>
              <Text>{this.state.score}</Text>
              <View style={{padding: 25}}/>   
              <TouchableOpacity title="Press"
                      onPress={this.handlePress}
                      style={styles.imageContainer}
                      >
                    <Image style={styles.image} source={emoji}/>
                      </TouchableOpacity>
              <Button title="View Highscores"
                onPress={() =>this.props.navigation.navigate('Highscores')}/>
            </View>
        );
    }
}

var styles = StyleSheet.create({
    imageContainer:{
        height:80,
        width: 80,
        borderRadius: 80,
        alignItems:'center',
    },
    image:{
        height:80,
        width: 80,
        borderRadius: 80,
        alignItems:'center',
    }
})
/*             <Sidebar
                sidebar={<b>Settings</b>}
                open={this.state.sidebarOpen}
                onSetOpen={this.onSetSidebarOpen}
                styles={{ sidebar: { background: "white" } }}
              >
                  <Button title="open" onPress={() => this.onSetSidebarOpen(true)}>Open</Button>
              </Sidebar> */