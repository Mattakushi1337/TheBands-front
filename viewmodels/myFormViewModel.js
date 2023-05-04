import axios from 'axios';

class MyFormViewModel {
    async getForm() {

        await axios.get('http://192.168.1.103:3000/form/form/myForm')
            .then(response => {
                console.log(response.data);
                setFormData(response.data);
            })
            .catch(error => {
                console.log(error);
            });

    }
}

export default MyFormViewModelr