import React from 'react';
import { View, Text } from 'react-native';

const FormDetailsScreen = ({ route }) => {
    const { form } = route.params; // Получаем данные анкеты из параметров навигации
    return (
        <View>
            <Text>{`Name: ${form.userName}`}</Text>
            <Text>{`Age: ${typeof form.age === 'number' ? form.age : 'unknown'}`}</Text>
            <Text>{`City: ${form.city}`}</Text>
            <Text>{`Gender: ${form.gender}`}</Text>
            <Text>{`Instrument: ${form.musicalInstrument}`}</Text>
            <Text>{`Description: ${form.description}`}</Text>
            <Text>{`Communication: ${form.communication}`}</Text>
        </View>
    );
};

export default FormDetailsScreen;
