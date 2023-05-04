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
            <Button title="Выйти из аккаунта" onPress={async () => await profileViewModel.logout()} />
            <Button title="Посмотреть свою анкету музыканта" onPress={() => navigation.navigate('MyForm')} />
        </View>
    );
});

export default ProfileScreen;
