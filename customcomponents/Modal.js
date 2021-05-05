import React from 'react';
import { Modal, Text, Button, StyleSheet, View } from 'react-native';

export default () => {
    const [isOpen, setIsOpen] = React.useState(true);
    return (
        <Modal
            visible={isOpen}
            backdropStyle={styles.backdrop}
            onBackdropPress={() => setVisible(false)}>
            <View style={styles.container}>
                <Text>My awesome alert</Text>
                <Button title='DISMISS' onPress={() => setIsOpen(false)} style={styles.button} />
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
        justifyContent: 'center',
        alignContent: 'center'
    },
    backdrop: {
        backgroundColor: 'rgba(0, 0, 0, 0.2)'
    },
    button: {
        marginTop: 16
    }
});