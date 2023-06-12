import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
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
        <View style={styles.container}>
            <TextInput
                placeholder="Логин"
                style={styles.input}
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
                placeholder="Пароль"
                style={styles.input}
                onChangeText={setPassword}
                value={password}
                secureTextEntry={true}
            />
            {!isPasswordValid && (
                <Text style={{ color: 'red' }}>Поле должно содержать минимум 3 символа</Text>
            )}
            <TextInput
                style={styles.input}
                placeholder="Имя"
                keyboardType="default"
                onChangeText={text => setUserName(text.replace(/\d/g, ''))}
                value={userName}
            />
            {!isUserNameValid && (
                <Text style={{ color: 'red' }}>Поле должно содержать минимум 3 символа</Text>
            )}
            <Button
                buttonStyle={styles.button}
                title="Зарегистрироваться"
                onPress={handleRegister}
            />

            <Text style={{ marginTop: 10 }}>
                Уже есть аккаунт?{' '}
                <Text style={{ color: 'blue' }} onPress={handleLoginPress}>
                    Войти
                </Text>
            </Text>
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
});


export default RegisterScreen;
