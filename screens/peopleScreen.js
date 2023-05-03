import React, { useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import { Button } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { observer } from 'mobx-react';
import PeopleViewModel from '../viewmodels/peopleViewModel';

const PeopleScreen = observer(() => {
    const navigation = useNavigation();
    const { hasForm, forms, isLoading, error, getForms } = new PeopleViewModel();

    useEffect(() => {
        getForms();
    }, []);

    const renderItem = ({ item }) => (
        <View style={{ marginBottom: 20 }}>
            <Text>{`Name: ${item.userName}`}</Text>
            <Text>{`Age: ${item.age}`}</Text>
            <Text>{`City: ${item.city}`}</Text>
            <Text>{`Gender: ${item.gender}`}</Text>
            <Text>{`Instrument: ${item.musicalInstrument}`}</Text>
            <Text>{`Description: ${item.description}`}</Text>
            <Text>{`Communication: ${item.communication}`}</Text>
        </View>
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
            {isLoading ? (
                <ActivityIndicator size="large" />
            ) : error ? (
                <Text style={{ color: 'red' }}>{error}</Text>
            ) : (
                <FlatList
                    data={forms}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id.toString()}
                />
            )}
            {!hasForm && renderCreateFormButton()}
        </View>
    );
});

export default PeopleScreen;