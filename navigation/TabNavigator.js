import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';
import MyMaps from '../screens/Maps';
import LocalDB from '../screens/LocalDB';
import Settings from '../screens/Settings';
import TabBar from '../components/TabBar';
import TabBarProvider from '../contexts/TabBarProvider';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <TabBarProvider>
        <Tab.Navigator tabBar={props => <TabBar {...props} />}>
          <Tab.Screen
            name='Home'
            component={Home}
            initialParams={{ icon: 'home' }}
          />
          <Tab.Screen
            name='Maps'
            component={MyMaps}
            initialParams={{ icon: 'pushpin' }}
          />
          <Tab.Screen
            name='Local Data'
            component={LocalDB}
            initialParams={{ icon: 'database' }}
          />
          <Tab.Screen
            name='Settings'
            component={Settings}
            initialParams={{ icon: 'setting' }}
          />
        </Tab.Navigator>
    </TabBarProvider>
  );
};

export default TabNavigator;
