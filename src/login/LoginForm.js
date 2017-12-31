import React, {Component} from 'react';
import {StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import * as ToastAndroid from "react-native/Libraries/Components/ToastAndroid/ToastAndroid.android";
import {login} from "./Service";
import NavigationActions from "../../node_modules/react-navigation/lib-rn/NavigationActions";

export default class LoginForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            response: false
        };
    }

    render() {
        return (
            <View style={styles.container}>
                <TextInput
                    underlineColorAndroid='transparent'
                    placeholder="Username"
                    style={styles.input}
                    keyboardType="email-address"
                    onSubmitEditing={() => this.passwordInput.focus()}
                    onChangeText={(value) => this.setState({username: value})}
                    value={this.state.username}
                />
                <TextInput
                    underlineColorAndroid='transparent'
                    placeholder="Password"
                    style={styles.input}
                    secureTextEntry
                    ref={(input) => this.passwordInput = input}
                    onChangeText={(value) => this.setState({password: value})}
                    value={this.state.password}
                />
                <TouchableOpacity style={styles.buttonContainer} onPress={this._onPressButton.bind(this)}>
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>
            </View>
        );
    }

    _onPressButton() {
        if (this.state.username === '') {
            ToastAndroid.show('Please enter your username!', ToastAndroid.SHORT);

        }
        else if (this.state.password === '') {
            ToastAndroid.show('Please type in your password!', ToastAndroid.SHORT);

        }
        else {
            login(this.state.username, this.state.password).then(val => {
                this.setState({
                    response: val
                });
                console.log(this.state.response.message);
                if (this.state.response.message === "true") {
                    //ToastAndroid.show('Login successful!', ToastAndroid.SHORT);
                    setTimeout(() => {
                    const resetAction = NavigationActions.reset({
                        index: 0,
                        actions: [
                            NavigationActions.navigate({routeName: 'mainapplication'}),
                        ],
                        key: null
                    });
                    this.props.navigation.dispatch(resetAction);
                    }, 1);
                    //this.props.navigation.navigate("SecondScreen");
                }
                else {
                    ToastAndroid.show('Login unsuccessful!', ToastAndroid.SHORT);
                }
            });
        }
    }
}

const
    styles = StyleSheet.create({
        container: {
            padding: 20
        },
        input: {
            height: 40,
            backgroundColor: 'rgba(255,255,255,0.15)',
            marginBottom: 20,
            color: '#BDBDBD',
            paddingHorizontal: 10,
            textAlign: 'center'
        },
        buttonContainer: {
            backgroundColor: '#212121',
            paddingVertical: 10
        },
        buttonText: {
            textAlign: 'center',
            color: '#BDBDBD'
        }
    });