import React from 'react';
import {View, Text, Button} from 'react-native';

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