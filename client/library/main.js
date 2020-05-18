import React, { Component } from 'react';
import { View, Text, Button, Alert,StyleSheet,Image, TouchableOpacityBase} from 'react-native';
import { Audio } from 'expo-av';
import clickAudio from '../assets/sounds/click.mp3'
import { TouchableOpacity } from 'react-native-gesture-handler';
import emoji from '../assets/laughing-emoji2.jpeg';
const soundObject = new Audio.Sound();
soundObject.loadAsync(clickAudio)
export default class MainScreen extends Component {
    constructor(props){
        super(props)
        this.state={
            score: 0,
            coins: 0
        }
        this.handlePress = this.handlePress.bind(this);
        
    }
    onSetSidebarOpen(open) {
        this.setState({ sidebarOpen: open });
      }
    async componentDidMount(){
        fetch('http://192.168.0.12:3001/score/getScore').then(res=>{
            return res.json()
            .then(myjson=>{
                console.log('user score is' + myjson.rows[0].points)
                this.setState({score:myjson.rows[0].points})
            })
        }).catch(err=>{
            console.log(err)
            throw err;
        })
        fetch('http://192.168.0.12:3001/money/getMoney').then(res=>{
            return res.json()
        }).then(myjson=>{
            console.log('user wallet is'+ myjson.rows[0].coins)
            this.setState({coins:myjson.rows[0].coins})
        }).catch(err=>{
            console.log(err)
            throw err
        })
    }
    handlePress(){
            fetch('http://192.168.0.12:3001/score/increase',{
                method:'PUT',
                headers:{
                    'Content-Length': '0'
                   }
            }).then(res=>{ 
                    this.setState({score:this.state.score+1}) 
                    soundObject.replayAsync();
                    if(this.state.score % 15 == 0){
                        
                        fetch('http://192.168.0.12:3001/money/deposit',{
                            method:'PUT',
                            headers:{
                                'Content-Length': '0'
                               }
                        }).then(res=>{
                            
                            this.setState({coins:this.state.coins+1})
                        }).catch(err=>{
                            console.log(err)
                            throw err
                        })
                    }    
            }).catch(err=>{
                Alert.alert('error')
                throw err
            })
        
    }
    render() {
	return (

            <View style={generalStyle.container}>
                <View style={styles.coin}>
                    <Text style={styles.coinText}>{this.state.coins}</Text>
                </View>
              <Text style={scoreStyle.container}>{this.state.score}</Text>   
                <TouchableOpacity title="Press"
                      onPress={this.handlePress}
                      style={styles.imageContainer}
                      >
                    <Image style={styles.image} source={emoji}/>
                </TouchableOpacity>
                <TouchableOpacity
                title="View Highscores"
                style={styles.box}
                onPress={() =>this.props.navigation.navigate('Highscores')}>
                <Text style={styles.highScore}>Highscores</Text>    
                </TouchableOpacity>
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
        alignItems:'center'
    },
    coin:{
        position:'relative',
        left: 140,
        height:50,
        width: 50,
        borderRadius:25,
        backgroundColor:'#E1B92F' ,
        alignItems:'center',
        justifyContent: 'center'
    },
    coinText:{
        textAlignVertical: 'center',
        textAlign: 'center' ,
        fontSize:36,
        fontWeight:'bold'
    },
    box:{
        height:50,
        width:120,
        borderRadius:24,
        justifyContent: 'center',
        alignItems: 'center'
    },
    highScore:{
        height:50,
        width:120,
        fontSize:24,
        borderRadius:24,
        backgroundColor:'#405365',
        color:'white',
        justifyContent: 'center',
        textAlignVertical: 'center',
        textAlign: 'center'  
    }
})

const generalStyle = StyleSheet.create({
    container: {
      flex:1,
      alignItems: 'center',
      justifyContent: 'space-around',
      borderColor:'#405365',
      borderWidth:10
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
        letterSpacing: 0,
      },
    })

const scoreStyle = StyleSheet.create({
    container: {
      color: 'purple',
      fontSize: 100,
      fontWeight: 'bold',
      position:'relative',
      borderColor:'#405365',
      borderWidth:10,
      alignItems:'center',
      justifyContent: 'center',
      textAlign: 'center' ,
    },
  })
