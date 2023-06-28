import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet, TouchableOpacity, ImageBackground, Text, ScrollView, KeyboardAvoidingView } from 'react-native';
import BandsViewModel from '../viewmodels/bandsViewModel';


function EditBandScreen({ route, navigation }) {
    const { userID } = route.params;
    const { id } = route.params
    const [viewModel] = useState(new BandsViewModel());
    const [band, setBand] = useState({
        id: undefined,
        bandName: '',
        contact: '',
        description: '',
        userID,
    });

    useEffect(() => {
        navigation.setOptions({ title: 'Изменение анкеты группы' });
        async function fetchBand() {
            const bandData = await viewModel.getMyBand();
            console.log('ddd', bandData);
            if (bandData) {
                setBand(bandData[0]); // Используйте bandData[0] для обновления состояния band
            }
        }
        fetchBand();
    }, []);

    const handleSave = async () => {
        console.log("band: ", band);
        const result = await viewModel.updateBand(id, band);
        console.log("result", result);
        if (result) {
            navigation.replace('MyBand', { band });
        } else {
            console.log('Error updating band');
        }
    };

    return (
        <ImageBackground
            source={require('../pics/KdHNsSYlCKk.jpg')}
            style={styles.backgroundImage}
        >
            <KeyboardAvoidingView behavior="hight" style={styles.container}>
                <ScrollView>
                    <Text style={styles.label}>Название группы:</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Введите название группы"
                        value={band.bandName}
                        onChangeText={(value) => setBand({ ...band, bandName: value })}
                    />
                    <Text style={styles.label}>Описание:</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Напишите описание группы"
                        value={band.description}
                        onChangeText={(value) => setBand({ ...band, description: value })}
                    />
                    <Text style={styles.label}>Способ связи:</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Напишите как с вами связаться"
                        value={band.contact}
                        onChangeText={(value) => setBand({ ...band, contact: value })}
                    />
                    <TouchableOpacity style={styles.button} onPress={handleSave}>
                        <Text style={styles.buttonText}>Изменить анкету группы</Text>
                    </TouchableOpacity>
                </ScrollView>
            </KeyboardAvoidingView>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'transparent',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    input: {
        width: 300,
        height: 'auto',
        borderColor: '#42aaff',
        borderWidth: 2,
        borderRadius: 5,
        paddingHorizontal: 10,
        backgroundColor: 'white',
        marginBottom: 10,
    },
    button: {
        backgroundColor: 'white',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 100,
        alignItems: 'center',
        marginBottom: 20,
        borderWidth: 2,
        borderColor: '#1faee9'
    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
        backgroundAttachment: 'fixed',
    },
    label: {
        fontWeight: 'bold',
        marginBottom: 5,
        color: 'black'
    },
});

export default EditBandScreen;
