import React, {Component} from 'react';
import {Text, View, ActivityIndicator} from 'react-native';
import styles from '../core/Styles';
import {httpApiUrl, wsApiUrl} from '../core/Api';
import {getLogger, issueToText} from '../core/Utils';
import {NoteView} from "./NoteView";
import {loadNotes, connectWs, disconnectWs} from "./Service";

const log = getLogger('NoteList');

export class NoteList extends Component {
    ws = null;

    constructor(props) {
        super(props);
        log('constructor');
        this.state = {isLoading: false, issue: null, notes: null};
    }

    render() {
        log('render');
        const {isLoading, issue, notes} = this.state;
        const issueMessage = issueToText(issue);
        return (
            <View style={{alignItems: 'center'}}>
                <ActivityIndicator animating={isLoading} style={styles.activityIndicator} size="large"/>
                {issueMessage && <Text>{issueMessage}</Text>}
                {notes && notes.map(note => <NoteView key={note.id} note={note}/>)}
            </View>
        );
    }

    componentDidMount() {
        log('componentDidMount');
        const {store} = this.props;
        store.dispatch(loadNotes());
        this.unsubscribe = store.subscribe(() => {
            const {isLoading, notes, issue} = store.getState().note;
            this.setState({isLoading, notes, issue});
        });
        this.ws = connectWs(store);
    }

    componentWillUnmount() {
        log('componentWillUnmount');
        this.unsubscribe();
        disconnectWs(this.ws);
    }

    // componentDidMount() {
    //   log('componentDidMount');
    //   this.setState({ isLoading: true });
    //   fetch(`${httpApiUrl}/note`)
    //     .then(response => response.json())
    //     .then(responseJson => this.setState({ notes: responseJson.notes, isLoading: false }))
    //     .catch(error => this.setState({ issue: { error: error.message }, isLoading: false }));
    //   this.connectWs();
    // }
    //
    // componentWillUnmount() {
    //   log('componentWillUnmount');
    // }
    //
    // onNewNote(e) {
    //   const note = JSON.parse(e.data);
    //   let { notes } = this.state;
    //   this.setState({
    //     notes: notes ? notes.concat([note]) : [note]
    // });
    // }
    //
    // connectWs() {
    //   ws = new WebSocket(wsApiUrl);
    //   ws.onopen = () => log('onopen');
    //   ws.onmessage = this.onNewNote.bind(this);
    //   ws.onerror = e => log(e.message);
    //   ws.onclose = e => log(e.code)
    // }
}
