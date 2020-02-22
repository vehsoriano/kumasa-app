import React, { useState, useEffect } from 'react'
import { 
  View, 
  Text,
  Image,
  // TextInput, 
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  FlatList,
  Animated
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { SwipeListView } from 'react-native-swipe-list-view';

let screenWidth = Dimensions.get('window').width;
import Icon from 'react-native-vector-icons/FontAwesome';

import axios from 'axios'
import AsyncStorage from '@react-native-community/async-storage';
import { useSelector, useDispatch } from 'react-redux'
import allActions from '../actions'

import CustomCart from '../components/Cart'

function Cart({navigation}) {

  const cart = useSelector(state => state.cartItems);

  // const [cart, setCart] = useState([])
  // const [total, setTotal] = useState(0)
  const [userData, setUserData] = useState('')
  
  // const dispatch = useDispatch()

  // useEffect(() => {
  //   getBranchItems()
  // }, [])

  // function getBranchItems() {
  //   axios.get(`https://kumasa-admin.herokuapp.com/api/item/branch/5e48f7bb2308b03418f57c5b`)
  //   .then(res => {
  //     setCart(res.data)
  //     // console.log(res.data)
  //     // setSearchItemList(res.data)
  //     // setLoader(false)
  //   })
  //   .catch(err => {
  //     console.log(err)
  //   })
  // }

  // function addTemp() {
  //   // const b= {
  //   //   _id: '234',
  //   //   item_branch_id: "5e444857b975092894e7178f",
  //   //   item_name: "sisig",
  //   //   logo: "https://i.imgur.com/eTasrEG.png",
  //   //   price: "50",
  //   //   initialQuantity: "1",
  //   //   status: "Available",
  //   //   updated_at: "2020-02-15T14:54:00.799Z"
  //   // }

  //   const b = {
  //     __v: 0, 
  //     _id: "5e48e86d2308b03418f57c5a", 
  //     created_at: "2020-02-16T06:59:57.557Z", 
  //     initialQuantity: "1", 
  //     isAdded: false, 
  //     item_branch_id: "5e44438dc55f194b607d4b9b", 
  //     item_name: "Fun shots", 
  //     logo: "https://i.imgur.com/okm7dcX.png", 
  //     price: "50", 
  //     status: "Available", 
  //     updated_at: "2020-02-16T06:59:57.557Z"
  //   }

  //   setCart([...cart, b])
  // }


  async function getToken(){
    try {
      const value = await AsyncStorage.getItem('USER_DATA')
      if(value !== null) {
        setUserData(JSON.parse(value))
        // console.log(JSON.parse(value)._id)
      } else {
        // console.log('null')
      }
    } catch(e) {
      // error reading value
    }
  }

  useEffect(() => {
    getToken()
  }, [])

  // console.log('-------------------------------')
  // console.log(total)
  // console.log(cart)

  function checkoutOrder() {
    console.log('checkout')

    cart.map((item, i) => {     
      console.log(item._id)
      console.log(item.initialQuantity)
      
      const req = {
        order_item_id: item._id,
        qty: item.initialQuantity
      }
      
      navigation.navigate('Payment')

      console.log(userData._id)
      console.log(req)

      // axios.post(`https://kumasa-admin.herokuapp.com/api/order/${userData._id}`, req)
      // .then(res => {
      //   console.log(res)
      //   alert('success')
      //   dispatch(allActions.cartActions.$REMOVE_ALL())
      // })
      // .catch(err => {
      //   console.log(err)
      // })
    })
  }

  function cancelCheckout() {
    navigation.goBack()
  }

  return (
    <>
      <CustomCart />
       
      <View style={styles.checkoutHolder}>
        <TouchableOpacity 
          style={styles.checkoutTextHolder}
          onPress={() => cancelCheckout()}
        >
          <Text style={[styles.checkoutText, styles.checkoutText1]}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.checkoutTextHolder}
          onPress={() => checkoutOrder()}
        >
          <Text style={[styles.checkoutText, styles.checkoutText2]}>Checkout</Text>
        </TouchableOpacity>
      </View>
    </>
  )
}

export default Cart


const styles = StyleSheet.create({
  

  checkoutHolder: {
    flexDirection: 'row',
    marginLeft: 'auto',
    alignItems: 'center',

    backgroundColor: '#C8923B',
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: screenWidth,
  },
  checkoutTextHolder: {
    flex: 1,
    textAlign: 'center',
    color: 'white',
    fontSize: 20,
  },
  checkoutText: {
    padding: 15,
    textAlign: 'center',
    color: '#fff',
    fontSize: 20,
  },
  checkoutText1: {
    backgroundColor: 'red'
  },
  checkoutText2: {
    backgroundColor: 'green'
  },
}); 