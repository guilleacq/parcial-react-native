import React from 'react';

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import { Ionicons } from '@expo/vector-icons';

import DestinationList from './screens/DestinationList';
import DestinationEdit from './screens/DestinationEdit';
import DestinationAdd from './screens/DestinationAdd';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();


// esta aplicacion LA TESTEE EN iOS
function DestinationStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="DestinationList" component={DestinationList} />
      <Stack.Screen name="DestinationEdit" component={DestinationEdit} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name="Travel"
          component={DestinationStack}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="airplane-outline" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Add"
          component={DestinationAdd}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="add-circle-outline" color={color} size={size} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
