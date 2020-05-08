//Install react router with 'npm install react-router-native'
import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { NativeRouter, Switch, Route } from 'react-router-native';

import Home from "./Home";


export default function App() {
  return (
    <NativeRouter>
    <View style={styles.container}>
      <Switch>
        <Route
          exact path = "/"
          component = {Home} />
        <Route 
          path = "/Clicker"
          component = {clicker} />
        <Route
          path = "/Shop"
          component = {Shop} />
      </Switch>
    </View>
    </NativeRouter>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
