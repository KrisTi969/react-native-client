import React, { Component } from 'react';
import { Text, View, ActivityIndicator } from 'react-native';
import styles from '../core/styles';
import { httpApiUrl, wsApiUrl } from '../core/api';
import { getLogger, issueToText } from '../core/utils';
import { NoteView } from "./NoteView";

const log = getLogger('NoteList');

export class NoteList extends Component {
  ws = null;

  constructor(props) {
    super(props);
    log('constructor');
    this.state = { isLoading: false, issue: null, notes: null };
  }

  componentDidMount() {
    log('componentDidMount');
    this.setState({ isLoading: true });
    ws = new WebSocket(wsApiUrl);
    ws.onopen = () => log('onopen');
    ws.onmessage = e => log(e.data);
    ws.onerror = e => log(e.message);
    ws.onclose = e => log(e.code)
    fetch(`${httpApiUrl}/note`)
      .then(response => response.json())
      .then(responseJson => this.setState({ notes: responseJson.notes, isLoading: false }))
      .catch(error => this.setState({ issue: { error: error.message, isLoading: false } }));
  }

  componentWillUnmount() {
    log('componentWillUnmount');
  }

  render() {
    log('render');
    const { isLoading, issue, notes } = this.state;
    const issueMessage = issueToText(issue);
    return (
      <View style={styles.content}>
        <ActivityIndicator animating={isLoading} style={styles.activityIndicator} size="large"/>
        {issueMessage && <Text>{issueMessage}</Text>}
        {notes && notes.map(note => <NoteView key={note.id} note={note}/>)}
      </View>
    );
  }
}
