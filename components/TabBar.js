import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, Dimensions, Animated } from 'react-native';
import { useTabBar } from '../contexts/TabBarProvider';
import Tab from './Tab';

const { width } = Dimensions.get('screen');

const TabBar = ({ state, navigation }) => {
  const [selected, setSelected] = useState('Home');
  const { routes } = state;
  const renderColor = currentTab => (currentTab === selected ? 'red' : 'black');

  const { showTabBar } = useTabBar();

  const animation = useRef(new Animated.Value(0)).current;

  const handlePress = (activeTab, index) => {
    if (state.index !== index) {
      setSelected(activeTab);
      navigation.navigate(activeTab);
    }
  };
  
  const toggleTabBarAnimation = () => {
    if (showTabBar) {
      Animated.timing(animation, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(animation, {
        toValue: 100,
        duration: 100,
        useNativeDriver: true,
      }).start();
    }
  };

  useEffect(() => {
    toggleTabBarAnimation();
  }, [showTabBar]);

  return (
    <View style={styles.wrapper}>
      <Animated.View
        style={[styles.container, { transform: [{ translateY: animation }] }]}
      >
        {routes.map((route, index) => (
          <Tab
            tab={route}
            icon={route.params.icon}
            onPress={() => handlePress(route.name, index)}
            color={renderColor(route.name)}
            key={route.key}
            signOut = {() => signOutPress} 
          />
        ))}
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    bottom: 20,
    width,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    width: '80%',
    borderRadius: 80,
    elevation: 2,
  },
});

export default TabBar;
