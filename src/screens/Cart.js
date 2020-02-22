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

function Cart({navigation}) {

  const cart = useSelector(state => state.cartItems);

  // const [cart, setCart] = useState([])
  const [total, setTotal] = useState(0)
  const [userID, setUserID] = useState('')
  
  const dispatch = useDispatch()

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

  function addTemp() {
    // const b= {
    //   _id: '234',
    //   item_branch_id: "5e444857b975092894e7178f",
    //   item_name: "sisig",
    //   logo: "https://i.imgur.com/eTasrEG.png",
    //   price: "50",
    //   initialQuantity: "1",
    //   status: "Available",
    //   updated_at: "2020-02-15T14:54:00.799Z"
    // }

    const b = {
      __v: 0, 
      _id: "5e48e86d2308b03418f57c5a", 
      created_at: "2020-02-16T06:59:57.557Z", 
      initialQuantity: "1", 
      isAdded: false, 
      item_branch_id: "5e44438dc55f194b607d4b9b", 
      item_name: "Fun shots", 
      logo: "https://i.imgur.com/okm7dcX.png", 
      price: "50", 
      status: "Available", 
      updated_at: "2020-02-16T06:59:57.557Z"
    }

    setCart([...cart, b])
  }

  useEffect(() => {
    getTotal()
  }, [cart])

  function getTotal() {
    if(Object.keys(cart).length === 0) {
      console.log('no data')
      setTotal(0)
    } 
    
    // else if(Object.keys(calls).length === 1) {
    //   // console.log('has one data') 
    //   var singleTotal = calls[0].initialQuantity * calls[0].price 
    //   setTotal(singleTotal)
    // } 
    
    else {
      // console.log('has many data')
      let sum = function(items, prop, qua){
        return items.reduce( function(a, b){
          return a + (b[prop] * b[qua]);
        }, 0);
      }
      const total = sum(cart, 'price', 'initialQuantity')
      setTotal(total)
    }
  }  

  function increaseQty(id) {
    dispatch(allActions.cartActions.increaseQTY(id))
    // console.log('increase + 1')
    // setCart((state) => {
    //   // console.log(state)
    //   let val = state.find(x => x._id === id)
    //   val.initialQuantity++
    //   return([
    //     ...state
    //     ]
    //   )
    // })
  }

  function decreaseQty(id) {
    dispatch(allActions.cartActions.decreaseQTY(id))
    // console.log('decrease - 1')
    // setCart((state) => {
    //   let delVal = state.find(x => x._id === id)
    //   delVal.initialQuantity--
    //   return([
    //     ...state
    //   ])
    // })
  }

  async function getToken(){
    try {
      const value = await AsyncStorage.getItem('USER_ID')
      if(value !== null) {
        setUserID(value)
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
    console.log(userID)
    cart.map((item, i) => {     
      console.log(item._id)
      console.log(item.initialQuantity)
      
      const req = {
        order_item_id: item._id,
        qty: item.initialQuantity
      }
      axios.post(`https://kumasa-admin.herokuapp.com/api/order/${userID}`, req)
      .then(res => {
        console.log(res)
        alert('success')
        dispatch(allActions.cartActions.$REMOVE_ALL())
      })
      .catch(err => {
        console.log(err)
      })
    })
  }

  function cancelCheckout() {
    navigation.goBack()
  }

  function deleteCartItem(data) {
    console.log('==================================')
    console.log(data.index)
    dispatch(allActions.cartActions.removeToCart(data.index))
  }

  return (
    <>
      <ScrollView style={styles.scrollViewHolder}>
        <SwipeListView 
          data={cart}          
          disableRightSwipe
          keyExtractor = {(item) => {
            return item._id;
          }}
          renderItem={(post, rowMap) => {
            const item = post.item;
            // const total = item.price * item.initialQuantity
            // console.log(total)
            return (
              <View style={styles.row}>
                <Image source={{ uri: item.logo }} style={styles.pic} />
                <View>
                  <View style={styles.nameContainer}>
                    <Text style={styles.nameTxt}>{item.item_name}</Text>
                  </View>
                  <View style={styles.end}>
                    {/* <Image style={[styles.icon, {marginLeft:15, marginRight:5, width:14, height:14}]} source={{uri:"https://img.icons8.com/small/14/000000/double-tick.png"}}/> */}
                    <Text style={styles.nameTxt}>{item.price}</Text>
                  </View>
                </View>
                <View style={styles.buttonContainer}>
                  <View style={styles.buttonHolder1}>
                    <TouchableOpacity
                      onPress={() => increaseQty(item._id)}
                    >
                      <Icon
                        name='plus-circle'
                        size={24}
                        color='#000'
                      />
                    </TouchableOpacity>
                  </View>
                  <Text style={styles.holderQuantity}>{item.initialQuantity}</Text>
                  <View style={styles.buttonHolder2}>
                    <TouchableOpacity                    
                      onPress={() => decreaseQty(item._id)}
                      disabled={item.initialQuantity === 1 ? true : false}
                    >
                      <Icon
                        name='minus-circle'
                        size={24}
                        color='#000'
                        style={item.initialQuantity === 1 ? {opacity: 0.5} : null}
                      />
                    </TouchableOpacity>
                  </View>                  
                </View>
              </View>
            )
          }}
          renderHiddenItem={ (data, rowMap) => (
            <TouchableOpacity 
            style={[styles.backRightBtn, styles.backRightBtnRight]}
            onPress={() => deleteCartItem(data)}
            >
              <View 
                style={styles.backTextWhite}>
                <Icon
                  name='trash'
                  size={24}
                  color='#fff'
                />
              </View>
            </TouchableOpacity>
          )}
          rightOpenValue={-75}
          />
        <View style={styles.bottomTotalHolder}>
          <Text style={styles.totalText}>Total: Php{total}</Text>
        </View> 
        {/* <TouchableOpacity onPress={() => addTemp()}>
            <Text>Add Temp Item</Text>
        </TouchableOpacity> */}
      </ScrollView> 
       
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
  scrollViewHolder: {
    marginBottom: 60
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#dcdcdc',
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    padding: 10,
    // justifyContent: 'space-between',

  },
  pic: {
    borderRadius: 25,
    width: 50,
    height: 50,
  },
  nameContainer: {
    // backgroundColor: 'green',
    // flexDirection: 'row',
    // justifyContent: 'space-between',
    width: 270,
  },
  holderQuantity: {
    marginLeft: 10,
    marginRight: 10,
  },
  buttonContainer: {
    // backgroundColor: 'red',
    // display: 'flex',
    // flex: .5,
    width: 'auto',
    flexDirection: 'row',
    marginLeft: 'auto',
    alignItems: 'center',
    // justifyContent: 'center',
  },
  // buttonHolder1: {
  //   backgroundColor: 'blue',
  // },
  // buttonHolder2: {
  //   backgroundColor: 'yellow',
  // },
  nameTxt: {
    marginLeft: 15,
    fontWeight: '600',
    color: '#222',
    fontSize: 15,

  },
  mblTxt: {
    fontWeight: '200',
    color: '#777',
    fontSize: 13,
  },
  end: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  time: {
    fontWeight: '400',
    color: '#666',
    fontSize: 12,

  },
  icon:{
    height: 28,
    width: 28, 
  },

  bottomTotalHolder: {
    backgroundColor: '#C8923B',
    // position: 'absolute',
    // bottom: 0,
    // left: 0,
    width: screenWidth,
    padding: 15,
  },
  totalText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 20
  },

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


  backRightBtn: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    width: 75,
  },
  backRightBtnRight: {
    backgroundColor: 'red',
    right: 0,
  },
  backTextWhite: {
    color: '#FFF',
  },
}); 