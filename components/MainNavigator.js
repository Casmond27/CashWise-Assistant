import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import Home from './Home';
import RetirementCal from './RetirementCal';
import Achievement from './Achievement';
import Settings from './Settings';
import BudgetExpenses from './BudgetExpenses';
import { PointProvider } from './pointContext';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();


const HomeStackScreen = () => {

  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} options={{ headerShown: true, headerTitle: "Home",  headerLeft: () => <Ionicons name="ios-home" size={20} color="white" style={{ marginLeft: 20 }} />, headerStyle: {backgroundColor:'green'}  }}  />
      <Stack.Screen name="BudgetExpenses" component={BudgetExpenses}  />
      <Stack.Screen name="RetirementCal" component={RetirementCal} />
      <Stack.Screen name="Achievement" component={Achievement} />
      <Stack.Screen name="Settings" component={Settings} />
    </Stack.Navigator>
  );
};


const MainNavigator = () => {

  return (
    <PointProvider>
    <Tab.Navigator
      tabBarOptions={{
        style: {
          backgroundColor: 'grey',
        },
        activeTintColor: 'green',
        inactiveTintColor: 'green',
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="ios-home" size={size} color={color} />
          ),
          headerStyle: {
            backgroundColor: 'green',

          },
        }}
      />
      <Tab.Screen
        name="Budget"
        component={BudgetExpenses}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="ios-cash" size={size} color={color} />
          ),
          headerStyle: {
            backgroundColor: 'green',
          },
        }}
      />
      <Tab.Screen
        name="RetirementCal"
        component={RetirementCal}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="ios-calculator" size={size} color={color} />
          ),
          headerStyle: {
            backgroundColor: 'green',
          },
        }}
      />
      <Tab.Screen
        name="Achievement"
        component={Achievement}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="ios-analytics" size={size} color={color} />
          ),
          headerStyle: {
            backgroundColor: 'green',
          },
        }}
      />
      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="ios-settings" size={size} color={color} />
          ),
          headerStyle: {
            backgroundColor: 'green', 
          },
        }}
      />
    </Tab.Navigator>
    </PointProvider>
  );
};

export default MainNavigator;
