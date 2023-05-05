import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ProductList from './assets/tsx/pages/ProductList';
import Index from './assets/tsx/pages/Index';
import ProductDetails from './assets/tsx/pages/ProductDetails';
import Favorites from './assets/tsx/pages/Favorites';
import Cart from './assets/tsx/pages/Cart';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import cartReducer from './reducers/cartReducer';
import CheckOut from './assets/tsx/pages/CheckOut';

const Stack = createStackNavigator();

const navigationRef = React.createRef();
const store = createStore(cartReducer);

export default function App() {
  return (
    <NavigationContainer>
      <Provider store={store}>
        <Stack.Navigator initialRouteName="Index" screenOptions={{animationEnabled: true, headerShown: false}}>
          <Stack.Screen component={Cart} name="Cart" />
          <Stack.Screen component={CheckOut} name="CheckOut" />
          <Stack.Screen component={Favorites} name="Favorites" />
          <Stack.Screen component={ProductDetails} name="ProductDetails" />
          <Stack.Screen component={ProductList} name="ProductList" />
          <Stack.Screen component={Index} name="Index" />
        </Stack.Navigator>
      </Provider>
    </NavigationContainer>
  );
}