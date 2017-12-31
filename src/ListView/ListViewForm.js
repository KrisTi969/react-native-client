import React, {Component} from 'react';
import {Text, View, TouchableOpacity, StyleSheet, Alert} from 'react-native';
import * as ToastAndroid from "react-native/Libraries/Components/ToastAndroid/ToastAndroid.android";
import NavigationActions from "../../node_modules/react-navigation/lib-rn/NavigationActions";
import {getList} from "./ServiceList";


export default class ListViewForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            listOfObjects:[],
            response: [],
        };
        getList().then(val => {
            this.setState({
                response: val
            });
            console.log(this.state.dummy);
            console.log(this.state.response);
            console.log(this.state.response[1]);
            console.log(this.state.response.length);
            console.log(this.state.response[0].name);
            if (this.state.response.message) {
                //ToastAndroid.show('Login successful!', ToastAndroid.SHORT);

                //this.props.navigation.navigate("SecondScreen");
            }
        });
    }

    alertItemName = (item) => {
        alert(item.name)
    };
    render() {
        return (
            <View>
                {
                    this.state.response.map((item, index) => (
                        <TouchableOpacity
                            key = {item.name}
                            style = {styles.container}
                            onPress = {() => this.alertItemName(item)}>

                            <Text style = {styles.text}>
                                {item.name + " " + item.first_aired}
                            </Text>
                        </TouchableOpacity>
                    ))
                }
            </View>
        )
    }
}


const styles = StyleSheet.create ({
    container: {
        padding: 10,
        marginTop: 3,
        backgroundColor: '#d9f9b1',
        alignItems: 'center',
    },
    text: {
        color: '#4f603c'
    }
});