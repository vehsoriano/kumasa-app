import React, { useState, useEffect } from 'react'
import { 
  View, 
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Animated
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { SwipeListView } from 'react-native-swipe-list-view';

let screenWidth = Dimensions.get('window').width;
import Icon from 'react-native-vector-icons/FontAwesome';

import axios from 'axios'

import { useSelector, useDispatch } from 'react-redux'
import allActions from '../actions'


function Cart({navigation}) {


  const cart = useSelector(state => state.cartItems);

  // const [cart, setCart] = useState([])
  const [total, setTotal] = useState(0)  
  const dispatch = useDispatch()

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


  function deleteCartItem(data) {
    console.log('==================================')
    console.log(data)
    dispatch(allActions.cartActions.updateStatus(data.item._id))
    dispatch(allActions.cartActions.removeToCart(data.index))
  }

  return (
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
        {/* <View>
          <Text style={styles.totalText}>Total: Php{total}</Text>
        </View> */}
        <View style={{flexDirection: 'row', marginBottom: 15, marginTop: 15}}>
          <Text style={styles.totalText}>Sub Total:</Text>
          <Text style={[styles.totalText, {marginLeft:'auto'}]}>Php {total}.00</Text>
        </View>
        <View style={{flexDirection: 'row', marginBottom: 15}}>
          <Text style={styles.totalText}>Delivery Fee:</Text>
          <Text style={[styles.totalText, {marginLeft:'auto'}]}>Php 59.00</Text>
        </View>
        <View style={{flexDirection: 'row', marginBottom: 15}}>
          <Text style={styles.totalText}>Amount Payable</Text>
          <Text style={
            [styles.totalText, {
              marginLeft:'auto', 
              fontSize: 25,
              fontWeight: 'bold'
            }]
          }>
            Php {total + 59}.00
          </Text>
        </View>
      </View> 
      {/* <TouchableOpacity onPress={() => addTemp()}>
          <Text>Add Temp Item</Text>
      </TouchableOpacity> */}
    </ScrollView>
  )
}

export default Cart


const styles = StyleSheet.create({
  scrollViewHolder: {
    marginBottom: 50,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#dcdcdc',
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    paddingVertical: 15,
    paddingHorizontal: 30,
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
    // textAlign: 'center',
    color: 'white',
    fontSize: 20
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
})