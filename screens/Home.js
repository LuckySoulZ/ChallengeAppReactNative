import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Button, Alert, FlatList } from 'react-native';
import AnimatedScrollView from '../components/AnimatedScrollView';
import { firebase } from '../config/Config';
import Colors from '../constants/DefaultColors';
import Account from '../models/Account';

const Home = () => {

  const [items, setItems] = useState([])

  const simpleAlertHandler = () => {
    //function to make simple alert
    alert('Hello I am Simple Alert');
  };

  const twoOptionAlertHandler = () => {
    //function to make two option alert
    console.log('Function triggered');
    Alert.alert('Hello', 'I am two option alert. Do you want to cancel me ?',
      [
        { text: 'Yes', onPress: () => console.log('Yes Pressed') },
        { text: 'No', onPress: () => console.log('No Pressed'), style: 'cancel' },
      ],
      { cancelable: false },
      //clicking out side of alert will not cancel
    );
  };

  const refreshListPress = async () => {
    console.log('Function triggered');
    firebase.firestore().collection('accounts')
      // Filter results
      .where('Age', '>', 18)
      // Limit results
      //.limit(5)
      .get()
      .then(querySnapshot => {
        const objectsArray = [];
        querySnapshot.forEach((snap) => {
          const id = snap.id
          const name = snap.get('Name');
          const age = snap.get('Age');
          const position = snap.get('Position');
          const account = new Account(id, name, age, position)
          //adding new property id with id from firestore
          objectsArray.push(account);
        });
        setItems(objectsArray);
        console.log(objectsArray);
      })
      .catch(error => {
        alert(error)
      });
  }

  const renderListItem = (itemData, listLength) => (
    <TouchableOpacity style={styles.listItem} onPress={() => removeItem(itemData.id)}>
      <Text style={styles.lightblue}>#{listLength} </Text>
      <Text style={styles.lightgreen}>{itemData.name} </Text>
      <Text style={styles.lightblue}>{itemData.position} </Text>
    </TouchableOpacity>
  );

  const removeItem = (id) => {
    const filteredData = items.filter(item => item.id !== id);
    setItems(filteredData);
  }

  return (
    <AnimatedScrollView style={styles.container}>
      <View style={styles.topview}>
        <View style={styles.view}>
          <Text style={styles.text}>
            You are on Home Screen
          </Text>
        </View>
        <TouchableOpacity>
          <Button
            title="Two Options Alert"
            onPress={twoOptionAlertHandler} />
          <Button
            title="RefreshList"
            onPress={refreshListPress} />
        </TouchableOpacity>

        <View style={styles.listContainer}>
          <Text style={styles.text}>FireStore Data</Text>
          <FlatList contentContainerStyle={styles.list}
            data={items}
            keyExtractor={(_, index) => index}
            renderItem={({ item, index }) => renderListItem(item, items.length - index)}
            numColumns={1}
            initialNumToRender={0}
            onPress={({ item }) => removeItem(item.id)}
          />
        </View>
      </View>

    </AnimatedScrollView>
  );
};

const styles = StyleSheet.create({
  topview: {
    flex: 1,
    padding: 30
  },
  view: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    backgroundColor: '#76a6ef',
  },
  text: {
    padding: 30,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
    height: 300,
    marginTop: 16,
  },
  listContainer: {
    flex: 1,
    width: '100%'
  },
  list: {
    flexGrow: 1,
    justifyContent: 'flex-end',
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
  lightblue: {
    color: Colors.lightblue,
  },
  lightgreen: {
    color: Colors.lightgreen,
  },
});

export default Home;