import React, { useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import { Button } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { observer } from 'mobx-react';
import BandsViewModel from '../viewmodels/bandsViewModel';

const BandsScreen = observer(() => {
    const navigation = useNavigation();
    const { bands, isLoading, error, getBands } = new BandsViewModel();

    useEffect(() => {
        getBands();
    }, []);

    const renderItem = ({ item }) => (
        <View style={{ marginBottom: 20 }}>
            <Text>{`Name: ${item.bandName}`}</Text>
            <Text>{`Description: ${item.description}`}</Text>
        </View>
    );

    const renderCreateBandButton = () => {
        return (
            <Button
                title="Create Band"
                onPress={() => navigation.navigate('CreateBand')}
            />
        );
    };

    return (
        <View>
            {isLoading ? (
                <ActivityIndicator size="large" />
            ) : error ? (
                <Text style={{ color: 'red' }}>{error}</Text>
            ) : (
                <FlatList
                    data={bands}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id.toString()}
                />
            )}
            {renderCreateBandButton()}
        </View>
    );
});

export default BandsScreen;