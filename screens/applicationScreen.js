import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Button } from 'react-native';
import ApplicationViewModel from '../viewmodels/applicationViewModel';

const ApplicationScreen = ({ bandId }) => {
    const [applications, setApplications] = useState([]);

    useEffect(() => {
        loadApplications();
    }, []);

    const loadApplications = async () => {
        const response = await new ApplicationViewModel().getApplications(bandId);
        setApplications(response.data);
    };

    const handleApprove = async (applicationId, role) => {
        await new ApplicationViewModel().approveApplication(applicationId, role);
        loadApplications();
    };

    const handleReject = async (applicationId, role) => {
        await new ApplicationViewModel().rejectApplication(applicationId, role);
        loadApplications();
    };

    const renderItem = ({ item }) => (
        <View>
            <Text>{item.user.userName}</Text>
            <Text>{item.role}</Text>
            <Button title="Approve" onPress={() => handleApprove(item.id, item.role)} />
            <Button title="Reject" onPress={() => handleReject(item.id, item.role)} />
        </View>
    );

    return (
        <View>
            <FlatList
                data={applications}
                renderItem={renderItem}
                keyExtractor={item => item.id.toString()}
            />
        </View>
    );
};

export default ApplicationScreen;