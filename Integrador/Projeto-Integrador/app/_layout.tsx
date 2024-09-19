import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import Index from './index';
import LogPageScreen from './logPage';
import Configs from './configs';
import QRCodeGenerator from './qrcode';
import LoginScreen from './login'; // Supondo que você tenha uma página de login

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Define os estilos para o título personalizado
const styles = StyleSheet.create({
  img: {
    width: 40,
    height: 40,
    marginLeft: 10,
  },
  headerTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitleText: {
    fontSize: 24,
    color: '#fff',
  },
});

function AppTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          switch (route.name) {
            case 'home':
              iconName = 'home';
              break;
            case 'logPage':
              iconName = 'file-text';
              break;
            case 'config':
              iconName = 'gear';
              break;
            case 'qrcode':
              iconName = 'qrcode';
              break;
            default:
              iconName = 'gear';
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#fff',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          backgroundColor: '#E91D63',
          paddingBottom: 5,
        },
      })}
    >
      <Tab.Screen name='home' component={Index} options={{ title: 'Home', headerShown: false }} />
      <Tab.Screen name='qrcode' component={QRCodeGenerator} options={{ title: 'QR Code', headerShown: false }} />
      <Tab.Screen name="logPage" component={LogPageScreen} options={{ title: 'Logs', headerShown: false }} />
      <Tab.Screen name='configs' component={Configs} options={{ title: 'Config', headerShown: false }} />
    </Tab.Navigator>
  );
}

function MainStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="SafeDoor"
        component={AppTabs}
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: '#E91D63',
          },
          headerTintColor: '#fff',
        }} 
      />
    </Stack.Navigator>
  );
}

export default function Layout() {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Estado de autenticação

  return (
    <NavigationContainer independent={true}>
      {isAuthenticated ? (
        <MainStack />
      ) : (
        <LoginScreen onLogin={() => setIsAuthenticated(true)} />
      )}
    </NavigationContainer>
  );
}
