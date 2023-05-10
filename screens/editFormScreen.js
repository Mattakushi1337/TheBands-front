import React, { useState, useEffect } from 'react';
import { View, TextInput, Button } from 'react-native';
import MyFormViewModel from '../viewmodels/myFormViewModel';

function EditFormScreen({ route, navigation }) {
    const { userID } = route.params;
    const [form, setForm] = useState({
        userName: '',
        age: '',
        city: '',
        gender: '',
        musicalInstrument: '',
        description: '',
        communication: '',
        userID
    });

    useEffect(() => {
        async function fetchForm() {
            const form = await new MyFormViewModel().getForm();
            console.log('form from fetchForm:', form);
            setForm({ ...form });
        }
        fetchForm();
    }, []);

    const handleSave = async () => {
        console.log("form: ", form);
        if (!isNaN(form.age)) {
            await new MyFormViewModel().updateForm(form.id, form);
            navigation.navigate('MyForm');
        } else {
            console.log("Age is not a number.");
        }
    };

    return (
        <View>
            <TextInput
                placeholder="User Name"
                value={form.userName}
                onChangeText={(value) => setForm({ ...form, userName: value })}
            />
            <TextInput
                placeholder="Age"
                value={form.age.toString()}
                onChangeText={(value) => {
                    const age = parseInt(value);
                    if (!isNaN(age)) {
                        setForm({ ...form, age });
                    }
                }}
            />
            <TextInput
                placeholder="City"
                value={form.city}
                onChangeText={(value) => setForm({ ...form, city: value })}
            />
            <TextInput
                placeholder="Gender"
                value={form.gender}
                onChangeText={(value) => setForm({ ...form, gender: value })}
            />
            <TextInput
                placeholder="Musical Instrument"
                value={form.musicalInstrument}
                onChangeText={(value) => setForm({ ...form, musicalInstrument: value })}
            />
            <TextInput
                placeholder="Description"
                value={form.description}
                onChangeText={(value) => setForm({ ...form, description: value })}
            />
            <TextInput
                placeholder="Communication"
                value={form.communication}
                onChangeText={(value) => setForm({ ...form, communication: value })}
            />
            <Button title="Save" onPress={handleSave} />
        </View>
    );
}

export default EditFormScreen;
