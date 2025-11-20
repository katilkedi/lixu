import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { RootStackParamList } from './src/constants/home-types';

import Onboarding from './src/screens/Onboarding';
import Home from './src/screens/Home';
import HowToUse from './src/screens/HowToUse';
import Statistics from './src/screens/Statistic';
import Settings from './src/screens/Settings';
import Practice from './src/screens/Practice';
import Story from './src/screens/Story';
import Game from './src/screens/Game';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Onboarding">
        <Stack.Screen
          name="Onboarding"
          component={Onboarding}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen 
          name="Home" 
          component={Home}
          options={{
            headerShown: false,
          }} 
        />
        <Stack.Screen
          name="HowToUse"
          component={HowToUse}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Statistics"
          component={Statistics}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Settings"
          component={Settings}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen 
          name="Practice" 
          component={Practice} 
          options={{ 
            headerShown: false,
          }} 
        />
        <Stack.Screen 
          name="Story" 
          component={Story} 
          options={{ 
            headerShown: false, 
          }} 
        />
        <Stack.Screen 
          name="Game" 
          component={Game} 
           options={{ 
            headerShown: false, 
          }} 
        />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
