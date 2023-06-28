import React, { Component, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
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
    };

    handleUpdate = async () => {
        const myFormViewModel = new MyFormViewModel();
        const { id } = this.state.form; 
        await myFormViewModel.updateForm(id, this.state.form); 
        this.props.navigation.navigate('EditForm', { userID: id });
    };

    home = async () => {
        this.props.navigation.navigate('Main');
    };

    render() {
        const { form } = this.state;
        if (!form || Object.keys(form).length === 0) {
            return (<ImageBackground
                source={require('../pics/KdHNsSYlCKk.jpg')}
                style={styles.backgroundImage}
            >
                <Text style={styles.emptyText}>У вас пока нет анкеты</Text>
            </ImageBackground>);
        }
        const { userName, age, city, gender, musicalInstrument, description, communication } = form;
        return (
            <ImageBackground
                source={require('../pics/KdHNsSYlCKk.jpg')}
                style={styles.backgroundImage}
            >
                <View style={styles.container}>
                    <Text style={styles.text}>{`Имя: ${userName}`}</Text>
                    <Text style={styles.text}>{`Возраст: ${age}`}</Text>
                    <Text style={styles.text}>{`Город: ${city}`}</Text>
                    <Text style={styles.text}>{`Пол: ${gender}`}</Text>
                    <Text style={styles.text}>{`Музыкальный инструмент: ${musicalInstrument}`}</Text>
                    <Text style={styles.text}>{`Описание: ${description}`}</Text>
                    <Text style={styles.text}>{`Способ связи: ${communication}`}</Text>
                    <TouchableOpacity style={styles.button} onPress={this.handleDelete}>
                        <Text style={styles.buttonText}>Удалить</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={this.handleUpdate}>
                        <Text style={styles.buttonText}>Изменить</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={this.home}>
                        <Text style={styles.buttonText}>Домой</Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    emptyText: {
        fontSize: 16,
        textAlign: 'center',
        marginTop: 20,

    },
    text: {
        fontSize: 16,
        marginBottom: 10,
    },
    button: {
        width: 300,
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 40,
        paddingVertical: 5,
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
        borderColor: '#1faee9',
        borderWidth: 2,
    },
    buttonText: {
        fontSize: 16,
        color: '#1faee9',
    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
    },
});

export default MyFormScreen;