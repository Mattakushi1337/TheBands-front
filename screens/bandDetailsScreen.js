import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

const BandDetailsScreen = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { band } = route.params;

    const handleJoinBand = () => {
        // Обработчик нажатия на кнопку подачи заявки
        console.log(`Joining band ${band.id}...`);
    };

    const handleViewBandMembers = () => {
        // Обработчик нажатия на кнопку просмотра состава группы
        console.log(`Viewing members of band ${band.id}...`);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.bandName}>{band.bandName}</Text>
            <Text style={styles.description}>{band.description}</Text>
            <View style={styles.buttonContainer}>
                <Button title="Join Band" onPress={handleJoinBand} />
                <Button title="View Members" onPress={handleViewBandMembers} />
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
        fontSize: 18,
        marginBottom: 20,
        textAlign: 'center',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '80%',
    },
});

export default BandDetailsScreen;
