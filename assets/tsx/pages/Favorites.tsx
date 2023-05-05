import React, { useEffect, useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FlatList, TextInput } from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { connect } from 'react-redux';
import { removeFromFavorites } from '../../../actions/cartActions';

const Favorites = (props: null) => {
  interface CartItem {
    id: number;
    name: string;
    price: number;
    title: string;
    description: string;
    discountPercentage: number;
  }

  const handleRemoveToCart = (product) => {
    const item: CartItem = {
      ...product
    };
    props.removeFromFavorites(item);
  };

  return (
    <View style={{flex: 1}}>
      <View style={styles.container}>
        <FlatList showsVerticalScrollIndicator={false} style={{flex: 1}} data={props.favorites} renderItem={(product) =>
          <View key={product.item.id} style={{alignItems: 'center', backgroundColor: '#b9b9b9', borderRadius: 10, flexDirection: 'row', padding: 8, marginVertical: 5}} onPress={() => goToProductDetail(product.item)}>
            <Image style={styles.image} source={{ uri: product.item.thumbnail }}/>
            <View style={{flex: 1, paddingHorizontal: 5}}>
              <Text numberOfLines={1} style={{fontWeight: "700"}}>{product.item.title}</Text>
              <View style={{flexDirection: 'row'}}>
                {product.item.price ? <Text style={{color: '#000000', fontWeight: '700'}}>{Math.floor(product.item.price - ((product.item.price / 100) * product.item.discountPercentage))} TL</Text> : null}
                {product.item.price ? <Text style={{color: '#7e7e7e', fontSize: 13, fontWeight: '400', textDecorationLine: 'line-through'}}>{product.item.price} TL</Text> : null}
              </View>
            </View>
            <TouchableOpacity onPress={() => handleRemoveToCart(product)} style={{alignItems: 'center'}}>
              <Ionicons color="#d90000" name={"heart"} size={25} style={{paddingHorizontal: 5}} />
            </TouchableOpacity>
          </View>
        }/>
        
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    flex: 1,
    paddingHorizontal: 15,
    paddingTop: 10
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

const mapDispatchToProps = {
    removeFromFavorites
}

const mapStateToProps = (state) => {
    return {
        favorites: state.favorites
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Favorites);