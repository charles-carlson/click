import React from 'react';
import {View, Text, TextInput, Button} from 'react-native';

export default ({ history }) => (
    <View>
        <Text>Push the Button, Bro</Text>
        
        <Button 
            title="go to clicker page"
            onPress={() => history.push("/Clicker")} />
        <Button 
            title="open shop"
            onPress={() => history.push("/Shop")} />
    </View>
)

/*
Having trouble getting this to work

<TextInput
            placeholder="Username"
            onChangeText={(text) => ClickerApp.setState({userEntry})}
            value={ClickerApp.state.userEntry}
            />*/