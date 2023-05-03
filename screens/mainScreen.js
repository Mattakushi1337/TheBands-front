import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import PeopleScreen from './peopleScreen';
import BandsScreen from './bandsScreen';
import ProfileScreen from './profileScreen';

import PeopleViewModel from '../viewmodels/peopleViewModel';
import BandsViewModel from '../viewmodels/bandsViewModel';
import ProfileViewModel from '../viewmodels/profileViewModel';

const MainScreen = () => {
  const [selectedTab, setSelectedTab] = useState('profile');
  const navigation = useNavigation();

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
      <View style={{ flexDirection: 'row', justifyContent: 'space-around', paddingVertical: 10 }}>
        <TouchableOpacity onPress={() => handleTabPress('people')}>
          <Text style={{ color: selectedTab === 'people' ? 'red' : 'black' }}>Анкеты людей</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleTabPress('bands')}>
          <Text style={{ color: selectedTab === 'bands' ? 'red' : 'black' }}>Анкеты групп</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleTabPress('profile')}>
          <Text style={{ color: selectedTab === 'profile' ? 'red' : 'black' }}>Профиль</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default MainScreen;