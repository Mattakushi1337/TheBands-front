import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    ScrollView,
    Button,
    KeyboardAvoidingView,
    StyleSheet,
} from 'react-native';
import CreateFormViewModel from '../viewmodels/createFormViewModel';

const CreateProfileScreen = () => {
    const [userName, setUserName] = useState('');
    const [age, setAge] = useState('');
    const [city, setCity] = useState('');
    const [gender, setGender] = useState('');
    const [musicalInstrument, setMusicalInstrument] = useState('');
    const [description, setDescription] = useState('');
    const [communication, setCommunication] = useState('');

    const [nameError, setNameError] = useState('');
    const [ageError, setAgeError] = useState('');
    const [cityError, setCityError] = useState('');
    const [genderError, setGenderError] = useState('');
    const [instrumentError, setInstrumentError] = useState('');
    const [descriptionError, setDescriptionError] = useState('');
    const [communicationError, setCommunicationError] = useState('');

    const handleSubmit = async () => {
        let valid = true;
        const createFormViewModel = new CreateFormViewModel();
        const formData = {
            userName,
            age,
            city,
            gender,
            musicalInstrument,
            description,
            communication,
          };

        if (!userName) {
            setUserName('');
            setNameError('Пожалуйста, введите своё имя');
            valid = false;
        } else {
            setNameError('');
        }

        if (!age) {
            setAge('');
            setAgeError('Пожалуйста, введите свой возраст');
            valid = false;
        } else {
            setAgeError('');
        }

        if (!city) {
            setCity('');
            setCityError('Пожалуйста, введите свой город');
            valid = false;
        } else {
            setCityError('');
        }

        if (!gender) {
            setGender('');
            setGenderError('Пожалуйста, введите свой пол');
            valid = false;
        } else {
            setGenderError('');
        }

        if (!musicalInstrument) {
            setMusicalInstrument('');
            setInstrumentError('Пожалуйста, введите свой музыкальный инструмент');
            valid = false;
        } else {
            setInstrumentError('');
        }

        if (!description) {
            setDescription('');
            setDescriptionError('Пожалуйста, введите описание');
            valid = false;
        } else {
            setDescriptionError('');
        }

        if (!communication) {
            setCommunication('');
            setCommunicationError('Пожалуйста, введите свой способ связи');
            valid = false;
        } else {
            setCommunicationError('');
        }

        if (valid) {
            // submit data to server or do other necessary actions
            console.log('Form submitted successfully');
        }
        try {
            const data = await createFormViewModel.createForm(formData);
            console.log(data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
            <ScrollView>
                <View>
                    <Text style={styles.label}>Имя</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={setUserName}
                        value={userName}
                        placeholder="Введите своё имя"
                        autoCapitalize="none"
                    />
                    <Text style={styles.error}>{nameError}</Text>
                </View>

                <View>
                    <Text style={styles.label}>Возраст</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={setAge}
                        value={age}
                        placeholder="Введите свой возраст"
                        keyboardType="numeric"
                    />
                    <Text style={styles.error}>{ageError}</Text>
                </View>
                <View>
                    <Text style={styles.label}>Город</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={setCity}
                        value={city}
                        placeholder="Введите свой город"
                        autoCapitalize="none"
                    />
                    <Text style={styles.error}>{cityError}</Text>
                </View>

                <View>
                    <Text style={styles.label}>Пол</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={setGender}
                        value={gender}
                        placeholder="Введите свой пол"
                        autoCapitalize="none"
                    />
                    <Text style={styles.error}>{genderError}</Text>
                </View>

                <View>
                    <Text style={styles.label}>Музыкальный инструмент</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={setMusicalInstrument}
                        value={musicalInstrument}
                        placeholder="Введите свой музыкальный инструмент"
                        autoCapitalize="none"
                    />
                    <Text style={styles.error}>{instrumentError}</Text>
                </View>

                <View>
                    <Text style={styles.label}>Описание</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={setDescription}
                        value={description}
                        placeholder="Введите описание"
                        autoCapitalize="none"
                        multiline
                    />
                    <Text style={styles.error}>{descriptionError}</Text>
                </View>

                <View>
                    <Text style={styles.label}>Способ связи</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={setCommunication}
                        value={communication}
                        placeholder="Введите свой способ связи"
                        autoCapitalize="none"
                    />
                    <Text style={styles.error}>{communicationError}</Text>
                </View>

                <Button title="Создать профиль" onPress={handleSubmit} />
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    label: {
        fontWeight: 'bold',
        marginBottom: 5,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginBottom: 20,
        borderRadius: 5,
    },
    error: {
        color: 'red',
        marginBottom: 10,
    },
});

export default CreateProfileScreen;