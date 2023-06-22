import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TextInput,
    ScrollView,
    KeyboardAvoidingView,
    StyleSheet,
    TouchableOpacity,
    ImageBackground,
} from 'react-native';
import BandsViewModel from '../viewmodels/bandsViewModel';
import { useNavigation } from '@react-navigation/native';

const CreateBandScreen = () => {
    const [bandName, setBandName] = useState('');
    const [description, setDescription] = useState('');
    const [contact, setContact] = useState('');
    const [bandNameError, setBandNameError] = useState('');
    const [descriptionError, setDescriptionError] = useState('');
    const [contactError, setContactError] = useState('');

    const navigation = useNavigation();

    const handleSubmit = async () => {
        let valid = true;
        const bandsViewModel = new BandsViewModel();
        const formData = {
            bandName,
            description,
            contact
        };

        if (!bandName) {
            setBandName('');
            setBandNameError('Пожалуйста, введите название группы');
            valid = false;
        } else {
            setBandNameError(''); // Очистить ошибку, если поле не пустое
        }

        if (!description) {
            setDescription('');
            setDescriptionError('Пожалуйста, введите описание');
            valid = false;
        } else {
            setDescriptionError(''); // Очистить ошибку, если поле не пустое
        }

        if (!contact) {
            setContact('');
            setContactError('Пожалуйста, укажите, как с вами связаться');
            valid = false;
        } else {
            setContactError(''); // Очистить ошибку, если поле не пустое
        }

        if (valid) {
            // submit data to server or do other necessary actions
            console.log('Form submitted successfully');
            try {
                const data = await bandsViewModel.createBand(formData.bandName, formData.description, formData.contact);
                console.log(data);
                navigation.navigate('Band')
            } catch (error) {
                console.error(error);
            }
        }
    };

    useEffect(() => {
        navigation.setOptions({ title: 'Создание группы' });
    })

    return (
        <ImageBackground
            source={require('../pics/KdHNsSYlCKk.jpg')} // Укажите путь к вашему изображению
            style={styles.backgroundImage}
        >
           
            <KeyboardAvoidingView behavior="height" style={styles.container}>
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
                            placeholder="Расскажите о своей группе. Укажите с какого вы города и кого ищите."
                            autoCapitalize="none"
                            multiline
                        />
                        <Text style={styles.error}>{descriptionError}</Text>
                    </View>
                    <View>
                        <Text style={styles.label}>Как связаться</Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={setContact}
                            value={contact}
                            placeholder="Введите номер телефона или ссылку на вашу страницу в любой соц. сети"
                            autoCapitalize="none"
                            multiline
                        />
                        <Text style={styles.error}>{contactError}</Text>
                    </View>

                    <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                        <Text style={styles.buttonText}>Создать группу</Text>
                    </TouchableOpacity>
                </ScrollView>
            </KeyboardAvoidingView>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'transparent',
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 80
    },
    label: {
        fontWeight: 'bold',
        marginBottom: 5,
        color: 'black'
    },
    input: {
        width: 200,
        height: 'auto',
        borderColor: '#42aaff',
        borderWidth: 2,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 10,
        backgroundColor: 'white',

    },
    error: {
        color: 'red',
        marginBottom: 10,
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
    buttonText: {
        color: 'black',
        fontSize: 16,
        fontWeight: 'bold',
    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
    },
});


export default CreateBandScreen;
