import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Text, ActivityIndicator, StyleSheet } from 'react-native';
import LoginViewModel from '../viewmodels/loginViewModel';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
        <View style={styles.container}>
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
                <Button
                    title="Войти"
                    onPress={handleLogin}
                    style={styles.button}
                />
            )}
            {error ? (
                <Text style={styles.errorText}>Неверный логин или пароль</Text>
            ) : null}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        backgroundColor: '#FFFFFF',
        borderRadius: 15,
        marginBottom: 10,
    },
    input: {
        backgroundColor: '#FFFFFF',
        padding: 1,
        marginBottom: 5,
        borderRadius: 10,
        width: 300,
    },
    errorText: {
        color: 'red',
    },
});

export default LoginScreen;