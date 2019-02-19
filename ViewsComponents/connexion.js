import React from 'react';
import {AsyncStorage, WebView} from 'react-native';

class Authentification extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            uri: 'https://api.imgur.com/oauth2/authorize?client_id=acc09a6c468ee5c&response_type=token',
        };
    }

    get_user_information(url_to_parse) {
        let url_begin = url_to_parse.url.split('#')[0];
        let user;

        if (url_begin === 'https://m.imgur.com/')
            user = url_to_parse.url.replace('https://m.imgur.com/#', '');
        else if (url_begin === 'https://imgur.com/')
            user = url_to_parse.url.replace('https://imgur.com/#', '');
        else
            return null;
        user =  user.split('&');
        return user;
    }

    homePageRedirect = async (webView) =>  {
            let url = this.get_user_information(webView);

            if (url && url.length === 6) {
                await AsyncStorage.setItem('access_token', url.toString(), (err) => {
                    if (err) {
                        throw err;
                    } else {
                        this.props.navigation.navigate('Home');
                    }
                }).catch((err) => {
                    console.log("An error was catched : " + err);
                });
                this.props.navigation.navigate('Home');
            }
    };

    render() {
        return (
            <WebView
                source={{uri: this.state.uri}}
                scalesPageToFit
                startInLoadingState
                onNavigationStateChange={this.homePageRedirect.bind(this)}
                onError={this.homePageRedirect.bind(this)}
            />
        );
    }
}

export default Authentification;
