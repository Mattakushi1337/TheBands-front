import UserService from '../services/userService';

class RegisterViewModel {
    constructor() {
        this.userService = new UserService();
    }

    register = async (login, password, userName) => {
        const result = await this.userService.register(login, password, userName);
        return result;
    }

    checkIfLoginTaken = async (login) => {
        try {
            const response = await fetch(`http://192.168.1.239:3000/auth/checklogin?login=${login}`);
            const data = await response.json();
            return data.isTaken;
        } catch (error) {
            console.error(error);
        }
    }
}

export default RegisterViewModel;
