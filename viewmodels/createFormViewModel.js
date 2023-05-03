import AsyncStorage from '@react-native-async-storage/async-storage';

class CreateFormViewModel {
    async createForm(formData) {
        try {
            console.log('Request body:', JSON.stringify(formData)); // добавить логирование
            const token = await AsyncStorage.getItem('access_token');
            const response = await fetch('http://192.168.1.103:3000/form', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(formData),
            });
            const data = await response.json();
            return data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}

export default CreateFormViewModel;
