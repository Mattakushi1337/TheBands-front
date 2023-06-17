import React, { Component } from 'react';
import { View, Text, Button, FlatList, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import BandMembersViewModel from '../viewmodels/bandMembersViewModel';




class MyBandMembersScreen extends Component {
    static navigationOptions = {
        title: 'Название вашего экрана',
    };

    constructor(props) {
        super(props);
        this.state = {
            members: [],
        };
    }


    async componentDidMount() {
        const bandId = this.props.route.params.bandId;
        const bandMembersViewModel = new BandMembersViewModel();
        const members = await bandMembersViewModel.getBandMembers(bandId);
        console.log(bandId, members);
        this.setState({ members, bandMembersViewModel });
        this.props.navigation.setOptions({
            title: 'Участники моей группы',
        });
    }

    handleDelete = async (memberId) => {
        const { bandMembersViewModel } = this.state;
        await bandMembersViewModel.deleteBandMember(memberId);
        const bandId = this.props.route.params.bandId;
        const members = await bandMembersViewModel.getBandMembers(bandId);
        console.log(bandId);
        this.setState({ members, bandMembersViewModel });
    };

    renderItem = ({ item }) => {
        return (

            <View style={styles.itemContainer}>
                <Text style={styles.userName}>Имя: {item.user.userName}</Text>
                <Text style={styles.role}>Роль: {item.role}</Text>
                <TouchableOpacity
                    style={styles.buttonDelete}
                    onPress={() => this.handleDelete(item.id)}
                >
                    <Text style={styles.buttonText}>Удалить</Text>
                </TouchableOpacity>
            </View>

        );
    };

    render() {
        return (
            <ImageBackground
                source={require('../pics/KdHNsSYlCKk.jpg')}
                style={styles.backgroundImage}
            >
                <FlatList
                    data={this.state.members}
                    renderItem={this.renderItem}
                    keyExtractor={(item) => item.id.toString()}
                />
            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    itemContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    buttonDelete: {
        backgroundColor: 'white',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 100,
        alignItems: 'center',
        marginBottom: 8,
        borderWidth: 2,
        borderColor: '#ff033e',
    },
    buttonText: {
        color: 'black',
        fontSize: 16,
        fontWeight: 'bold',
    },
    userName: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    role: {
        fontSize: 16,
    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
    },
});

export default MyBandMembersScreen;
