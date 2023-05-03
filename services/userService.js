import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
const BASE_URL = 'http://192.168.1.103:3000/auth';

class UserService {
    register = async (login, password, userName) => {
        try {
            const response = await axios.post(`${BASE_URL}/register`, {
                login,
                password,
                userName,
            });
            console.log(response.data);
            return response.data;
        } catch (error) {
            console.error(error);
        }
    };

    login = async (login, password) => {
        try {
            const response = await axios.post(`${BASE_URL}/login`, {
                login,
                password,
            });
            console.log(response.data);
            console.log(response.data.user.access_token);
            await AsyncStorage.setItem('access_token', response.data.user.access_token);
            return response.data;
        } catch (error) {
            console.error(error);
        }
    };
}

export default UserService;