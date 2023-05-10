import React, { useState, useEffect } from 'react';
import { View, TextInput, Button } from 'react-native';
import BandsViewModel from '../viewmodels/bandsViewModel';

function EditBandScreen({ route, navigation }) {
    const { userID } = route.params;
    const [viewModel] = useState(new BandsViewModel()); // Создаем экземпляр класса в состоянии

    const [band, setForm] = useState({
        bandName: '',
        description: '',
        userID
    });

    useEffect(() => {
        async function fetchBand() {
            console.log("dd");
            const band = await viewModel.getMyBand();
            console.log('form from fetchForm:', band);
            setForm({ ...band[0], bandName: band.bandName, description: band.description });

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
        <View>
            <TextInput
                placeholder="Band Name"
                value={band.bandName}
                onChangeText={(value) => setForm({ ...band, bandName: value })}
            />
            <TextInput
                placeholder="Description"
                value={band.description}
                onChangeText={(value) => setForm({ ...band, description: value })}
            />
            <Button title="Save" onPress={handleSave} />
        </View>
    );
}

export default EditBandScreen;
