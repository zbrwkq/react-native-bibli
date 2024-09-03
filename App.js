import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/Home';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{ headerShown: true }}
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'Écran d\'Accueil' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
