import axios from 'axios';

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

            return response.data;
        } catch (error) {
            console.error(error);
        }
    };
}

export default UserService;