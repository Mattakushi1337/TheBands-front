import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import { Button } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { observer } from 'mobx-react';
import ProfileViewModel from '../viewmodels/profileViewModel';

const profileViewModel = new ProfileViewModel();

const ProfileScreen = observer(() => {
    const navigation = useNavigation();

    useEffect(() => {
        profileViewModel.loadUser();
    }, []);

    return (
        <View>
            <Text>{`Имя пользователя: ${profileViewModel.user.userName}`}</Text>
            <Text>{`Логин: ${profileViewModel.user.login}`}</Text>
            <Button title="Посмотреть свою анкету музыканта" onPress={() => navigation.navigate('MyForm')} />
            <Button title="Посмотреть свою анкету группы" onPress={() => navigation.navigate('MyBand')} />
            <Button title="Выйти из аккаунта" onPress={async () => {
                const profileViewModel = new ProfileViewModel();
                await profileViewModel.logout();
                navigation.navigate('Login')

            }} />
        </View>
    );
});

export default ProfileScreen;
