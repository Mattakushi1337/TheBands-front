import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, fontFamily } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { observer } from 'mobx-react';
import ProfileViewModel from '../viewmodels/profileViewModel'

const profileViewModel = new ProfileViewModel();

const ProfileScreen = observer(() => {
    const navigation = useNavigation();
    const route = useRoute();
    useEffect(() => {
        profileViewModel.loadUser();
        if (route.name === 'Main') {
            // Скрываем кнопку в правом верхнем углу
            navigation.setOptions({
                headerRight: () => null,
            });
        }
    }, []);

    return (
        <ImageBackground
            source={require('../pics/WZ2bPLHmuW8.jpg')}
            style={styles.backgroundImage}
        >
            <View style={styles.container}>
                <Text style={[styles.title, { fontFamily: 'Roboto-Italic' }]}>
                    {`Имя пользователя: ${profileViewModel.user.userName}`}
                </Text>
                <Text style={styles.subtitle}>{`Логин: ${profileViewModel.user.login}`}</Text>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('MyForm')}>
                    <Text style={styles.buttonText}>Моя анкета музыканта</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('MyBand')}>
                    <Text style={styles.buttonText}>Моя анкета группы</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.logoutButton}
                    onPress={async () => {
                        const profileViewModel = new ProfileViewModel();
                        await profileViewModel.logout();
                        navigation.navigate('Login');
                    }}
                >
                    <Text style={styles.buttonLogoutText}>Выйти из аккаунта</Text>
                </TouchableOpacity>
            </View>
        </ImageBackground>
    );
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 16,
        marginBottom: 10,
    },
    button: {
        width: '80%',
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 40,
        paddingVertical: 5,
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
        borderColor: '#1faee9',
        borderWidth: 2,
    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
    },
    buttonLogoutText: {
        color: 'black',
        fontSize: 16,
    },
    logoutButton: {
        backgroundColor: 'white',
        paddingHorizontal: 20,
        paddingVertical: 5,
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
        borderWidth: 2,
        borderColor: '#1faee9'
    },
    headerRight: {
        display: 'none',
    },
});

export default ProfileScreen;
