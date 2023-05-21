import React, { Component, useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import MyFormViewModel from '../viewmodels/myFormViewModel';
import { useNavigation } from '@react-navigation/native';





class MyFormScreen extends React.Component {
    constructor(props) {
        super(props);
        this.props.navigation.setOptions({ title: 'Моя анкета музыканта' });
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
        const { form } = this.state;
        if (!form || Object.keys(form).length === 0) {
            return <Text>У вас пока нет анкеты</Text>;
        }
        const { userName, age, city, gender, musicalInstrument, description, communication } = form;
        return (
            <View>
                <Text>{`Имя: ${userName}`}</Text>
                <Text>{`Возраст: ${age}`}</Text>
                <Text>{`Город: ${city}`}</Text>
                <Text>{`Пол: ${gender}`}</Text>
                <Text>{`Музыкальный инструмент: ${musicalInstrument}`}</Text>
                <Text>{`Описание: ${description}`}</Text>
                <Text>{`Способ связи: ${communication}`}</Text>
                <Button title="Удалить" onPress={this.handleDelete} />
                <Button title="Изменить" onPress={this.handleUpdate} />
            </View>
        );
    }
}

export default MyFormScreen;
