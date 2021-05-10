import React from 'react';
import { View, StyleSheet, Text, Button } from 'react-native';
import { firebase } from '../config/Config';

const Settings = () => {
    const onFooterLinkPress = () => {
        firebase.auth().signOut();
    }
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Settings</Text>
            <Button
                onPress={onFooterLinkPress}
                title='SignOut move to login screen'
            />
        </View>
    );
};



const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',
    },
});

export default Settings;
