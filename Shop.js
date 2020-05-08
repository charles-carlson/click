import React from 'react';
import {View, Text, Button} from 'react-native';

export default ({ history }) => (
    <View>
        <Text>Shop</Text>
        <Button 
            title="change page"
            onPress={() => 5} />
        <Button 
            title="return to home"
            onPress={() => history.push("/")} />
    </View>
)