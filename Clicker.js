import React, { Component } from 'react';
import {View, Text, Button} from 'react-native';

/*
not sure how to integrate this along with {history}
below, maybe only refer to this.state from App.js

export default class ClickerPage extends Component {
    constructor(props){
        super(props);
        this.state = {
            someVar: ''
        }
    }
*/

export default ({ history }) => (
    <View>
        <Text>Clicker page</Text>
        <Button 
            title="Push me"
            onPress={() => 5} />
        <Button 
            title="return to home"
            onPress={() => history.push("/")} />
    </View>
)