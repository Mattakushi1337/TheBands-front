import { makeAutoObservable, runInAction } from 'mobx';
import axios from 'axios';

class PeopleViewModel {
    hasForm = false;
    forms = [];
    isLoading = false;
    error = '';

    constructor() {
        makeAutoObservable(this);
    }

    async checkFormExists() {
        try {
            const response = await axios.get('http://192.168.1.103:3000/form/form/myForm');
            runInAction(() => {
                this.hasForm = response.data.hasForm;
            });
        } catch (error) {
            console.error(error);
        }
    }

    async getForms() {
        try {
            this.isLoading = true;
            const response = await axios.get('http://192.168.1.103:3000/form/form/all');
            runInAction(() => {
                this.forms = response.data;
            });
        } catch (error) {
            this.error = 'Failed to get forms';
            console.error(error);
        } finally {
            this.isLoading = false;
        }
    }
}

export default PeopleViewModel;
