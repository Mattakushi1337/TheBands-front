import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet, Text, ScrollView, TouchableOpacity, KeyboardAvoidingView, ImageBackground } from 'react-native';
import MyFormViewModel from '../viewmodels/myFormViewModel';
import { useNavigation } from '@react-navigation/native';

function EditFormScreen({ route, navigation }) {
    const { userID } = route.params;
    const [form, setForm] = useState({
        userName: '',
        age: '',
        city: '',
        gender: '',
        musicalInstrument: '',
        description: '',
        communication: '',
        userID
    });

    useEffect(() => {
        navigation.setOptions({ title: 'Изменение анкеты' });
        async function fetchForm() {
            const form = await new MyFormViewModel().getForm();
            console.log('form from fetchForm:', form);
            setForm({ ...form });
        }
        fetchForm();
    }, []);

    const handleSave = async () => {
        console.log("form: ", form);
        if (!isNaN(form.age)) {
            await new MyFormViewModel().updateForm(form.id, form);
            navigation.navigate('MyForm');
        } else {
            console.log("Age is not a number.");
        }
    };

    return (
        <ImageBackground
            source={require('../pics/KdHNsSYlCKk.jpg')} // Укажите путь к вашему изображению
            style={styles.backgroundImage}
        >
            <KeyboardAvoidingView behavior="hight" style={styles.container}>
                <ScrollView>
                    <View style={styles.container}>
                        <View>
                            <Text style={styles.label}>Имя пользователя:</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Введите имя пользователя"
                                value={form.userName}
                                onChangeText={(value) => setForm({ ...form, userName: value })}
                            />
                        </View>
                        <View>
                            <Text style={styles.label}>Возраст:</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Введите возраст"
                                value={form.age.toString()}
                                onChangeText={(value) => {
                                    const age = parseInt(value);
                                    if (!isNaN(age)) {
                                        setForm({ ...form, age });
                                    }
                                }}
                            />
                        </View>
                        <View>
                            <Text style={styles.label}>Город:</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Введите город"
                                value={form.city}
                                onChangeText={(value) => setForm({ ...form, city: value })}
                            />
                        </View>
                        <View>
                            <Text style={styles.label}>Пол:</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Введите пол"
                                value={form.gender}
                                onChangeText={(value) => setForm({ ...form, gender: value })}
                            />
                        </View>
                        <View>
                            <Text style={styles.label}>Музыкальный инструмент:</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Введите музыкальный инструмент"
                                value={form.musicalInstrument}
                                onChangeText={(value) => setForm({ ...form, musicalInstrument: value })}
                            />
                        </View>
                        <View>
                            <Text style={styles.label}>Описание:</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Введите описание"
                                value={form.description}
                                onChangeText={(value) => setForm({ ...form, description: value })}
                            />
                        </View>
                        <View style={styles.label}>
                            <Text style={styles.label}>Способ связи:</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Введите способ связи"
                                value={form.communication}
                                onChangeText={(value) => setForm({ ...form, communication: value })}
                            />
                        </View>
                        <TouchableOpacity style={styles.button} onPress={handleSave}>
                            <Text style={styles.buttonText}>Изменить анкету</Text>
                        </TouchableOpacity>
                    </View >
                </ScrollView>
            </KeyboardAvoidingView>
        </ImageBackground>
    );

}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'transparent',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    label: {
        fontWeight: 'bold',
        marginBottom: 5,
        color: 'black'
    },
    input: {
        width: 300,
        height: 'auto',
        borderColor: '#42aaff',
        borderWidth: 2,
        borderRadius: 5,
        paddingHorizontal: 10,
        backgroundColor: 'white',
    },
    button: {
        backgroundColor: 'white',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 100,
        alignItems: 'center',
        marginBottom: 20,
        borderWidth: 2,
        borderColor: '#1faee9'
    },
    error: {
        color: 'red',
        marginBottom: 10,
    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
        backgroundAttachment: 'fixed',
    },
    scrollContent: {
        flexGrow: 1,
    },
});

export default EditFormScreen;
