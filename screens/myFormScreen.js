import React, { Component } from 'react';
import { View, Text } from 'react-native';
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
        this.setState({ form });
    }

    render() {
        return (
            <View>
                <Text>{`UserName: ${this.state.form.userName}`}</Text>
                <Text>{`Age: ${this.state.form.age}`}</Text>
                <Text>{`City: ${this.state.form.city}`}</Text>
                <Text>{`Gender: ${this.state.form.gender}`}</Text>
                <Text>{`Musical Instrument: ${this.state.form.musicalInstrument}`}</Text>
                <Text>{`Description: ${this.state.form.description}`}</Text>
                <Text>{`Communication: ${this.state.form.communication}`}</Text>
            </View>
        );
    }
}

export default MyFormScreen;