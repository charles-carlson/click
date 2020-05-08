import React from 'react';
import {View, Text, Button} from 'react-native';

export default () => (
    <View>
        <Text>Home page</Text>
        <Button 
            title="Clicker"
            onPress={() => 5} />
    </View>
)