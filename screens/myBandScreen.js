import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
import BandsViewModel from '../viewmodels/bandsViewModel';

class MyBandScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            band: {},
        };
    }

    async componentDidMount() {
        const band = await new BandsViewModel().getMyBand();
        console.log("bandScreen: ", band);
        this.setState({ band: band[0] });
    }

    handleDelete = async () => {
        const bandsViewModel = new BandsViewModel();
        await bandsViewModel.deleteBand(this.state.band.id);
        this.props.navigation.navigate('Profile');
    }

    handleUpdate = async () => {
        const bandsViewModel = new BandsViewModel();
        const { id } = this.state.band; // Получаем значение id из состояния формы
        await bandsViewModel.updateBand(id, this.state.band); // Передаем id вместе с формой
        this.props.navigation.navigate('EditBand', { userID: id });
    };

    render() {
        const { bandName, description } = this.state.band;
        return (
            <View>
                <Text>{`Band Name: ${bandName}`}</Text>
                <Text>{`Description: ${description}`}</Text>
                <Button title="Delete" onPress={this.handleDelete} />
                <Button title="Update" onPress={this.handleUpdate} />
            </View>
        );
    }
}

export default MyBandScreen;
