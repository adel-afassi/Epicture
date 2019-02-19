import React, { Component } from 'react';
import { createStackNavigator } from 'react-navigation';
import Connexion from "./ViewsComponents/connexion";
import Home from "./ViewsComponents/home";

const Core = createStackNavigator({
        Connexion: {screen: Connexion},
        Home: {screen: Home},
    }, {
        headerMode: 'none',
    }
);

export default class App extends React.Component {
    render() {
        return (
            <Core/>
        );
    }
}