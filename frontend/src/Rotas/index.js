import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from '../Telas/HomeScreen';
import Login from '../Telas/Login';
import Registro from '../Telas/Registro';
import Inicial from '../Telas/Inicial';
import Configs from '../Telas/Configs';
const Tab = createNativeStackNavigator();


export default function Rotas() {
  return (
    <NavigationContainer>
      <Tab.Navigator>


        <Tab.Screen name="Inicial" options={{ headerShown: false }}
        component={Inicial}
        />

        <Tab.Screen name="Login" options={{ headerShown: false }}
        component={Login}
        />

        <Tab.Screen name="Registro" options={{ headerShown: false }}
        component={Registro}
        />

        <Tab.Screen name="HomeScreen" options={{ headerShown: false }}
        component={HomeScreen}
        />

        <Tab.Screen name="Configs" options={{ headerShown: false }}
        component={Configs}
        />


      </Tab.Navigator>
    </NavigationContainer>
  );
}
