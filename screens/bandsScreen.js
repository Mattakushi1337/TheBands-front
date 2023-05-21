import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { observer } from 'mobx-react';
import BandsViewModel from '../viewmodels/bandsViewModel';


const BandsScreen = observer(() => {
    const navigation = useNavigation();
    const [bandsViewModel] = useState(new BandsViewModel());

    useEffect(() => {
        bandsViewModel.getBands();
    }, []);

    const renderItem = ({ item }) => (
        <TouchableOpacity
            onPress={() => navigation.navigate('BandDetails', { band: item })}
            style={{ marginBottom: 20 }}
        >
            <Text>{`Name: ${item.bandName}`}</Text>
        </TouchableOpacity>
    );
    const renderCreateBandButton = () => {
        return (
            <Button
                title="Создать анкету группы"
                onPress={() => navigation.navigate('CreateBand')}
            />
        );
    };

    return (
        <View>
            {bandsViewModel.isLoading ? (
                <ActivityIndicator size="large" />
            ) : bandsViewModel.error ? (
                <Text style={{ color: 'red' }}>{bandsViewModel.error}</Text>
            ) : (
                <FlatList
                    data={bandsViewModel.bands}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id.toString()}
                />
            )}
            {renderCreateBandButton()}
        </View>
    );
});

export default BandsScreen