import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, TouchableOpacity, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import { useNavigation, useRoute } from '@react-navigation/native';
import { observer } from 'mobx-react';
import BandsViewModel from '../viewmodels/bandsViewModel';
import { ImageBackground } from 'react-native';

const BandsScreen = observer(() => {
    const navigation = useNavigation();
    const route = useRoute();
    const bandsViewModel = useState(new BandsViewModel())[0];

    useEffect(() => {
        bandsViewModel.getBands();
    }, []);

    useEffect(() => {
        navigation.setOptions({
            title: 'Анкеты групп',
            headerRight: () => (
                <Button
                    title="Создать"
                    onPress={() => navigation.navigate('CreateBand')}
                    buttonStyle={styles.createButton}
                    titleStyle={styles.createButtonText}
                />
            ),
        });
    }, [navigation]);


    const handleRefresh = () => {
        bandsViewModel.getBands();

    };


    const renderItem = ({ item }) => (
        <TouchableOpacity
            onPress={() => navigation.navigate('BandDetails', { band: item })}
            style={styles.bandItem}
        >
            <View style={styles.shapeContainer}>
                <Text style={styles.bandName}>{`Название группы: ${item.bandName}`}</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <ImageBackground
            source={require('../pics/YYSC9qTR9HA.jpg')}
            style={styles.backgroundImage}
        >
            <View style={styles.container}>
                {bandsViewModel.isLoading ? (
                    <ActivityIndicator size="large" />
                ) : bandsViewModel.error ? (
                    <Text style={styles.errorText}>{bandsViewModel.error}</Text>
                ) : (
                    <FlatList
                        data={bandsViewModel.bands}
                        renderItem={renderItem}
                        keyExtractor={(item) => item.id.toString()}
                        onRefresh={handleRefresh}
                        refreshing={bandsViewModel.isLoading}
                    />
                )}
            </View>
        </ImageBackground>
    );
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    bandItem: {
        marginBottom: 10,
    },
    shapeContainer: {
        width: 350,
        height: 50,
        borderRadius: 100,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#1faee9',
        borderWidth: 2,
    },
    bandName: {
        fontSize: 16,
        color: 'black',
    },
    errorText: {
        color: 'red',
        fontSize: 16,
    },
    createButton: {
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 6,
        paddingVertical: 5,
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
        borderWidth: 1,
        borderColor: '#1faee9'
    },
    createButtonText: {
        color: '#1faee9',
        fontSize: 14,
    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
    },
});

export default BandsScreen;
