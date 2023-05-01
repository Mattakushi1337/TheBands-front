import React, { useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
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
        <View>
            <TextInput
                placeholder="Login"
                onChangeText={setLogin}
                value={login}
            />
            {!isLoginValid && (
                <Text style={{ color: 'red' }}>Поле должно содержать минимум 3 символа</Text>
            )}
            {isLoginTaken && (
                <Text style={{ color: 'red' }}>
                    Логин уже занят, выберите другой
                </Text>
            )}
            <TextInput
                placeholder="Password"
                onChangeText={setPassword}
                value={password}
                secureTextEntry={true}
            />
            {!isPasswordValid && (
                <Text style={{ color: 'red' }}>Поле должно содержать минимум 3 символа</Text>
            )}
            <TextInput
                placeholder="User Name"
                onChangeText={setUserName}
                value={userName}
            />
            {!isUserNameValid && (
                <Text style={{ color: 'red' }}>Поле должно содержать минимум 3 символа</Text>
            )}
            <Button title="Register" onPress={handleRegister} />
            <Text style={{ marginTop: 10 }}>
                Уже есть аккаунт?{' '}
                <Text style={{ color: 'blue' }} onPress={handleLoginPress}>
                    Войти
                </Text>
            </Text>
        </View>
    );
};

export default RegisterScreen;
