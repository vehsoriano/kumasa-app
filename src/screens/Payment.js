import React, { useState } from 'react'
import {  
  View, 
  Text, 
  StyleSheet, 
  Image,
  Dimensions, 
} from 'react-native';
import forms from '../styles/forms'
import { connect, useSelector, useDispatch} from 'react-redux'
import Toast from 'react-native-simple-toast';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input, Button } from 'react-native-elements';
import axios from 'axios'
import { ScrollView } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';
let ScreenHeight = Dimensions.get("window").height;
let ScreenWidth = Dimensions.get("window").width;
import allActions from '../actions'
import CustomCart from '../components/Cart'

function Payment() {


  const [address, setAddress] = useState('')
  const [landmark, setLandmark] = useState('')

  const {
    container,
    formInput,
    labelStyle,
    formGroup,
  } = forms

  return (
    <ScrollView>
      <Text style={style.title}>Delivery Address</Text>
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
        <View style={formGroup}>
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
        </View>
      </View>
      <View style={style.separator}></View>
      <Text style={style.title}>Cart Items</Text>
      <CustomCart />
      <View style={style.separator}></View>
      <Text style={style.title}>Payment Method</Text>
      <Text style={style.warn}>
        Note: Please review your delivery address and order. Once you click "Make Payment"
        you can no longer cancel your order
      </Text>
      <Button
        onPress={() => console.log('pay')}
        icon={
          <Icon
            name="credit-card"
            size={22}
            color="white"
          />
        }
        title="Make payment"
      />
    </ScrollView>
  )
}

export default Payment

const style = StyleSheet.create({

  title: {
    paddingTop: 30,
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