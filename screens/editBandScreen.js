import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import BandsViewModel from '../viewmodels/bandsViewModel';

function EditBandScreen({ route, navigation }) {
    const { userID } = route.params;
    const [viewModel] = useState(new BandsViewModel()); // Создаем экземпляр класса в состоянии

    const [band, setForm] = useState({
        bandName: '',
        description: '',
        userID,
    });

    useEffect(() => {
        navigation.setOptions({ title: 'Изменение анкеты группы' });
        async function fetchBand() {
            const bandData = await viewModel.getMyBand();
            if (bandData) {
                setForm({
                    bandName: bandData.bandName,
                    description: bandData.description,
                    userID,
                });
            }
        }
        fetchBand();
    }, []);

    const handleSave = async () => {
        console.log("band: ", band);
        const result = await viewModel.updateBand(band.id, band);
        if (result) {
            navigation.navigate('MyBand');
        } else {
            console.log('Error updating band');
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Название группы"
                value={band.bandName}
                onChangeText={(value) => setForm({ ...band, bandName: value })}
            />
            <TextInput
                style={styles.input}
                placeholder="Описание"
                value={band.description}
                onChangeText={(value) => setForm({ ...band, description: value })}
            />
            <Button title="Save" onPress={handleSave} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
        width: '80%', // Или другое значение для равных размеров
        height: 40,
        borderWidth: 1,
        borderColor: 'gray',
        marginBottom: 10,
        paddingHorizontal: 10,
        borderRadius: 8,
    },
});

export default EditBandScreen;
