import React, {Component} from 'react';
import {StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import * as ToastAndroid from "react-native/Libraries/Components/ToastAndroid/ToastAndroid.android";
import {newEntry} from "./ServiceAddSeries";
import NavigationActions from "../../node_modules/react-navigation/lib-rn/NavigationActions";



export default class SeriesForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            series: '',
            episode:'',
            response: false
        };
    }

    render() {
        return (
            <View style={styles.container}>
                <TextInput
                    underlineColorAndroid='transparent'
                    placeholder="Series name: "
                    style={styles.input}
                    keyboardType="email-address"
                    onSubmitEditing={() => this.passwordInput.focus()}
                    onChangeText={(value) => this.setState({name: value})}
                    value={this.state.name}
                />
                <TextInput
                    underlineColorAndroid='transparent'
                    placeholder="Series no: "
                    style={styles.input}
                    keyboardType="email-address"
                    onSubmitEditing={() => this.passwordInput.focus()}
                    onChangeText={(value) => this.setState({series: value})}
                    value={this.state.series}
                />
                <TextInput
                    underlineColorAndroid='transparent'
                    placeholder="Episode no: "
                    style={styles.input}
                    keyboardType="email-address"
                    onSubmitEditing={() => this.passwordInput.focus()}
                    onChangeText={(value) => this.setState({episode: value})}
                    value={this.state.episode}
                />
                <TouchableOpacity style={styles.buttonContainer} onPress={this._onPressButton.bind(this)}>
                    <Text style={styles.buttonText}>Add</Text>
                </TouchableOpacity>
            </View>
        );
    }

    _onPressButton() {
        if (this.state.name === '') {
            ToastAndroid.show('Please enter your series name!', ToastAndroid.SHORT);

        }
        else if (this.state.series === '') {
            ToastAndroid.show('Please type in your series number!', ToastAndroid.SHORT);

        }
        else if (this.state.episode === '') {
            ToastAndroid.show('Please type in your episode number!', ToastAndroid.SHORT);

        }
        else {
            newEntry(this.state.name, this.state.series, this.state.episode).then(val => {
                this.setState({
                    response: val
                });
                console.log(this.state.response.message);
                if (this.state.response.message === true) {
                    ToastAndroid.show('Episode Added', ToastAndroid.SHORT);
                    setTimeout(() => {
                        const resetAction = NavigationActions.reset({
                            index: 0,
                            actions: [
                                NavigationActions.navigate({routeName: 'moviescreen'}),
                            ],
                            key: null
                        });
                        this.props.navigation.dispatch(resetAction);
                    }, 1);
                    //this.props.navigation.navigate("SecondScreen");
                }
                else {
                    ToastAndroid.show('Episode already viewed !', ToastAndroid.SHORT);
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