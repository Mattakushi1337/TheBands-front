import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
import BandsViewModel from '../viewmodels/bandsViewModel';

class MyBandScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            band: null,
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

    handleViewApplications = () => {
        const { id } = this.state.band;
        this.props.navigation.navigate('MyBandApplications', { bandId: id });
    };

    handleViewMembers = () => {
        const { id } = this.state.band;
        this.props.navigation.navigate('MyBandMembers', { bandId: id });
    };

    render() {
        const { band } = this.state;
        if (!band) {
            return (
                <View>
                    <Text>У вас пока нет группы</Text>
                </View>
            );
        }
        const { bandName, description } = band;
        return (
            <View>
                <Text>{`Band Name: ${bandName}`}</Text>
                <Text>{`Description: ${description}`}</Text>
                <Button title="Delete" onPress={this.handleDelete} />
                <Button title="Update" onPress={this.handleUpdate} />
                <Button title="View Applications" onPress={this.handleViewApplications} />
                <Button title="My Band Members" onPress={this.handleViewMembers} />
            </View>
        );
    }
}

export default MyBandScreen;
