import React, { useContext, useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    StyleSheet,
} from 'react-native';
import FormInput from '../customcomponents/FormInput';
import FormButton from '../customcomponents/FormButton';
import { windowHeight, windowWidth } from '../customcomponents/Dimentions';
import { firebase } from '../config/Config';

const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const onSignUpLink = () => {
        navigation.navigate('SignUp');
    }

    const onLoginPress = async () => {
        firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then((response) => {
                const uid = response.user.uid
                const usersRef = firebase.firestore().collection('users')
                usersRef
                    .doc(uid)
                    .get()
                    .then(firestoreDocument => {
                        if (!firestoreDocument.exists) {
                            alert("User does not exist anymore.")
                            return;
                        }
                        const user = firestoreDocument.data()
                        
                    })
                    .catch(error => {
                        alert(error)
                    });
            })
            .catch(error => {
                alert(error)
            })
    }

    return (
        <View style={styles.container}>

            <Image
                source={require('../assets/arkus-logo.png')}
                style={styles.logo}
            />

            <Text style={styles.text}>Challenge App RN</Text>
            <FormInput
                labelValue={email}
                onChangeText={(text) => setEmail(text)}
                placeholderText="Email"
                iconType="user"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                underlineColorAndroid="transparent"
            />

            <FormInput
                labelValue={password}
                onChangeText={(pass) => setPassword(pass)}
                placeholderText="Password"
                autoCapitalize="none"
                iconType="lock"
                secureTextEntry={true}
                underlineColorAndroid="transparent"
            />

            <View style={styles.samerow}>

                <FormButton
                    buttonTitle="Sign Up"
                    onPress={onSignUpLink}
                />

                <FormButton
                    buttonTitle="Sign In"
                    onPress={onLoginPress}
                />
            </View>
        </View>
    );
};

export default LoginScreen;

const styles = StyleSheet.create({
    container: {
        padding: 20,
        paddingTop: windowHeight / 6,
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
    logo: {
        height: 100,
        width: 200,
        resizeMode: 'stretch',
    },
    form: {
        width: '100%'
    },
    text: {
        fontFamily: 'Arial',
        fontSize: 28,
        marginBottom: 10,
        color: '#051d5f',
    },
    navButton: {
        marginTop: 15,
    },
    navButtonText: {
        fontSize: 18,
        fontWeight: '500',
        color: '#2e64e5',
        fontFamily: 'Arial',
    },
    samerow: {
        flexDirection: 'row',
        flex: 1,
        padding: 10,
    },
});