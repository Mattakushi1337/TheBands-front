import { makeAutoObservable } from 'mobx';
import axios from 'axios';

class BandsViewModel {
    bands = [];
    isLoading = false;
    error = '';

    constructor() {
        makeAutoObservable(this);
    }

    async getBands() {
        try {
            this.isLoading = true;
            const response = await axios.get('http://192.168.1.103:3000/band');
            runInAction(() => {
                this.bands = response.data;
            });
        } catch (error) {
            this.error = 'Failed to get bands';
            console.error(error);
        } finally {
            this.isLoading = false;
        }
    }
}

export default BandsViewModel;