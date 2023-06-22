import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

import PeopleScreen from './peopleScreen';
import BandsScreen from './bandsScreen';
import ProfileScreen from './profileScreen';

import PeopleViewModel from '../viewmodels/peopleViewModel';
import BandsViewModel from '../viewmodels/bandsViewModel';
import ProfileViewModel from '../viewmodels/profileViewModel';

const MainScreen = () => {
  const [selectedTab, setSelectedTab] = useState('profile');
  const navigation = useNavigation();

  useEffect(() => {
    switch (selectedTab) {
      case 'people':
        navigation.setOptions({ title: 'Анкеты музыкантов' });
        break;
      case 'bands':
        navigation.setOptions({ title: 'Анкеты групп' });
        break;
      default:
        navigation.setOptions({ title: 'Профиль' });
    }
    navigation.setOptions({ headerLeft: null })
  }, [selectedTab]);

  const handleTabPress = (tabName) => {
    setSelectedTab(tabName);
  };

  const renderTab = () => {
    switch (selectedTab) {
      case 'people':
        return <PeopleScreen viewModel={new PeopleViewModel()} />;
      case 'bands':
        return <BandsScreen viewModel={new BandsViewModel()} />;
      default:
        return <ProfileScreen viewModel={new ProfileViewModel()} />;
    }
  };

  return (
    <View style={{ flex: 1 }}>
      {renderTab()}
      <View style={{
        position: 'absolute',
        bottom: 0,
        width: '100%',
        height: 50,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: 'white',
        borderTopWidth: 1,
        borderTopColor: '#ddd'
      }}>
        <TouchableOpacity onPress={() => handleTabPress('people')}>
          <Icon name='people' size={20} color={selectedTab === 'people' ? 'blue' : 'black'} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleTabPress('bands')}>
          <Icon name='musical-notes' size={20} color={selectedTab === 'bands' ? 'blue' : 'black'} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleTabPress('profile')}>
          <Icon name='person' size={20} color={selectedTab === 'profile' ? 'blue' : 'black'} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default MainScreen;
