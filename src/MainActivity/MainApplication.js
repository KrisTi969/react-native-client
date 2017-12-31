import React, { Component } from 'react';
import {Text, StyleSheet, View} from 'react-native'
import * as props from "react-navigation";
import NavigationActions from "../../node_modules/react-navigation/lib/NavigationActions";

import MainApplicationForm from "./MainApplicaitonForm";

export default class MainApplication extends Component {

    constructor(props) {
        super(props);
    }
    render() {
        return (
            <View style={styles.container}>
                <MainApplicationForm navigation={this.props.navigation}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#212121',
    },
    title: {
        color: '#BDBDBD',
        fontSize: 35,
        fontWeight: 'bold'
    },
    titleWrapper: {
        justifyContent: 'center',
        flex: 1,
        alignItems: 'center'
    }
});