import React, { Component } from 'react';
import { View, Text, Button, TouchableOpacity, ImageBackground, StyleSheet } from 'react-native';
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
        if (!band || Object.keys(band).length === 0) {
            return (<ImageBackground
                source={require('../pics/KdHNsSYlCKk.jpg')}
                style={styles.backgroundImage}
            >
                <Text style={styles.emptyText}>У вас пока нет группы</Text>
            </ImageBackground>);
        }
        const { bandName, description, contact } = band;
        return (
            <ImageBackground
                source={require('../pics/KdHNsSYlCKk.jpg')}
                style={styles.backgroundImage}
            >
                <View style={styles.container}>
                    <Text style={styles.text}>{`Имя группы: ${bandName}`}</Text>
                    <Text style={styles.text}>{`Описание: ${description}`}</Text>
                    <Text style={styles.text}>{`Связаться: ${contact}`}</Text>
                    <TouchableOpacity style={styles.button} onPress={this.handleDelete}>
                        <Text style={styles.buttonText}>Удалить</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={this.handleUpdate}>
                        <Text style={styles.buttonText}>Изменить</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={this.handleViewApplications}>
                        <Text style={styles.buttonText}>Просмотр заявок</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={this.handleViewMembers}>
                        <Text style={styles.buttonText}>Участники моей группы</Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontSize: 16,
        marginBottom: 10,
    },
    button: {
        width: 300,
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 40,
        paddingVertical: 5,
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
        borderColor: '#1faee9',
        borderWidth: 2,
    },
    buttonText: {
        fontSize: 16,
        color: '#1faee9',
    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
    },
    emptyText: {
        fontSize: 16,
        textAlign: 'center',
        marginTop: 20,

    },
});

export default MyBandScreen;
