import { makeAutoObservable, runInAction } from 'mobx';
import axios from 'axios';

class ProfileViewModel {
    user = {};

    constructor() {
        makeAutoObservable(this);
    }

    async loadUser() {
        try {
            const response = await axios.get('http://192.168.1.103:3000/auth/user');
            runInAction(() => {
                this.user = response.data;
            });
        } catch (error) {
            console.error(error);
        }
    }

    async logout() {
        try {
            await axios.post('http://192.168.1.103:3000/auth/logout');
            runInAction(() => {
                this.user = {};
            });
        } catch (error) {
            console.error(error);
        }
    }
}

export default ProfileViewModel;