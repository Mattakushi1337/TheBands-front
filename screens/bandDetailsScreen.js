import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, TextInput } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import ApplicationViewModel from '../viewmodels/applicationViewModel';

const BandDetailsScreen = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { band } = route.params;
    const applicationViewModel = new ApplicationViewModel();

    const [role, setRole] = useState('');
    const [roleError, setRoleError] = useState('');

    const handleJoinBand = async () => {
        if (role.trim() === '') {
            setRoleError('Please enter a role');
            return;
        }

        try {
            await applicationViewModel.createApplication(band.id, role);
            console.log(`Joining band ${band.id} with role ${role}...`);
            // Дополнительная логика после подачи заявки
        } catch (error) {
            console.error('Error while joining band:', error);
        }
    };

    const handleViewMembers = () => {
        navigation.navigate('BandMember', { bandId: band.id });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.bandName}>{band.bandName}</Text>
            <Text style={styles.description}>{band.description}</Text>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Enter your role"
                    value={role}
                    onChangeText={text => {
                        setRole(text);
                        setRoleError('');
                    }}
                />
                {roleError !== '' && <Text style={styles.error}>{roleError}</Text>}
            </View>
            <View style={styles.buttonContainer}>
                <Button title="Join Band" onPress={handleJoinBand} />
                <Button title="View members" onPress={handleViewMembers} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    bandName: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    description: {
        fontSize: 16,
        marginBottom: 20,
    },
    inputContainer: {
        width: '80%',
        marginBottom: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        borderRadius: 5,
        fontSize: 16,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '80%',
    },
    error: {
        color: 'red',
        marginTop: 5,
    },
});

export default BandDetailsScreen;
