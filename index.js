import {AppRegistry} from 'react-native';
import React from "react";
import {StackNavigator} from "react-navigation";
import Login from "./src/login/Login";
import Splash from "./src/splash/Splash";
import Series from "./src/MovieMenu/Series";
import LoginForm from "./src/login/LoginForm";
import Movie from "./src/MovieMenu/Series";
import MainApplication from "./src/MainActivity/MainApplication";
import ListView from "./src/ListView/ListView";

const navSplash = props => {
    return <Splash navigation={props.navigation}/>;
};

navSplash.navigationOptions = {
    title: "SplashScreen",
    header: null
};


const movieScreen = props => {
    return <Series navigation={props.navigation}/>
};

movieScreen.navigationOptions = {
    title: "MovieScreen",
    header: null
};

const navLogin = props => {
    return <Login navigation={props.navigation}/>
};

navLogin.navigationOptions = {
    title: "LoginScreen",
    header: null
};

const navMain = props => {
    return <Reminders navigation={props.navigation}/>
};

navMain.navigationOptions = {
    title: "MainScreen",
    header: null
};

const navMainApp = props => {
    return <MainApplication navigation={props.navigation}/>
};

navMainApp.navigationOptions = {
    title: "MainApplication",
    header:null
};



const listScreen = props => {
    return <ListView navigation={props.navigation}/>
};

listScreen.navigationOptions = {
    title: "ListView",
    header:null
};


const SimpleApp = StackNavigator({
    splashscreen: {screen: navSplash},
    loginscreen: {screen: navLogin},
    mainscreen: {screen: navMain},
    moviescreen: {screen: movieScreen},
    listscreen: {screen: listScreen},
    mainapplication: {screen: navMainApp},

}, {headerMode: 'screen'});

AppRegistry.registerComponent("CORNFLIX", () => SimpleApp);