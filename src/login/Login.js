import React, {Component} from 'react'
import {StyleSheet, View, Text} from 'react-native'
import LoginForm from "./LoginForm";
import * as props from "react-navigation";
import NavigationActions from "../../node_modules/react-navigation/lib/NavigationActions";

export default class Login extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.titleWrapper}>
                    <Text style={styles.title}>CORNFLIX</Text>
                </View>
                <View>
                    <LoginForm navigation={this.props.navigation}/>
                </View>
            </View>
        );
    }

    componentDidMount() {
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