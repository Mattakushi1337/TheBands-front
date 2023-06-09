import React, { useEffect } from 'react';
import { View, Text, ImageBackground, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
const FormDetailsScreen = ({ route }) => {
    const { form } = route.params;

    const navigation = useNavigation();
    useEffect(() => {
        navigation.setOptions({ title: form.userName });
    }, []);
    return (
        <ImageBackground
            source={require('../pics/WZ2bPLHmuW8.jpg')}
            style={styles.backgroundImage}
        >
            <View style={styles.container}>
                <Text style={styles.text}>{`Имя музыканта: ${form.userName}`}</Text>
                <Text style={styles.text}>{`Возраст: ${typeof form.age === 'number' ? form.age : 'unknown'}`}</Text>
                <Text style={styles.text}>{`Город: ${form.city}`}</Text>
                <Text style={styles.text}>{`Пол: ${form.gender}`}</Text>
                <Text style={styles.text}>{`Музыкальный инструмент: ${form.musicalInstrument}`}</Text>
                <Text style={styles.text}>{`Описание: ${form.description}`}</Text>
                <Text style={styles.text}>{`Способ связи: ${form.communication}`}</Text>
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 50
    },
    text: {
        fontSize: 16,
        marginBottom: 6,
        color: 'black',
    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
    },
});

export default FormDetailsScreen;