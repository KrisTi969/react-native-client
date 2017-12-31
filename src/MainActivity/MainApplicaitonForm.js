import React, {Component} from 'react';
import {StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import * as ToastAndroid from "react-native/Libraries/Components/ToastAndroid/ToastAndroid.android";
import NavigationActions from "../../node_modules/react-navigation/lib-rn/NavigationActions";

export default class MainApplicaitonForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            err: '',
            name: '',
            datee: '',
            curr_name: '',
            new_name: '',
            todelete: '',
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
                    placeholder="Date: "
                    style={styles.input}
                    keyboardType="numeric"
                    onSubmitEditing={() => this.passwordInput.focus()}
                    onChangeText={(value) => this.setState({datee: value})}
                    value={this.state.datee}
                />
                <TouchableOpacity style={styles.buttonContainer} onPress={this._onPressButton.bind(this)}>
                    <Text style={styles.buttonText}>Add</Text>
                </TouchableOpacity>
                <TextInput
                    underlineColorAndroid='transparent'
                    placeholder="Current name: "
                    style={styles.input}
                    keyboardType="email-address"
                    onSubmitEditing={() => this.passwordInput.focus()}
                    onChangeText={(value) => this.setState({curr_name: value})}
                    value={this.state.curr_name}
                />
                <TextInput
                    underlineColorAndroid='transparent'
                    placeholder="New Name: "
                    style={styles.input}
                    keyboardType="email-address"
                    onSubmitEditing={() => this.passwordInput.focus()}
                    onChangeText={(value) => this.setState({new_name: value})}
                    value={this.state.new_name}
                />

                <TouchableOpacity style={styles.buttonContainer} onPress={this._onPressButtonEdit.bind(this)}>
                    <Text style={styles.buttonText}>Edit</Text>
                </TouchableOpacity>



                <TextInput
                    underlineColorAndroid='transparent'
                    placeholder="Delete name: "
                    style={styles.input}
                    keyboardType="email-address"
                    onSubmitEditing={() => this.passwordInput.focus()}
                    onChangeText={(value) => this.setState({todelete: value})}
                    value={this.state.todelete}
                />

                <TouchableOpacity style={styles.buttonContainer} onPress={this._onPressButtonDelete.bind(this)}>
                    <Text style={styles.buttonText}>Delete</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonContainer} onPress={this._onPressButtonShowAll.bind(this)}>
                    <Text style={styles.buttonText}>Show All!</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonContainer} onPress={this._onPressButtonServer.bind(this)}>
                    <Text style={styles.buttonText}>Show Recomandations!</Text>
                </TouchableOpacity>
            </View>
        );
    }

    _onPressButtonServer () {
        setTimeout(() => {
            const resetAction = NavigationActions.reset({
                index: 0,
                actions: [
                    NavigationActions.navigate({routeName: 'listscreen'}),
                ],
                key: null
            });
            this.props.navigation.dispatch(resetAction);
        }, 1);
    }

    _onPressButtonShowAll() {
        var all = "";
            var SQLite = require('react-native-sqlite-storage')
            var db = SQLite.openDatabase({name: 'database.db', location: 'default'}, function (db) {
                db.transaction(function (tx) {
                    var query = "Select * FROM React";
                    tx.executeSql(query, [], function (tx, resultSet) {
                            for(var x = 0; x < resultSet.rows.length; x++) {
                                console.log("First name: " + resultSet.rows.item(x).name +
                                    ", Acct: " + resultSet.rows.item(x).date);
                                all +=resultSet.rows.item(x).id  + " " + resultSet.rows.item(x).name + " " + resultSet.rows.item(x).date + "\n";
                            }
                            ToastAndroid.show(all,ToastAndroid.LONG);
                        },
                        function (tx, error) {
                            console.log('Delete error: ' + error.message);
                        });
                }, function (error) {
                    console.log('transaction error: ' + error.message);
                }, function () {
                    console.log('transaction ok');
                });
            }, function (error) {
                console.log('Open database ERROR: ' + JSON.stringify(error));
            });
    }

    _onPressButtonDelete() {
        if (this.state.todelete=== '') {
            ToastAndroid.show('Please enter the name!', ToastAndroid.SHORT);
        }
        else {
            var t1 = this.state.todelete;
            var SQLite = require('react-native-sqlite-storage')
            var db = SQLite.openDatabase({name: 'database.db', location: 'default'}, function (db) {
                db.transaction(function (tx) {
                    var query = "DELETE FROm React WHERE name = ?";
                    tx.executeSql(query, [t1], function (tx, res) {
                            console.log("insertId: " + res.insertId);
                            console.log("rowsAffected: " + res.rowsAffected);
                            if(res.rowsAffected === 0) {
                                ToastAndroid.show("Name does not exist!", ToastAndroid.SHORT)
                            }
                            else
                                ToastAndroid.show("Deleted!", ToastAndroid.SHORT)
                        },
                        function (tx, error) {
                            console.log('Delete error: ' + error.message);
                        });
                }, function (error) {
                    console.log('transaction error: ' + error.message);
                }, function () {
                    console.log('transaction ok');
                });
            }, function (error) {
                console.log('Open database ERROR: ' + JSON.stringify(error));
            });
        }
    }
    _onPressButtonEdit() {
        if (this.state.curr_name === '') {
            ToastAndroid.show('Please enter the current name!', ToastAndroid.SHORT);

        }
        else if (this.state.new_name=== '') {
            ToastAndroid.show('Please enter the new name!', ToastAndroid.SHORT);

        }
        else {
            var t1 = this.state.curr_name;
            var t2 = this.state.new_name;
            var SQLite = require('react-native-sqlite-storage')
            var db = SQLite.openDatabase({name: 'database.db', location: 'default'}, function (db) {
                db.transaction(function (tx) {
                    var query = "UPDATE React SET name = ? WHERE name = ?";
                    tx.executeSql(query, [t2, t1], function (tx, res) {
                            console.log("insertId: " + res.insertId);
                            console.log("rowsAffected: " + res.rowsAffected);
                            if(res.rowsAffected === 0) {
                                ToastAndroid.show("Name does not exist!", ToastAndroid.SHORT)
                            }
                            else
                                ToastAndroid.show("Updated!", ToastAndroid.SHORT)
                        },
                        function (tx, error) {
                            console.log('UPDATE error: ' + error.message);
                        });
                }, function (error) {
                    console.log('transaction error: ' + error.message);
                }, function () {
                    console.log('transaction ok');
                });
            }, function (error) {
                console.log('Open database ERROR: ' + JSON.stringify(error));
            });
        }
    }

    _onPressButton() {
        if (this.state.name === '') {
            ToastAndroid.show('Please enter the  name!', ToastAndroid.SHORT);

        }
        else if (this.state.datee=== '') {
            ToastAndroid.show('Please enter the date!', ToastAndroid.SHORT);
        }
        else {
            var t2 = this.state.datee;
            var t1 = this.state.name;
            var SQLite = require('react-native-sqlite-storage')
            var db = SQLite.openDatabase({name: 'database.db', location: 'default'}, function (db) {
                db.transaction(function (tx) {
                    // ...  If the table already exists, this SQL statement opens the table.
                    tx.executeSql('CREATE TABLE React (id integer primary key, name text, date text)');
                }, function (error) {
                    console.log('transaction error: ' + error.message);
                }, function () {
                    console.log('transaction ok');
                });
                //
                db.transaction(function (tx) {
                    // var t2 = this.state.datee;  //codul asta comentat nu merge in partea asta de cod cu cu db.tranzaticon
                    // var t1 = this.state.name;         // asa ceva nu am vazut niciodata
                    var query = "INSERT INTO React (name, date) VALUES (?,?)";
                    tx.executeSql(query, [t1, t2], function (tx, res) {
                            console.log("insertId: " + res.insertId + " -- probably 1");
                            console.log("rowsAffected: " + res.rowsAffected + " -- should be 1");
                            ToastAndroid.show("Added!", ToastAndroid.SHORT)
                        },
                        function (tx, error) {
                            console.log('INSERT error: ' + error.message);
                        });
                }, function (error) {
                    console.log('transaction error: ' + error.message);
                }, function () {
                    console.log('transaction ok');
                });
                //
            }, function (error) {
                console.log('Open database ERROR: ' + JSON.stringify(error));
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
        delete: {
            height:20,
            backgroundColor: 'rgba(255,255,255,0.15)',
            marginBottom: 20,
            color: '#BDBDBD',
            paddingHorizontal: 10,
            textAlign: 'left'
        },
        buttonText: {
            textAlign: 'center',
            color: '#BDBDBD'
        }
    });
