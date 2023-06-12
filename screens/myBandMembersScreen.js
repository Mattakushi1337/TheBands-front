import React, { Component } from 'react';
import { View, Text, Button, FlatList } from 'react-native';
import BandMembersViewModel from '../viewmodels/bandMembersViewModel';

class MyBandMembersScreen extends Component {
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
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text>{item.user.userName}</Text>
                <Text>{item.role}</Text>
                <Button title="Delete" onPress={() => this.handleDelete(item.id)} />
            </View>
        );
    };

    render() {
        return (
            <FlatList
                data={this.state.members}
                renderItem={this.renderItem}
                keyExtractor={(item) => item.id.toString()}
            />
        );
    }
}

export default MyBandMembersScreen;
