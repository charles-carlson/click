//Install react router with 'npm install react-router-native'
import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import { NativeRouter, Switch, Route } from 'react-router-native';

import Home from "./Home";
import Clicker from "./Clicker";
import Shop from "./Shop";
import { render } from 'react-dom';

export default class ClickerApp extends Component {
  constructor(props){
    super(props);
    this.state = {
      var: ''
    };
  }

render() {
  return (
    <NativeRouter>
    <View style={styles.container}>
      <Switch>
        <Route
          exact path = "/"
          component = {Home} />
        <Route 
          exact path = "/Clicker"
          component = {Clicker} />
        <Route
          exact path = "/Shop"
          component = {Shop} />
      </Switch>
    </View>
    </NativeRouter>
  );
}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});