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
import FormDetailsScreen from './screens/formDetailsScreen';
import MyFormScreen from './screens/myFormScreen';
import EditFormScreen from './screens/editFormScreen';
import CreateBandScreen from './screens/createBandScreen';
import BandDetailsScreen from './screens/bandDetailsScreen';
import MyBandScreen from './screens/myBandScreen';
import EditBandScreen from './screens/editBandScreen';


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
        <Stack.Screen name="FormDetails" component={FormDetailsScreen} />
        <Stack.Screen name="MyForm" component={MyFormScreen} />
        <Stack.Screen name="EditForm" component={EditFormScreen} />
        <Stack.Screen name="CreateBand" component={CreateBandScreen} />
        <Stack.Screen name="BandDetails" component={BandDetailsScreen} />
        <Stack.Screen name="MyBand" component={MyBandScreen} />
        <Stack.Screen name="EditBand" component={EditBandScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}