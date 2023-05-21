import React, { Component } from 'react';
import { View, Text, Button, FlatList } from 'react-native';
import ApplicationViewModel from '../viewmodels/applicationViewModel';

class MyBandApplicationsScreen extends Component {
    constructor(props) {
        super(props);
        this.props.navigation.setOptions({ title: 'Заявки' });
        this.state = {
            applications: [],
        };
    }

    async componentDidMount() {
        const bandId = this.props.route.params.bandId;
        const applications = await new ApplicationViewModel().getApplications(bandId);
        this.setState({ applications });
    }

    handleApprove = async (applicationId, role) => {
        await new ApplicationViewModel().approveApplication(applicationId, role);
        const bandId = this.props.route.params.bandId;
        const applications = await new ApplicationViewModel().getApplications(bandId);
        this.setState({ applications });
    };

    handleReject = async (applicationId, role) => {
        await new ApplicationViewModel().rejectApplication(applicationId, role);
        const bandId = this.props.route.params.bandId;
        const applications = await new ApplicationViewModel().getApplications(bandId);
        this.setState({ applications });
    };

    renderItem = ({ item }) => {
        return (
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text>{item.user.userName}</Text>
                <Text>{item.role}</Text>
                <Button title="Принять" onPress={() => this.handleApprove(item.id, item.role)} />
                <Button title="Отклонить" onPress={() => this.handleReject(item.id, item.role)} />
            </View>
        );
    };

    render() {
        return (
            <FlatList
                data={this.state.applications}
                renderItem={this.renderItem}
                keyExtractor={(item) => item.id.toString()}
            />
        );
    }
}

export default MyBandApplicationsScreen;