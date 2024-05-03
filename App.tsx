/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SplashScreen from 'react-native-splash-screen';
import HomeScreen from './src/HomeScreen';
import PostDetailsScreen from './src/PostDetailsScreen';

const Stack = createNativeStackNavigator();

function App(): React.JSX.Element {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="PostDetails" component={PostDetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
