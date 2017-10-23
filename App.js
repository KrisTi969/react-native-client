/**
 * Keep App
 * @flow
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import { NoteList } from "./src/note/NoteList";

export default class App extends Component<{}> {
  render() {
    return (
      <NoteList/>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
  },
});
