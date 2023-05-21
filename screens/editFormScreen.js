import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet, Text, ScrollView } from 'react-native';
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
        <ScrollView>
            <View style={styles.container}>
                <View style={styles.fieldContainer}>
                    <Text style={styles.label}>Имя пользователя:</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Введите имя пользователя"
                        value={form.userName}
                        onChangeText={(value) => setForm({ ...form, userName: value })}
                    />
                </View>
                <View style={styles.fieldContainer}>
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
                <View style={styles.fieldContainer}>
                    <Text style={styles.label}>Город:</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Введите город"
                        value={form.city}
                        onChangeText={(value) => setForm({ ...form, city: value })}
                    />
                </View>
                <View style={styles.fieldContainer}>
                    <Text style={styles.label}>Пол:</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Введите пол"
                        value={form.gender}
                        onChangeText={(value) => setForm({ ...form, gender: value })}
                    />
                </View>
                <View style={styles.fieldContainer}>
                    <Text style={styles.label}>Музыкальный инструмент:</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Введите музыкальный инструмент"
                        value={form.musicalInstrument}
                        onChangeText={(value) => setForm({ ...form, musicalInstrument: value })}
                    />
                </View>
                <View style={styles.fieldContainer}>
                    <Text style={styles.label}>Описание:</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Введите описание"
                        value={form.description}
                        onChangeText={(value) => setForm({ ...form, description: value })}
                    />
                </View>
                <View style={styles.fieldContainer}>
                    <Text style={styles.label}>Способ связи:</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Введите способ связи"
                        value={form.communication}
                        onChangeText={(value) => setForm({ ...form, communication: value })}
                    />
                </View>
                <Button title="Сохранить" onPress={handleSave} />
            </View >
        </ScrollView>
    );

}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    fieldContainer: {
        marginBottom: 16,
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        paddingVertical: 8,
        paddingHorizontal: 12,
        fontSize: 16,
        borderRadius: 8,
    },
    spacer: {
        height: 40,
    },
});

export default EditFormScreen;
