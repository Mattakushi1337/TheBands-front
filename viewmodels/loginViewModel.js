import UserService from '../services/userService';

class LoginViewModel {
    constructor() {
        this.userService = new UserService();
    }

    login = async (login, password) => {
        const result = await this.userService.login(login, password);
        return result;
    }
}

export default LoginViewModel;