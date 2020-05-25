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
        fetch('INSERT_IP_HERE:3001/score/getHighscores',{
            method:'GET',
            headers:{
                'Content-Length': '0'
               }
        }).then(res=>{
            return res.json()
        }).then(myjson=>{
                this.setState({
                    topScores: myjson.rows.map(score=>({
                        uid:score.uid,
                        username:score.username,
                        points: score.points
                    })
                )})
        }).catch(err=>{
            Alert.alert('error')
            throw err
        })
    }
    

    render() {
        
	return (
            <View style={{ flex: 1, alignItems: 'center',
                           justifyContent: 'center',borderColor:'#405365',borderWidth:50 }}>
              {this.state.topScores.map((list,key)=>(
                <Text key={key}style={styles.textStyle}>
                    <Text style={{fontWeight:'bold'}}>{key+1}{')'}</Text>
                    <Text style={{fontWeight:'bold'}}>{'  '}{list.username}</Text>
                    <Text style={{fontWeight:'bold'}}>{'     '}{list.points}</Text> 
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
        fontSize: 24,
        fontWeight: '400',
        textAlign: 'justify',
        lineHeight: 60,
        alignSelf: 'stretch',
        paddingLeft:50,
        backgroundColor:'#ED635E',
        flex:1
        
    },
})