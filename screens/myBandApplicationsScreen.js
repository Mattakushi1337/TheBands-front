import React, { Component } from 'react';
import { View, Text, Button, FlatList, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import ApplicationViewModel from '../viewmodels/applicationViewModel';

class MyBandApplicationsScreen extends Component {
    constructor(props) {
        super(props);
        this.props.navigation.setOptions({ title: 'Заявки' });
        this.state = {
            applications: [],
        };
    }

    async componentDidMount() {
        const bandId = this.props.route.params.bandId;
        const applications = await new ApplicationViewModel().getApplications(bandId);
        this.setState({ applications });
    }

    handleApprove = async (applicationId, role) => {
        await new ApplicationViewModel().approveApplication(applicationId, role);
        const bandId = this.props.route.params.bandId;
        const applications = await new ApplicationViewModel().getApplications(bandId);
        this.setState({ applications });
    };

    handleReject = async (applicationId, role) => {
        await new ApplicationViewModel().rejectApplication(applicationId, role);
        const bandId = this.props.route.params.bandId;
        const applications = await new ApplicationViewModel().getApplications(bandId);
        this.setState({ applications });
    };

    renderItem = ({ item }) => {
        return (

            <View style={styles.itemContainer}>
                <View style={styles.textContainer}>
                    <Text style={styles.userName}>Имя: {item.user.userName}</Text>
                    <Text style={styles.role}>Роль: {item.role}</Text>
                </View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={styles.buttonAccept}
                        onPress={() => this.handleApprove(item.id, item.role)}
                    >
                        <Text style={styles.buttonText}>Принять</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.buttonReject}
                        onPress={() => this.handleReject(item.id, item.role)}
                    >
                        <Text style={styles.buttonText}>Отклонить</Text>
                    </TouchableOpacity>
                </View>
            </View>

        );
    };

    render() {
        return (
            <ImageBackground
                source={require('../pics/KdHNsSYlCKk.jpg')}
                style={styles.backgroundImage}
            >
                <FlatList
                    data={this.state.applications}
                    renderItem={this.renderItem}
                    keyExtractor={(item) => item.id.toString()}
                />
            </ImageBackground>
        );
    }
}
const styles = StyleSheet.create({
    itemContainer: {
        flexDirection: 'column',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        flex: 1,
    },
    textContainer: {
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    userName: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    role: {
        fontSize: 16,
    },
    buttonAccept: {
        backgroundColor: 'white',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 100,
        alignItems: 'center',
        marginBottom: 8,
        borderWidth: 2,
        borderColor: '#1faee9'
    },
    buttonReject: {
        backgroundColor: 'white',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 100,
        alignItems: 'center',
        marginBottom: 8,
        borderWidth: 2,
        borderColor: '#ff033e'
    },
    buttonText: {
        color: 'black',
        fontSize: 16,
        fontWeight: 'bold',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
    },
});


export default MyBandApplicationsScreen;