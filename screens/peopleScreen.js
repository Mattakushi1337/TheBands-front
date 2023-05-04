import React, { useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { observer, useLocalObservable } from 'mobx-react-lite';
import PeopleViewModel from '../viewmodels/peopleViewModel';


const PeopleScreen = observer(() => {
    const navigation = useNavigation();
    const viewModel = useLocalObservable(() => new PeopleViewModel()); // заменяем использование new на useLocalObservable

    useEffect(() => {
        viewModel.checkFormExists();
        viewModel.getForms();
    }, []);

    const renderItem = ({ item }) => (
        <TouchableOpacity onPress={() => navigation.navigate('FormDetails', { form: item })}>
            <View style={{ marginBottom: 20 }}>
                <Text>{`Name: ${item.userName}`}</Text>
                <Text>{`Instrument: ${item.musicalInstrument}`}</Text>
            </View>
        </TouchableOpacity>
    );

    const renderCreateFormButton = () => {
        return (
            <Button
                title="Создать анкету"
                onPress={() => navigation.navigate('CreateForm')}
            />
        );
    };

    return (
        <View>
            {viewModel.isLoading ? (
                <ActivityIndicator size="large" />
            ) : viewModel.error ? (
                <Text style={{ color: 'red' }}>{viewModel.error}</Text>
            ) : (
                <FlatList
                    data={viewModel.forms}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id.toString()}
                />
            )}
            {!viewModel.hasForm && renderCreateFormButton()}
        </View>
    );
});

export default PeopleScreen;