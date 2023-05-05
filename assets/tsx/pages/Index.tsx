import React, { useEffect, useState } from 'react';
import { StatusBar, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import ProductList from './ProductList';
import ProductDetails from './ProductDetails';
import Cart from './Cart';
import Favorites from './Favorites';

const BottomTab = createBottomTabNavigator();

interface Product {
  id: number;
  description: string;
  name: string;
  price: number;
  thumbnail: string;
  title: string;
}

const Index = () => {


  return (
    <SafeAreaView style={{backgroundColor: '#FFFFFF', flex: 1}}>
        <StatusBar animated={true} backgroundColor='#323639' barStyle='dark-content' />
        <BottomTab.Navigator backBehavior='initialRoute' initialRouteName='Find' screenOptions={({route}) => ({
          tabBarIcon: ({color, focused, size}) => {
            let name;
            switch(route.name) {
              case 'ProductList':
                name = focused ? 'home' : 'home-outline';
              break;
              case 'Favorites':
                name = focused ? 'heart' : 'heart-outline';
              break;
              case 'Cart':
                name = focused ? 'cart' : 'cart-outline';
              break;
            }
            return <Ionicons color={color} name={name} size={size} />;
          },
          tabBarActiveTintColor: '#000000',
          tabBarInactiveTintColor: '#7e7e7e'
        })}>
          <BottomTab.Screen component={ProductList} name="ProductList" options={{headerStyle: {backgroundColor: '#ffffff'}, headerTintColor: '#000000', headerTitle: '', title: 'Home'}} />
          <BottomTab.Screen component={Favorites} name="Favorites" options={{headerStyle: {backgroundColor: '#ffffff'}, headerTintColor: '#000000', title: 'Favorite'}} />
          <BottomTab.Screen component={Cart} name="Cart" options={{headerStyle: {backgroundColor: '#ffffff'}, headerTintColor: '#000000', title: 'Basket'}} />
        </BottomTab.Navigator>
      </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    flex: 1,
    padding: 25
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  empty: {
    alignSelf: 'center',
    marginTop: 32,
    fontSize: 18,
  },
  list: {
    paddingHorizontal: 8,
    paddingBottom: 16,
  },
  product: {
    flex: 1,
    margin: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 8,
  },
  image: {
    width: 75,
    height: 50,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Index;