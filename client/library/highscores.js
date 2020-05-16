import React, { Component } from 'react';
import { View, Text, Button,Alert, StyleSheet } from 'react-native';
export default class HighscoresScreen extends Component {
    constructor(props){
        super(props);
        this.state = {
            topScores: []
        };
        
    }
    componentDidMount(){
        fetch('http://192.168.0.12:3001/score/getHighscores',{
            method:'GET',
            headers:{
                'Content-Length': '0'
               }
        }).then(res=>{
            return res.json()
        }).then(myjson=>{
                console.log(myjson.rows)
                this.setState({
                    topScores: myjson.rows.map(score=>({
                        uid:score.uid,
                        username:score.username,
                        points: score.points
                    })
                )})
                console.log(this.state.topScores)
        }).catch(err=>{
            Alert.alert('error')
            throw err
        })
    }
    

    render() {
        
	return (
            <View style={{ flex: 1, alignItems: 'center',
                           justifyContent: 'center' }}>
              {this.state.topScores.map((list,key)=>(
                <Text key={key}style={styles.textStyle}>
    <Text>{'           '}{key}{')     '}</Text>
                    <Text >{list.username}</Text>
                    <Text>{list.points > 10 ? '    ' : '     '}{list.points}</Text> 
                    </Text>)
              )}
              
            </View>
        );
    }
}
const styles = StyleSheet.create({
    containerStyle:{

    },
    textStyle:{
        fontSize: 36,
        fontWeight: '400',
        textAlign: 'justify',
        lineHeight: 60,
        alignSelf: 'stretch'
    }
})