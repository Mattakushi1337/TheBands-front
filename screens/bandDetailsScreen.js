import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, TextInput, ImageBackground, TouchableOpacity } from 'react-native';
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
            setRoleError('Введите вашу роль в группе');
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


    useEffect(() => {
        navigation.setOptions({ title: band.bandName });
    }, []);
    return (
        <ImageBackground
            source={require('../pics/847ACCt5l8w.jpg')}
            style={styles.backgroundImage}
        >
            <View style={styles.container}>
                <Text style={styles.bandName}>{band.bandName}</Text>
                <Text style={styles.description}>{band.description}</Text>
                <Text style={styles.description}>{band.contact}</Text>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Введите вашу роль в группе"
                        value={role}
                        onChangeText={text => {
                            setRole(text);
                            setRoleError('');
                        }}
                    />
                    {roleError !== '' && <Text style={styles.error}>{roleError}</Text>}
                </View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button} onPress={handleJoinBand}>
                        <Text style={styles.buttonText}>Отправить заявку</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.button} onPress={handleViewMembers}>
                        <Text style={styles.buttonText}>Посмотреть участников</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 100
    },
    bandName: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 0,
    },
    description: {
        fontSize: 16,
        marginBottom: 10,
    },
    inputContainer: {
        width: '80%',
        marginBottom: 10,
    },
    input: {
        borderWidth: 1,
        borderColor: '#1faee9',
        padding: 10,
        borderRadius: 100,
        fontSize: 16,
        backgroundColor: 'white'

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
        borderWidth: 1,
    },
    error: {
        color: 'red',
        marginTop: 5,
    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
    },
});

export default BandDetailsScreen;
