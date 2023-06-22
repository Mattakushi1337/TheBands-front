import React, { useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import { Button } from 'react-native-elements';
import { useNavigation, useRoute } from '@react-navigation/native';
import { observer, useLocalObservable } from 'mobx-react-lite';
import PeopleViewModel from '../viewmodels/peopleViewModel';

const PeopleScreen = observer(() => {
    const navigation = useNavigation();
    const route = useRoute();
    const viewModel = useLocalObservable(() => new PeopleViewModel());

    useEffect(() => {
        viewModel.checkFormExists();
        viewModel.getForms();
    }, []);

    const renderItem = ({ item }) => (
        <TouchableOpacity onPress={() => navigation.navigate('FormDetails', { form: item })}>
            <View style={styles.formItem}>
                <Text style={styles.userName}>{`Имя музыканта: ${item.userName}`}</Text>
                <Text style={styles.musicalInstrument}>{`Музыкальный инструмент: ${item.musicalInstrument}`}</Text>
            </View>
        </TouchableOpacity>
    );

    useEffect(() => {
        navigation.setOptions({
            title: 'Анкеты музыкантов',
            headerRight: () => (
                <Button
                    title="Создать"
                    onPress={() => navigation.navigate('CreateForm')}
                    buttonStyle={styles.createButton}
                    titleStyle={styles.createButtonText}
                />
            ),
        });
    }, [navigation]);

    const renderHeader = () => {
        return (
            <>
                {viewModel.isLoading && (
                    <ActivityIndicator size="large" style={styles.loadingIndicator} />
                )}
                {viewModel.error && (
                    <Text style={styles.errorText}>{viewModel.error}</Text>
                )}
            </>
        );
    };

    return (
        <ImageBackground
            source={require('../pics/YYSC9qTR9HA.jpg')}
            style={styles.backgroundImage}
        >
            <View style={styles.container}>
                <FlatList
                    data={viewModel.forms}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id.toString()}
                    ListHeaderComponent={renderHeader}
                    contentContainerStyle={styles.contentContainer}
                />
            </View>
        </ImageBackground>
    );
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    formItem: {
        width: 361,
        height: 50,
        borderRadius: 100,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#1faee9',
        borderWidth: 2,
        marginTop: 10
    },
    userName: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    musicalInstrument: {
        fontSize: 14,
        color: 'gray',
    },
    loadingIndicator: {
        marginTop: 20,
    },
    errorText: {
        color: 'red',
        marginTop: 20,
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
    contentContainer: {
        flexGrow: 1,
    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
    },
});

export default PeopleScreen;
