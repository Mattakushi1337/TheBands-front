import { makeAutoObservable, runInAction } from 'mobx';
import axios from 'axios';

class BandsViewModel {
    isLoading = false;
    bands = [];
    error = '';

    constructor() {
        makeAutoObservable(this);
        this.error = '';
    }

    async getBands() {
        try {
            runInAction(() => {
                this.isLoading = true;
                this.error = '';
            });

            const response = await axios.get('http://192.168.1.106:3000/band');
            console.log(response.data);

            runInAction(() => {
                this.bands = response.data;
            });
        } catch (error) {
            runInAction(() => {
                this.error = 'Failed to get bands';
                console.error(error);
            });
        } finally {
            runInAction(() => {
                this.isLoading = false;
            });
        }
    }

    async createBand(bandName, description, contact) {
        try {
            const response = await axios.post('http://192.168.1.106:3000/band', {
                bandName: bandName,
                description: description,
                contact: contact
            });
            response.data;
        } catch (error) {
            console.error('Failed to create band:', error);
            throw error;
        }
    }
    async getMyBand() {
        try {
            this.isLoading = true;
            const response = await axios.get('http://192.168.1.106:3000/band/myBand');
            console.log("viewmodel", response.data);
            runInAction(() => {
                this.bands = response.data;
            });
            return response.data;
        } catch (error) {
            this.error = 'Failed to get bands';
            console.error(error);
        } finally {
            this.isLoading = false;
        }
    }

    async deleteBand(id) {
        try {
            await axios.delete(`http://192.168.1.106:3000/band/${id}`);
            return true;
        } catch (error) {
            console.error(error);
            return false;
        }
    }

    async updateBand(id, band) {
        try {
            const response = await axios.put(`http://192.168.1.106:3000/band/${id}`, band);
            console.log('ddas', response.data, id);
            return true;
        } catch (error) {
            console.error(error);
            return false;
        }
    }
}

export default BandsViewModel;