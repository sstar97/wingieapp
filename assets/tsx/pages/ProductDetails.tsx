import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, Button } from 'react-native-elements';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { connect } from 'react-redux';

import { addToFavorites, addToCart, removeFromFavorites } from '../../../actions/cartActions';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { SliderBox } from "react-native-image-slider-box";

import Ionicons from 'react-native-vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context';

interface Product {
  id: number;
  name: string;
  price: number;
  title: string;
  description: string;
}

type ProductDetailRouteProp = RouteProp<{ ProductDetail: { productId: number } }, 'ProductDetail'>;

const ProductDetails = (props: null) => {
  const navigation = useNavigation();
  const route = useRoute<ProductDetailRouteProp>();
  const { productId } = route.params;
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    fetch('https://dummyjson.com/product/' + route.params.productId.id)
    .then(res => res.json())
    .then((response) => {console.log(response);setProduct(response)});
  }, [productId]);

  const handleAddToCart = () => {
    const item: CartItem = {
      ...product
    };
    props.addToCart(item);
  };

  const handleAddToFavorites = () => {
    
    const item: CartItem = {
      ...product
    };
    if (props.favorites.find(item => item.id !== route.params.productId)) {
      props.removeFromFavorites(item)
      console.log('remove')
    } else {
      props.addToFavorites(item);
      console.log('add')
    }
    console.log('favorites', props.favorites)
  };

  if (!product) {
    return <Text>Loading...</Text>;
  }

  return (
    <SafeAreaView style={{flex: 1}}>
        <View style={{flexDirection: 'row', height: 50, marginBottom: 10}}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={{flex: 1}}>
            <Ionicons color="#000000" name={"md-return-up-back"} size={25} style={{padding: 10}} />
          </TouchableOpacity>
          <View style={{alignItems: 'center', flex: 1, justifyContent: 'center'}}>
            <Text style={{fontSize: 16, fontWeight: '700'}}>
              {product.title}
            </Text>
          </View>
          <TouchableOpacity onPress={handleAddToFavorites} style={{backgroundColor: '#b9b9b9', borderRadius: 15, flex: 1, marginRight: 5}}>
            <Ionicons color={props.favorites.find(item => item.id !== route.params.productId) ? "#d90000" : "#000000"} name={"heart"} size={25} style={{padding: 10}} />
          </TouchableOpacity>
        </View>
        <SliderBox images={product.images}/>
      <View style={styles.container}>
        <View style={{flex: 1}}>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.title}>
              {product.title}
            </Text>
            {product.price ? <Text style={{color: '#7e7e7e', fontSize: 13, fontWeight: '400', paddingRight: 10, textDecorationLine: 'line-through', textAlign: 'center'}}>{product.price} TL</Text> : null}
            {product.price ? <Text style={{color: '#000000', fontSize: 24, fontWeight: '700', textAlign: 'center'}}>{Math.floor(product.price - ((product.price / 100) * product.discountPercentage))} TL</Text> : null}
          </View>
          <Text style={styles.description}>{product.description}</Text>

        </View>
        <TouchableOpacity onPress={handleAddToCart} style={{alignItems: 'center', backgroundColor: '#b9b9b9', borderRadius: 15, marginBottom: 15}}>
          <Text style={{fontSize: 16, fontWeight: '700', padding: 15}}>
            Add to Cart
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

//stateten al props a at
const mapDispatchToProps = {
    addToFavorites,
    removeFromFavorites,
    addToCart
}

const mapStateToProps = (state) => {
    return {
        cart: state.cart,
        favorites: state.favorites
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetails);