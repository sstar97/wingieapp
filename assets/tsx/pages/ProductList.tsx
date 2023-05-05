import React, { useEffect, useState } from 'react';
import { Image, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FlatList, TextInput } from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

interface Product {
  id: number;
  description: string;
  discountPercentage: number;
  name: string;
  price: number;
  thumbnail: string;
  title: string;
}

const ProductList = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [modalVisible, setModalVisible] = useState<Boolean>(false);
  const [sort, setSort] = useState<number>();
  const [searchParam, setSearchParam] = useState<number>();
  const navigation = useNavigation();

  const [, updateState] = React.useState();
  const forceUpdate = React.useCallback(() => updateState({}), []);

  useEffect(() => {
    fetch('https://dummyjson.com/products')
    .then(res => res.json())
    .then((response) => {setProducts(response.products)});
  }, []);

  const goToProductDetail = (productId: number) => {
    navigation.navigate('ProductDetails', {productId: productId})
  };

  const sortProducts = (productList: null) => {
    
    if (sort == 1) {
      const prod = productList.sort((a, b) => a.price - b.price);
      setProducts(prod);
      setSort(0);
    } else {
      const prod = productList.sort((a, b) => b.price - a.price);
      setProducts(prod)
      setSort(1);
    }
    forceUpdate();
  }

  const filterMaxValue = (value: string, ProductList: null) => {
    if (value && ProductList.length > 0) {
      setProducts(ProductList.filter((item) => item.price < parseInt(value)));
    }
  }

  const searchInProducts = (search) => {
    console.log(search.nativeEvent.text)
    console.log('https://dummyjson.com/products/search?q=' + search.nativeEvent.text)
    fetch('https://dummyjson.com/products/search?q=' + search.nativeEvent.text)
    .then(res => res.json())
    .then((response) => {console.log(response),setProducts(response.products)});
  }

  return (
    <View style={{flex: 1}}>
      <View style={styles.container}>
        <View style={{marginBottom: 20}}>
          <Text style={styles.title}>
            Products <Text style={{fontSize: 13, fontWeight: '400', color: '#b9b9b9'}}>({products.length} products in total)</Text>
          </Text>
          <View style={{flexDirection: 'row', zIndex: 10}}>
            <View style={{alignItems: 'center', borderRadius: 12, borderColor: '#b9b9b9', borderWidth: 1, flexDirection: 'row', flex: 1, marginEnd: 30}}>
              <Ionicons color="#b9b9b9" name={"search"} size={15} style={{paddingHorizontal: 5}} />
              <TextInput onChange={(value) => searchInProducts(value)} placeholder='Search Products' style={{fontSize: 13, flex: 1, padding: 5}}/>
            </View>
            <TouchableOpacity onPress={() => {setModalVisible(true)}} style={{alignItems: 'center', borderRadius: 12, borderColor: '#b9b9b9', borderWidth: 1, flexDirection: 'row', marginEnd: 10, minWidth: 57}}>
              <Ionicons color="#b9b9b9" name={"filter"} size={15} style={{paddingHorizontal: 5}} />
              <Text style={{color: '#b9b9b9', fontSize: 13, paddingRight: 5}}>Filter</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => sortProducts(products)} style={{alignItems: 'center', borderRadius: 12, borderColor: '#b9b9b9', borderWidth: 1, flexDirection: 'row', minWidth: 57}}>
              <MaterialCommunityIcons color="#b9b9b9" name={"sort-variant"} size={15} style={{paddingHorizontal: 5}} />
              <Text style={{color: '#b9b9b9', fontSize: 13, paddingRight: 5}}>Sort</Text>
            </TouchableOpacity>
          </View>
        </View>
        <FlatList data={products} renderItem={(product) =>
          <TouchableOpacity key={product.item.id} style={{alignItems: 'center', backgroundColor: '#b9b9b9', borderRadius: 10, flexDirection: 'row', padding: 8, marginVertical: 5}} onPress={() => goToProductDetail(product.item)}>
            <Image style={styles.image} source={{ uri: product.item.thumbnail }}/>
            <View style={{flex: 1, paddingHorizontal: 5}}>
              <Text numberOfLines={1} style={{fontWeight: "700"}}>{product.item.title}</Text>
              <Text numberOfLines={1} >{product.item.description}</Text>
            </View>
            <View>
              {product.item.price ? <Text style={{color: '#000000', fontWeight: '700', textAlign: 'center'}}>{Math.floor(product.item.price - ((product.item.price / 100) * product.item.discountPercentage))} TL</Text> : null}
              {product.item.price ? <Text style={{color: '#7e7e7e', fontSize: 13, fontWeight: '400', textDecorationLine: 'line-through', textAlign: 'center'}}>{product.item.price} TL</Text> : null}
            </View>
          </TouchableOpacity>
        }/>
        <Modal
          animationType="fade"
          supportedOrientations={['landscape', 'portrait']}
          transparent={true}
          visible={modalVisible}>
          <Text onPress={() => setModalVisible(false)} style={{backgroundColor: 'rgba(0,0,0,0.7)', flex: 1}} />
          <View style={[{backgroundColor: '#ffffff', borderTopLeftRadius: 15, borderTopRightRadius: 15, position: 'absolute', bottom: 0, width: '100%', height: '50%'}]}>
            <View style={{alignSelf: 'center', backgroundColor: '#616161', borderRadius: 10, justifyContent: 'center', marginVertical: 10, width: '30%', height: 5}}/>
            <TextInput inputMode='decimal' placeholder='Max Price' onChange={value => filterMaxValue(value, products)}/>
          </View>
        </Modal>
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

export default ProductList;