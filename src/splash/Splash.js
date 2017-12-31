import React, {Component} from 'react'
import {Text, StyleSheet, View} from 'react-native'
import * as props from "react-navigation";
import NavigationActions from "../../node_modules/react-navigation/lib/NavigationActions";

export default class Splash extends Component {
    render() {
        var textArray = ['"I\'m going to make him an offer he can\'t refuse."\n' +
        'The Godfather, 1972',
            '"They may take our lives, but they\'ll never take our freedom!"\n' +
            'Braveheart, 1995',
            '"I\'ll be back."\n' +
            'The Terminator, 1984',
            '"Chewie, we\'re home."\n' +
            'Han Solo, Star Wars The Force Awakens' ,
             '"They call it a Royale with cheese."\n' +
             'Pulp Fiction, 1994',
            '"Just when I thought I was out, they pull me back in."\n' +
            'The Godfather: Part III, 1990'
        ];

        var min = 0;
        var max = 6;
        min = Math.ceil(min);
        max = Math.floor(max);
        var nr = Math.floor(Math.random() * (max - min) + min);
        return (
            <View style={styles.container}>
                <View style={styles.titleWrapper}>
                    <Text style={styles.title}>CORNFLIX</Text>
                </View>
                <Text style={styles.subtitle}>
                    {textArray[nr]}</Text>
            </View>
        );
    }

    componentDidMount() {
        setTimeout(() => {
            const resetAction = NavigationActions.reset({
                index: 0,
                actions: [
                    NavigationActions.navigate({routeName: 'loginscreen'}),
                ],
                key: null
            });
            this.props.navigation.dispatch(resetAction);
            //this.props.navigation.navigate("SecondScreen");
        }, 2500);
    }

    componentWillUnmount() {

    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#212121',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        color: '#BDBDBD',
        fontSize: 35,
        fontWeight: 'bold'
    },
    subtitle: {
        color: '#BDBDBD',
        fontWeight: '200',
        fontSize: 20,
        paddingBottom: 20,
    },
    titleWrapper: {
        justifyContent: 'center',
        flex: 1
    }
});