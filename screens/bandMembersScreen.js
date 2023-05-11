import React, { Component } from 'react';
import { View, Text, FlatList, Button } from 'react-native';
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
    }



    renderItem = ({ item }) => {
        return (
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text>{item.userName}</Text>
                <Text>{item.role}</Text>
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

export default BandMembersScreen;
