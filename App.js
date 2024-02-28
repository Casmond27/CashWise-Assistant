// App.js
import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import Home from './components/Home';
import RetirementCal from './components/RetirementCal';
import Achievement from './components/Achievement';
import Settings from './components/Settings';
import BudgetExpenses from './components/BudgetExpenses';
import MainNavigator from './components/MainNavigator';
import { BudgetProvider } from './components/budgetContext';

const Tab = createBottomTabNavigator();
export default function App() {

  return (

    <NavigationContainer>
    <BudgetProvider>
      <MainNavigator/>
      </BudgetProvider>
    </NavigationContainer>

  );
}
