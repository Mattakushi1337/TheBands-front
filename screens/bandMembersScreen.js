import React, { Component } from 'react';
import { View, Text, FlatList, Button, ImageBackground, StyleSheet } from 'react-native';
import BandMembersViewModel from '../viewmodels/bandMembersViewModel';

class BandMembersScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            members: [],
        };
    }

    async componentDidMount() {
        const bandId = this.props.route.params.bandId;
        const members = await new BandMembersViewModel().getBandMembers(bandId);
        this.setState({ members });
        this.props.navigation.setOptions({
            title: 'Участники группы',
        });
    }


    renderItem = ({ item }) => {
        return (
            <View style={styles.itemContainer}>
                <Text style={styles.userName}>Имя: {item.user.userName}</Text>
                <Text style={styles.role}>Роль: {item.role}</Text>
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


export default BandMembersScreen;
