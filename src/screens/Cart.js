import React, { useState } from 'react'
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

function Cart({navigation}) {

  
  const [calls, setCalls] = useState(
    [
      {
        _id: 'asdasd',
        item_branch_id: "5e444857b975092894e7178f",
        item_name: "steak",
        logo: "https://i.imgur.com/eTasrEG.png",
        price: 100,
        initialQuantity: 1,
        status: "Available",
        updated_at: "2020-02-15T14:54:00.799Z"
      },
      {
        _id: 'aaaaa',
        item_branch_id: "5e444857b975092894e7178f",
        item_name: "steaky pork",
        logo: "https://i.imgur.com/eTasrEG.png",
        price: 300,
        initialQuantity: 1,
        status: "Available",
        updated_at: "2020-02-15T14:54:00.799Z"
      },
      {
        _id: 'asd111',
        item_branch_id: "5e444857b975092894e7178f",
        item_name: "steaky pork",
        logo: "https://i.imgur.com/eTasrEG.png",
        price: 300,
        initialQuantity: 1,
        status: "Available",
        updated_at: "2020-02-15T14:54:00.799Z"
      }
    ]
  )
  const [total, setTotal] = useState(0)

  function addTemp() {
    const b= {
      _id: '234',
      item_branch_id: "5e444857b975092894e7178f",
      item_name: "sisig",
      logo: "https://i.imgur.com/eTasrEG.png",
      price: "50",
      initialQuantity: 1,
      status: "Available",
      updated_at: "2020-02-15T14:54:00.799Z"
    }

    setCalls([...calls, b])
  }

  React.useEffect(() => {
    getTotal()
  }, [calls])

  function getTotal() {
    if(Object.keys(calls).length === 0) {
      // console.log('no data')
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
      const total = sum(calls, 'price', 'initialQuantity')
      setTotal(total)
    }
  }  

  function increaseQty(id) {
    // console.log('increase + 1')
    setCalls((state) => {
      // console.log(state)
      let val = state.find(x => x._id === id)
      val.initialQuantity++
      return([
        ...state
        ]
      )
    })
  }

  function decreaseQty(id) {
    // console.log('decrease - 1')
    setCalls((state) => {
      let delVal = state.find(x => x._id === id)
      delVal.initialQuantity--
      return([
        ...state
      ])
    })
  }

  // console.log(calls)

  function checkoutOrder() {
    console.log('checkout')
    calls.map((item, i) => {
      console.log(item._id)
      console.log(item.initialQuantity)
    })
  }

  function cancelCheckout() {
    navigation.goBack()
  }

  return (
    <>
      <ScrollView style={styles.scrollViewHolder}>
        <SwipeListView 
          data={calls}          
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
            onPress={() => console.log(data)}
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
        <TouchableOpacity onPress={() => addTemp()}>
            <Text>Add Temp Item</Text>
        </TouchableOpacity>
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