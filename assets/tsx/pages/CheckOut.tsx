import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet, TextInput, View } from 'react-native';
import { Text, Button } from 'react-native-elements';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { connect } from 'react-redux';

import { addToFavorites, addToCart, removeFromFavorites } from '../../../actions/cartActions';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { SliderBox } from "react-native-image-slider-box";

import Ionicons from 'react-native-vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context';

const CheckOut = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={{flex: 1}}>
        <View style={{flexDirection: 'row', height: 50, marginBottom: 10}}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={{flex: 1}}>
            <Ionicons color="#000000" name={"md-return-up-back"} size={25} style={{padding: 10}} />
          </TouchableOpacity>
          <View style={{alignItems: 'center', flex: 1, justifyContent: 'center'}}>
            <Text style={{fontSize: 16, fontWeight: '700'}}>
              CHECKOUT
            </Text>
          </View>
          <View><Text>         </Text></View>
        </View>
      <View style={styles.container}>
        <View style={{flex: 1}}>
            <View style={{alignItems: 'center', borderRadius: 12, borderColor: '#b9b9b9', borderWidth: 1, flexDirection: 'row', marginBottom: 15}}>
                <TextInput onChange={(value) => searchInProducts(value)} placeholder='NAME' style={{fontSize: 16, padding: 15}}/>
            </View>
            <View style={{alignItems: 'center', borderRadius: 12, borderColor: '#b9b9b9', borderWidth: 1, flexDirection: 'row', marginBottom: 15}}>
                <TextInput onChange={(value) => searchInProducts(value)} placeholder='EMAIL' style={{fontSize: 16, padding: 15}}/>
            </View>
            <View style={{alignItems: 'center', borderRadius: 12, borderColor: '#d90000', borderWidth: 1, flexDirection: 'row', }}>
                <TextInput onChange={(value) => searchInProducts(value)} placeholder='PHONE' style={{fontSize: 16, padding: 15}}/>
            </View>
        </View>
        <TouchableOpacity onPress={() => {Alert.alert('THANK YOU!', 'Thank you for choose us!', [{onPress: () => navigation.reset({index: 0, routes: [{name: 'Index'}]}), text: 'Continue'}])}} style={{alignItems: 'center', backgroundColor: '#b9b9b9', borderRadius: 15, marginBottom: 15}}>
          <Text style={{fontSize: 16, fontWeight: '700', padding: 15}}>
            PAY
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  title: {
    marginBottom: 16,
    flex: 1,
    fontSize: 16,
    fontWeight: '700'
  },
  description: {
    marginBottom: 16,
  },
  price: {
    marginBottom: 32,
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default CheckOut;