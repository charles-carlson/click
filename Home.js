import React from 'react';
import {View, Text, Button} from 'react-native';

export default ({ history }) => (
    <View>
        <Text>Home page</Text>
        <Button 
            title="go to clicker page"
            onPress={() => history.push("/Clicker")} />
        <Button 
            title="open shop"
            onPress={() => history.push("/Shop")} />
    </View>
)