import React, { useState, useEffect } from 'react'
import {  
  View, 
  Text, 
  StyleSheet, 
  Image,
  Dimensions, 
  Picker,
} from 'react-native';
import forms from '../styles/forms'
import { useSelector, useDispatch} from 'react-redux'
// import Toast from 'react-native-simple-toast';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input, Button } from 'react-native-elements';
import axios from 'axios'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';
let ScreenHeight = Dimensions.get("window").height;
let ScreenWidth = Dimensions.get("window").width;
import allActions from '../actions'
import CustomCart from '../components/Cart'

function Payment({navigation}) {

  const cart = useSelector(state => state.cartItems);

  const [address, setAddress] = useState('')
  const [landmark, setLandmark] = useState('')
  const [userData, setUserData] = useState('')
  const [type, setType] = useState('')
  const [addressType, setAddressType] = useState('profileAddress')
  const [deliveryType, setDeliveryType] = useState('pickup')
  const dispatch = useDispatch()

  useEffect(() => {
    getToken()
  }, [])

  // const [itemOnPayment, setItemOnPayment] = useState({})

  const {
    container,
    formInput,
    labelStyle,
    formGroup,
  } = forms


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

  const makePayment = () => {
    const arr = []
    console.log('make payment')
    console.log('--------------')
    // console.log(userData.address)
    // console.log(address)
    cart.map((item, i) => {     
      arr.push({
        order_item_id: item._id,
        qty: item.initialQuantity
      })
    })

    var req
    if (addressType === 'profileAddress') {
      console.log('profile')
      req = {
        items: arr 
      }
    } else if(addressType === 'differentAddress') {
      console.log('different')
      req = {
        items: arr,
        address 
      }
    }
    console.log(req)    

    axios.post(`https://kumasa-admin.herokuapp.com/api/order/${userData._id}`, req)
      .then(res => {
        console.log(res)
        dispatch(allActions.cartActions.$REMOVE_ALL())
        navigation.navigate('Accepted', {
          userData_id: userData.first_name
        })
      })
      .catch(err => {
        console.log(err)
      })
  }

  return (
    <ScrollView style={{backgroundColor: '#fff'}}>
      
      <Text style={[style.title, {paddingTop: 30}]}>
        {
          addressType === 'differentAddress' ? 'Different Address' : 'Address'
        }
      </Text>
      <View style={{ flexDirection: 'row', paddingHorizontal: 20, backgroundColor: '#fff' }}>
        <Picker
          selectedValue={addressType}
          style={{height: 50, width: ScreenWidth - 40}}
          onValueChange={(addressType, itemIndex) =>
            setAddressType(addressType)
          }>
          <Picker.Item label="Profile Address" value="profileAddress" />
          <Picker.Item label="Use different address" value="differentAddress" />
        </Picker>
      </View>
      {
        addressType === 'differentAddress' ? (
          <>
          {/* <Text style={style.title}>Use different address</Text> */}
            <Text style={[style.warn, {marginBottom: 0}]}>
              Note: Please complete the address field correctly, Include Block and Lot numbers and street name 
              Failure to include this may possibly delay your order.
            </Text>
            <View style={container}>
              <View style={formGroup}>
                <Input
                  label="Delivery Address"
                  placeholder='1 Holy Angel St, Angeles, 2009 Pampanga'
                  labelStyle={labelStyle}
                  inputContainerStyle={formInput}
                  rightIcon={
                    <Icon
                      name='map-marker'
                      size={20}
                      color='#FCD69D'
                    />
                  }
                  onChangeText={(address) => setAddress(address)}
                  value={address}
                />
              </View>
              {/* <View style={formGroup}>
                <Input
                  label="Landmark"
                  placeholder='Church'
                  labelStyle={labelStyle}
                  inputContainerStyle={formInput}
                  rightIcon={
                    <Icon
                      name='map-marker'
                      size={20}
                      color='#FCD69D'
                    />
                  }
                  onChangeText={(landmark) => setLandmark(landmark)}
                  value={landmark}
                />
              </View> */}
            </View>
          </>
        ) : ( 
          null
        )
      }

      <View style={style.separator}></View>
      <Text style={[style.title, {paddingTop: 30}]}>Cart Items</Text>
      <CustomCart />

      <View style={style.separator}></View>
    
      <Text style={[style.title, {paddingTop: 20}]}>
        {
          deliveryType === 'pickup' ? 'Pickup' : 'For Reservation'
        }
      </Text>
      <View style={{ flexDirection: 'row', paddingHorizontal: 20, backgroundColor: '#fff' }}>
        <Picker
          selectedValue={deliveryType}
          style={{height: 50, width: ScreenWidth - 40}}
          onValueChange={(deliveryType, itemIndex) =>
            setDeliveryType(deliveryType)
          }>
          <Picker.Item label="Pickup" value="pickup" />
          <Picker.Item label="Delivery" value="delivery" />
        </Picker>
      </View>

      {
        deliveryType === 'delivery' ? (
            <>
              <View style={container}>
                <View style={formGroup}>
                  <Input
                    label="Reservation Time"
                    placeholder='5:00PM'
                    labelStyle={labelStyle}
                    inputContainerStyle={formInput}
                    rightIcon={
                      <Icon
                        name='calendar'
                        size={20}
                        color='#FCD69D'
                      />
                    }
                    onChangeText={(address) => setAddress(address)}
                    value={address}
                  />
                </View>
              </View>
            </>
          ) : (
            null
          )
      }
      

      <View style={style.separator}></View>
      <Text style={[style.title, {paddingTop: 30}]}>Payment Method</Text>
      <View style={{ flexDirection: 'row', paddingHorizontal: 20, backgroundColor: '#fff' }}>
        <Picker
          selectedValue={type}
          style={{
            height: 50, 
            width: ScreenWidth - 40,
          }}
          onValueChange={(itemValue, itemIndex) =>
            setType(itemValue)
          }>
          <Picker.Item label="Cash On Delivery" value="cod" />
          {/* <Picker.Item label="Online Payment" value="online" /> */}
        </Picker>
      </View>
      <Text style={style.warn}>
        Note: Please review your delivery address and order. Once you click "Make Payment"
        you can no longer cancel your order
      </Text>
      <Button
        onPress={() => makePayment()}
        icon={
          <Icon
            name="credit-card"
            size={22}
            color="white"
          />
        }
        title="Make payment"
      />
      <View>
        <Text style={{fontSize: 12, textAlign: 'center', marginTop: 10, marginBottom: 5}} >By clicking MAKE PAYMENT, You Agree with our </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Terms')}>
        <Text style={{fontSize: 12, textAlign: 'center', marginBottom: 25}}>Terms and Conditions</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}

export default Payment

const style = StyleSheet.create({

  title: {
    // paddingTop: 30,
    paddingLeft: 30,
    paddingRight: 30,
    paddingBottom:0,
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    textAlign: 'left',
    fontWeight: 'bold',
    fontSize: 22,
  },
  separator: {
    width: ScreenWidth,
    height: 1,
    backgroundColor: '#000'
  },  
  name:{
    fontSize:22,
    color:"#ff9501",
    fontWeight:'600',
  },
  warn: {
    paddingVertical: 10,
    paddingHorizontal: 30,
    marginVertical: 15,
    backgroundColor: '#ffb818'
  },
})