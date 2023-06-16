import axios from 'axios';

class MyFormViewModel {
    async getForm() {
        try {
            const response = await axios.get('http://192.168.1.239:3000/form/form/myForm');
            console.log(response.data);
            const formData = response.data[0]; // Достаем первый объект из массива
            return formData;
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    async deleteForm(id) {
        try {
            await axios.delete(`http://192.168.1.239:3000/form/${id}`);
            return true;
        } catch (error) {
            console.error(error);
            return false;
        }
    }

    async updateForm(id, form) {
        try {
            await axios.put(`http://192.168.1.239:3000/form/${id}`, form);
            return true;
        } catch (error) {
            console.error(error);
            return false;
        }
    }


}

export default MyFormViewModel;
