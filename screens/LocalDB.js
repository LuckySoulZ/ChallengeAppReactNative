import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, ScrollView, TouchableOpacity } from 'react-native';
import FormInput from '../customcomponents/FormInput';
import FormButton from '../customcomponents/FormButton';
import User from '../models/User';
import AsyncStorage from '@react-native-async-storage/async-storage';

const renderListItem = (itemData, index) => (
  <View key={index} style={styles.listItem}>
    <Text style={styles.lightgreen}>{itemData.name} </Text>
    <Text style={styles.lightblue}>{itemData.email} </Text>
  </View>
);

const LocalDB = () => {
  const [fullName, setFullName] = useState([])
  const [email, setEmail] = useState([])
  const [items, setItems] = useState([])

  const dbClearPress = async () => {
    try {
      await AsyncStorage.clear();
    } catch (err) {
      alert(err);
    }
    setItems([]);
  }

  const dbSavePress = async () => {
    let index = items.length > 0 ? items.length : 0;
    let user = new User(index, fullName, email);
    const objectsArray = items
    objectsArray.push(user)
    setItems(objectsArray);
    console.log(user);
    try {
      await AsyncStorage.setItem('users', JSON.stringify(objectsArray));
    } catch (err) {
      alert(err);
    }

  }

  const dbFetchPress = async () => {
    try {
      let usersJSON = await AsyncStorage.getItem('users');
      let usersArray = JSON.parse(usersJSON);

      if (usersArray !== null) {
        setItems(usersArray);
      }
    } catch (err) {
      alert(err);
    }
  }

  /**
 * Se esta utilizando para que se corra una vez cuando inicia la applicacion y obtenga la informacion*.
 */
  useEffect(() => {
    dbFetchPress();
  }, []);

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
      <TouchableOpacity style={styles.samerow}>
        <FormButton
          buttonTitle="SaveDB"
          onPress={dbSavePress}
        />

        <FormButton
          buttonTitle="FetchDB"
          onPress={dbFetchPress}
        />

        <FormButton
          buttonTitle="Clear"
          onPress={dbClearPress}
        />
      </TouchableOpacity>

      <Text style={styles.text}>AsyncStorage Data</Text>

      {items.length > 0}
      <ScrollView contentContainerStyle={styles.listContainer}>
        { items.map((item, index) => renderListItem(item, index))}
      </ScrollView>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafd',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  text: {
    fontFamily: 'Arial',
    fontSize: 28,
    marginBottom: 10,
    color: '#051d5f',
  },
  listContainer: {
    flexGrow: 1,
    flex: 1,
    justifyContent: 'flex-start',
    paddingBottom: 30,
  },
  listItem: {
    borderColor: '#ccc',
    borderWidth: 1,

    padding: 15,
    marginVertical: 10,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
  },
  samerow: {
    flexDirection: 'row',
    padding: 10,
  },
});

export default LocalDB;
