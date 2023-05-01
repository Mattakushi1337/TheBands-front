import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Text, ActivityIndicator  } from 'react-native';
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
                navigation.navigate('Home');
            } else {
                setError('Неверный логин или пароль');
            }
        } catch (error) {
            setIsLoading(false);
            setError('Неверный логин или пароль');
        }
    };

    useEffect(() => {
        setError('');
    }, [login, password]);

    return (
        <View>
            <TextInput
                placeholder="Login"
                onChangeText={setLogin}
                value={login}
            />
            <TextInput
                placeholder="Password"
                onChangeText={setPassword}
                value={password}
                secureTextEntry={true}
            />
            {isLoading ? (
                <ActivityIndicator />
            ) : (
                <Button
                    title="Login"
                    onPress={handleLogin}
                />
            )}
            {error ? (
                <Text style={{ color: 'red' }}>Неверный логин или пароль</Text>
            ) : null}
        </View>
    );
};

export default LoginScreen;