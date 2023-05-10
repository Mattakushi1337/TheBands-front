import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
import MyFormViewModel from '../viewmodels/myFormViewModel';

class MyFormScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            form: {},
        };
    }

    async componentDidMount() {
        const form = await new MyFormViewModel().getForm();
        console.log("formScreen: ", form);
        this.setState({ form: form });
    }

    handleDelete = async () => {
        const myFormViewModel = new MyFormViewModel();
        await myFormViewModel.deleteForm(this.state.form.id);
        this.props.navigation.navigate('Profile');
    }

    handleUpdate = async () => {
        const myFormViewModel = new MyFormViewModel();
        const { id } = this.state.form; // Получаем значение id из состояния формы
        await myFormViewModel.updateForm(id, this.state.form); // Передаем id вместе с формой
        this.props.navigation.navigate('EditForm', { userID: id });
    };

    render() {
        const { userName, age, city, gender, musicalInstrument, description, communication } = this.state.form;
        return (
            <View>
                <Text>{`UserName: ${userName}`}</Text>
                <Text>{`Age: ${age}`}</Text>
                <Text>{`City: ${city}`}</Text>
                <Text>{`Gender: ${gender}`}</Text>
                <Text>{`Musical Instrument: ${musicalInstrument}`}</Text>
                <Text>{`Description: ${description}`}</Text>
                <Text>{`Communication: ${communication}`}</Text>
                <Button title="Delete" onPress={this.handleDelete} />
                <Button title="Update" onPress={this.handleUpdate} />
            </View>
        );
    }
}

export default MyFormScreen;
