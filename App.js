import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import RegisterScreen from './screens/registerScreen';
import LoginScreen from './screens/loginScreen';
import MainScreen from './screens/mainScreen';
import PeopleScreen from './screens/peopleScreen';
import ProfileScreen from './screens/profileScreen';
import BandsScreen from './screens/bandsScreen';
import CreateFormScreen from './screens/createFormScreen';


const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Main" component={MainScreen} />
        <Stack.Screen name="People" component={PeopleScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="Band" component={BandsScreen} />
        <Stack.Screen name="CreateForm" component={CreateFormScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}