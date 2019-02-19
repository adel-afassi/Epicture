import React, { Component } from 'react';
import { Image } from 'react-native';
import {Card, CardItem, Thumbnail, Text, Left, Body } from 'native-base';

class ImageCard extends Component {
    render() {
        return (
            <Card>
                <CardItem>
                    <Left>
                        <Thumbnail source={{uri: this.props.data.image}}/>
                        <Body>
                        <Text note>{this.props.data.title}</Text>
                        </Body>
                    </Left>
                </CardItem>
                <CardItem cardBody>
                    <Image source={{uri: this.props.data.image}} style={{height: 500, width: null, flex: 1}}/>
                </CardItem>
                <CardItem>
                    <Left>
                        <Text>{this.props.data.favori} Likes</Text>
                    </Left>
                    <Body>
                        <Text>{this.props.data.comment} Comments</Text>
                    </Body>
                </CardItem>
            </Card>
        );
    }
}

export default ImageCard;