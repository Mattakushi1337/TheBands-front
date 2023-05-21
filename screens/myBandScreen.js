import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
import BandsViewModel from '../viewmodels/bandsViewModel';

class MyBandScreen extends React.Component {
    constructor(props) {
        super(props);
        this.props.navigation.setOptions({ title: 'Моя анкета группы' });
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
                <Text>{`Имя группы: ${bandName}`}</Text>
                <Text>{`Описание: ${description}`}</Text>
                <Button title="Удалить" onPress={this.handleDelete} />
                <Button title="Изменить" onPress={this.handleUpdate} />
                <Button title="Просмотр заявок" onPress={this.handleViewApplications} />
                <Button title="Участники моей группы" onPress={this.handleViewMembers} />
            </View>
        );
    }
}

export default MyBandScreen;
