import React, { useContext, useState } from 'react';
import { View, Text, TouchableOpacity, Platform, StyleSheet, NativeModules } from 'react-native';
import FormInput from '../customcomponents/FormInput';
import FormButton from '../customcomponents/FormButton';
import { firebase } from '../config/Config';
import Strings from '../constants/Strings';

const SignUpScreen = () => {
    const [fullName, setFullName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [englishLevel, setEnglishLevel] = useState('')
    const [knowledge, setKnowledge] = useState('')

    const onRegisterPress = async () => {
        var Aes = NativeModules.Aes

        firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then((response) => {
                const uid = response.user.id
                const data = {
                    fullname,
                    email,
                    password,
                    englishLevel,
                    knowledge,
                };
                const usersRef = firebase.firestore().collection('users')
                usersRef
                    .doc(uid)
                    .set(data)
                    .then(() => {

                    })
                    .catch((error) => {
                        alert(error)
                    });
            })
            .catch((error) => {
                alert(error)
            });
    }

    const encryptData = (text, key) => {
        return Aes.randomKey(16).then(iv => {
            return Aes.encrypt(text, key, iv).then(cipher => ({
                cipher,
                iv,
            }))
        })
    }

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Nuevo Usuario</Text>

            <FormInput
                labelValue={fullName}
                onChangeText={(name) => setFullName(name)}
                placeholderText="Name"
                iconType="user"
                autoCapitalize="none"
                autoCorrect={false}
            />

            <FormInput
                labelValue={email}
                onChangeText={(userEmail) => setEmail(userEmail)}
                placeholderText="Email"
                iconType="ie"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
            />

            <FormInput
                labelValue={password}
                onChangeText={(userPassword) => setPassword(userPassword)}
                placeholderText="Password"
                autoCapitalize="none"
                iconType="lock"
                secureTextEntry={false}
            />

            <FormInput
                labelValue={englishLevel}
                onChangeText={(english) => setEnglishLevel(english)}
                placeholderText="English Level"
                iconType="sound"
                autoCapitalize="none"
                autoCorrect={false}
            />

            <FormInput
                labelValue={knowledge}
                onChangeText={(skills) => setKnowledge(skills)}
                placeholderText="Knowledge"
                iconType="solution1"
                autoCapitalize="none"
                autoCorrect={false}
            />

            <FormButton
                buttonTitle="Sign Up"
                onPress={onRegisterPress}
            />

            <View style={styles.textPrivate}>
                <Text style={styles.color_textPrivate}>
                    By registering, you confirm that you accept our{' '}
                </Text>
                <TouchableOpacity onPress={() => alert('Terms Clicked!')}>
                    <Text style={[styles.color_textPrivate, { color: '#e88832' }]}>
                        Terms of service
              </Text>
                </TouchableOpacity >
                <Text style={styles.color_textPrivate}> and </Text>
                <TouchableOpacity onPress={() => alert('Policy Clicked!')}>
                    <Text style={[styles.color_textPrivate, { color: '#e88832' }]}>
                        Privacy Policy
              </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default SignUpScreen;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f9fafd',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
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
    textPrivate: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginVertical: 35,
        justifyContent: 'center',
    },
    color_textPrivate: {
        fontSize: 13,
        fontWeight: '400',
        fontFamily: 'Arial',
        color: 'grey',
    },
});

