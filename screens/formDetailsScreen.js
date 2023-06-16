import React from 'react';
import { View, Text, ImageBackground, StyleSheet } from 'react-native';

const FormDetailsScreen = ({ route }) => {
    const { form } = route.params;
    return (
        <ImageBackground
            source={require('../pics/847ACCt5l8w.jpg')}
            style={styles.backgroundImage}
        >
            <View style={styles.container}>
                <Text style={styles.text}>{`Имя: ${form.userName}`}</Text>
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