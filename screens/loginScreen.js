import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Text, ActivityIndicator, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import LoginViewModel from '../viewmodels/loginViewModel';

const LoginScreen = ({ navigation }) => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const viewModel = new LoginViewModel();

    const handleLogin = async () => {
        setIsLoading(true);
        try {
            const result = await viewModel.login(login, password);
            setIsLoading(false);
            if (result && result.success) {
                console.log('Login successful! Navigating to MainScreen...');
                navigation.navigate('Main');
            } else {
                setError('Неверный логин или пароль');
            }
        } catch (error) {
            setIsLoading(false);
            setError('Неверный логин или пароль');
        }
    };

    useEffect(() => {
        navigation.setOptions({ title: 'Авторизация' });
        setError('');
    }, [login, password]);

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
                <TextInput
                    placeholder="Пароль"
                    style={styles.input}
                    onChangeText={setPassword}
                    value={password}
                    secureTextEntry={true}
                />
                {isLoading ? (
                    <ActivityIndicator />
                ) : (
                    <TouchableOpacity style={styles.button} onPress={handleLogin}>
                        <Text style={styles.buttonText}>Войти</Text>
                    </TouchableOpacity>
                )}
                {error ? (
                    <Text style={styles.errorText}>Неверный логин или пароль</Text>
                ) : null}
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
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
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
    },
    welcomeText: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#FFFFFF',
        marginTop: -80,
    },
});

export default LoginScreen;