import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import RegisterViewModel from '../viewmodels/registerViewModel';
import { useNavigation } from '@react-navigation/native';



const RegisterScreen = () => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [userName, setUserName] = useState('');
    const [isLoginValid, setIsLoginValid] = useState(true);
    const [isPasswordValid, setIsPasswordValid] = useState(true);
    const [isUserNameValid, setIsUserNameValid] = useState(true);
    const [isLoginTaken, setIsLoginTaken] = useState(false);

    const viewModel = new RegisterViewModel();
    const navigation = useNavigation();
    useEffect(() => {
        {
            navigation.setOptions({ title: 'Регистрация' });
        }

    },);
    const handleRegister = async () => {
        if (login.length < 3) {
            setIsLoginValid(false);
            return;
        } else {
            setIsLoginValid(true);
        }

        if (password.length < 3) {
            setIsPasswordValid(false);
            return;
        } else {
            setIsPasswordValid(true);
        }

        if (userName.length < 3) {
            setIsUserNameValid(false);
            return;
        } else {
            setIsUserNameValid(true);
        }

        const isTaken = await viewModel.checkIfLoginTaken(login);
        if (isTaken) {
            setIsLoginTaken(true);
            return;
        }

        const result = await viewModel.register(login, password, userName);
        if (result.success) {
            navigation.navigate('Login');
        }

    };

    const handleLoginPress = () => {
        navigation.navigate('Login');
    }

    return (
        <ImageBackground
            source={require('../pics/_zrN0dCoYZY.jpg')}
            style={styles.backgroundImage}
        >
            <View style={styles.container}>
                <Text style={styles.welcomeText}>Добро пожаловать в приложение The Bands!</Text>
                <TextInput
                    placeholder="Логин"
                    style={styles.input}
                    onChangeText={setLogin}
                    value={login}
                />
                {!isLoginValid && (
                    <Text style={styles.errorText}>Поле должно содержать минимум 3 символа</Text>
                )}
                {isLoginTaken && (
                    <Text style={styles.errorText}>Логин уже занят, выберите другой</Text>
                )}
                <TextInput
                    placeholder="Пароль"
                    style={styles.input}
                    onChangeText={setPassword}
                    value={password}
                    secureTextEntry={true}
                />
                {!isPasswordValid && (
                    <Text style={styles.errorText}>Поле должно содержать минимум 3 символа</Text>
                )}
                <TextInput
                    style={styles.input}
                    placeholder="Имя"
                    keyboardType="default"
                    onChangeText={text => setUserName(text.replace(/\d/g, ''))}
                    value={userName}
                />
                {!isUserNameValid && (
                    <Text style={styles.errorText}>Поле должно содержать минимум 3 символа</Text>
                )}
                <TouchableOpacity style={styles.button} onPress={handleRegister}>
                    <Text style={styles.buttonText}>Зарегистрироваться</Text>
                </TouchableOpacity>
                <Text style={{ marginTop: 10 }}>
                    Уже есть аккаунт?{' '}
                    <Text style={styles.linkText} onPress={handleLoginPress}>
                        Войти
                    </Text>
                </Text>
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
    welcomeText: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#FFFFFF'
    },
    input: {
        width: '80%',
        height: 40,
        borderColor: '#42aaff',
        borderWidth: 2,
        borderRadius: 100,
        paddingHorizontal: 10,
        marginBottom: 10,
        backgroundColor: 'white'
    },
    errorText: {
        color: 'red',
        marginBottom: 10,
    },
    button: {
        width: '80%',
        backgroundColor: '#004296',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    captionText: {
        marginTop: 10,
        color: '#82898F',
    },
    linkText: {
        color: '#004296',
    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
    },
});



export default RegisterScreen;
