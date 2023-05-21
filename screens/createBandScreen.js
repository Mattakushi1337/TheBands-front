import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TextInput,
    ScrollView,
    Button,
    KeyboardAvoidingView,
    StyleSheet,
} from 'react-native';
import BandsViewModel from '../viewmodels/bandsViewModel';
import { useNavigation } from '@react-navigation/native';

const CreateBandScreen = () => {
    const [bandName, setBandName] = useState('');
    const [description, setDescription] = useState('');

    const [bandNameError, setBandNameError] = useState('');
    const [descriptionError, setDescriptionError] = useState('');


    const navigation = useNavigation();

    useEffect(() => {
        {
            navigation.setOptions({ title: 'Создать анкету группы' });
        }
    },);
    const handleSubmit = async () => {
        let valid = true;
        const bandsViewModel = new BandsViewModel();
        const formData = {
            bandName,
            description,
        };

        if (!bandName) {
            setBandName('');
            setBandNameError('Пожалуйста, введите название группы');
            valid = false;
        } else {
            setBandNameError('');
        }

        if (!description) {
            setDescription('');
            setDescriptionError('Пожалуйста, введите описание');
            valid = false;
        } else {
            setDescriptionError('');
        }

        if (valid) {
            // submit data to server or do other necessary actions
            console.log('Form submitted successfully');
        }
        try {
            const data = await bandsViewModel.createBand(formData.bandName, formData.description);
            console.log(data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
            <ScrollView>
                <View>
                    <Text style={styles.label}>Название группы</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={setBandName}
                        value={bandName}
                        placeholder="Введите название группы"
                        autoCapitalize="none"
                    />
                    <Text style={styles.error}>{bandNameError}</Text>
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

                <Button title="Создать группу" onPress={handleSubmit} />
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

export default CreateBandScreen;
