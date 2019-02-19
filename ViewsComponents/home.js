import React, { Component } from 'react';
import {Button, Alert, View, AsyncStorage, Text, FlatList} from 'react-native';

import ImageCard from "./print_item";

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            login: "",
            sessionToken: "",
            loading: false,
            data: [],
            page: 1,
            seed: 1,
            error: null,
            refreshing: false,
            items: [],
        };
        this.state.sessionToken = async () => {
            await this.getToken();
        };
        if (this.state.sessionToken)
            this.props.navigation.navigate('Home');
    }

    getToken = async () => {
        return await AsyncStorage.getItem('access_token');
    };


    componentDidMount() {
        this.galleryRequestApi();
    }

    galleryRequestApi = async () => {
        let user =  await AsyncStorage.getItem('access_token');
        let account_username = user.split(',')[4];
        if (!account_username)
            this.props.navigation.navigate('Authentification');
        this.state.login = account_username.replace('account_username=', '');
        const page = this.state;
        this.setState({ loading: true });
        var uri = `https://api.imgur.com/3/gallery/user/viral/0.json`;
        fetch(uri, {method: 'GET', headers: { Authorization: `Client-ID 02a80d2d2df4ce8` },
        }).then(res => res.json())
            .then(res => {
                this.setState({
                    data: page === 1 ? res.data : [...this.state.data, ...res.data ],
                    error: res.error || null,
                    loading: false,
                    refreshing: false
                });
            }).then(() => {this.getData()})
            .catch(error => {
                this.setState({ error, loading: true});
            });
    };
    getData() {
        if (!this.state.data)
            return;
        let data;
        for (let index = 0; index < this.state.data.length; index++) {
            data = {};
            data["id"] = 0;
            data["favori"] = 0;
            data["image"] = '';
            data["title"] = '';
            data["times"] = 0;
            data["comment"] = 0;
            if (this.state.data[index].title && this.state.data[index].datetime) {
                data.favori = this.state.data[index].favorite_count;
                data.times = this.state.data[index].datetime;
                data.title = this.state.data[index].title;
                data.comment = this.state.data[index].comment_count;
            }
            if (typeof this.state.data[index].images !== "undefined") {
                data.image = this.state.data[index].images[0].link;
                if ((data.image.slice(-3) === 'jpg' || data.image.slice(-3) === 'png' )) {
                    data.id = index;
                    this.state.items.push(data);
                }
            }
        }
    };

    RefreshPage = () => {
        this.setState(
            {
                page: 1,
                seed: this.state.seed + 1,
                refreshing: true
            }, () => {
                this.galleryRequestApi();
            }
        );
    };

    headerInfo = () => {
        return <Text style={{fontSize: 18,fontFamily: 'monospace',backgroundColor: "#2d2e25", color: '#ecffff', flex: 1, textAlign: 'center'}}>{`Account: ${this.state.login}`}</Text>;
    };


    itemDisplay = ({ item }) => {
        return (
            <ImageCard data={item} key={item.id}/>
        )
    };

    render() {
        return (
            <View>

                <Button
                    color="black"
                    title="Upload"
                    onPress={() => {
                       Alert.alert('Upload', 'Sorry, the Upload is in maintenance')
                    }}
                    />
                <View
                    style={{
                        borderBottomColor: 'white',
                        borderBottomWidth: 1,
                    }}
                />
                <Button
                    color="black"
                    title="Search"
                    onPress={() => {
                        Alert.alert('Search', 'Sorry, the Search is in maintenance')
                    }}
                />
                <View
                    style={{
                        borderBottomColor: 'white',
                        borderBottomWidth: 1,
                    }}
                />
                <FlatList
                    data={this.state.items}
                    renderItem={this.itemDisplay}
                    keyExtractor={item => item.image}
                    ListHeaderComponent={this.headerInfo}
                    onRefresh={this.RefreshPage}
                    refreshing={this.state.refreshing}
                    onEndReachedThreshold={200}
                />
            </View>
        );
    }
}

export default Home;