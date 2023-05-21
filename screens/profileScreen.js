import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { observer } from 'mobx-react';
import ProfileViewModel from '../viewmodels/profileViewModel';
import LinearGradient from 'react-native-linear-gradient';

const profileViewModel = new ProfileViewModel();

const ProfileScreen = observer(() => {
    const navigation = useNavigation();

    useEffect(() => {
        profileViewModel.loadUser();
    }, []);

    return (
            <View style={styles.container}>
                <Text style={styles.title}>{`Имя пользователя: ${profileViewModel.user.userName}`}</Text>
                <Text style={styles.subtitle}>{`Логин: ${profileViewModel.user.login}`}</Text>
                <Button
                    title="Посмотреть свою анкету музыканта"
                    buttonStyle={styles.button}
                    onPress={() => navigation.navigate('MyForm')}
                />
                <Button
                    title="Посмотреть свою анкету группы"
                    buttonStyle={styles.button}
                    onPress={() => navigation.navigate('MyBand')}
                />
                <Button
                    title="Выйти из аккаунта"
                    buttonStyle={styles.logoutButton}
                    onPress={async () => {
                        const profileViewModel = new ProfileViewModel();
                        await profileViewModel.logout();
                        navigation.navigate('Login');
                    }}
                /> 
            </View>
    );
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    gradient: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10,
        color: '#fff',
    },
    subtitle: {
        fontSize: 18,
        textAlign: 'center',
        marginBottom: 20,
        color: '#fff',
    },
    button: {
        backgroundColor: '#7fc7ff',
        borderRadius: 15,
        marginBottom: 10,
    },
    logoutButton: {
        backgroundColor: '#2E3134',
        borderRadius: 10,
        marginTop: 10,
    },
});

export default ProfileScreen;
