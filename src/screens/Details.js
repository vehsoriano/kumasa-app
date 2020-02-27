import React, { useState, useEffect } from 'react'
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  SafeAreaView,
  Dimensions
} from 'react-native';
let screenWidth = Dimensions.get('window').width;
import Moment from 'react-moment';

// import AsyncStorage from '@react-native-community/async-storage';
// import Moment from 'react-moment';
// import Icon from 'react-native-vector-icons/FontAwesome';

import axios from 'axios'
import { ScrollView } from 'react-native-gesture-handler';
// import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler';

function Details({ route, navigation }) {
  const { branchParams, itemParams } = route.params
  const [total, setTotal] = useState(0)  

  console.log(branchParams)
  console.log(itemParams)

  useEffect(() => {
    getTotal()
  }, [itemParams])

  function getTotal() {
    if(Object.keys(itemParams).length === 0) {
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
      const total = sum(itemParams, 'price', 'qty')
      setTotal(total)
    }
  } 

  const ORDER = 
  
  branchParams.order_address ? (
      <Text style={{fontWeight: 'normal'}}>
        {branchParams.order_address}       
      </Text>
    ) : (
      <Text style={{fontWeight: 'normal'}}>
        {branchParams.address}       
      </Text>
    )
  
  
  

  return (
    <>
      <View style={styles.banner}>
        <Image style={styles.branchLogo} source={{uri: branchParams.branch_logo}}/>
          <Text style={styles.branchName}>
            {branchParams.order_branch}
          </Text>
          <Text style={styles.branchAddress}>
            {branchParams.branch_order_address}
          </Text>
      </View>
      <ScrollView>
      {
          branchParams.status === "Pending" ? (
            <View style={styles.viewHolder}>
              <Text style={styles.bannerTitle}>Waiting for riders to accept your order</Text> 
            </View>
          ) : (
            <View style={styles.viewHolder}>
              <Text style={styles.bannerTitle}> Rider Details</Text> 
              <View style={styles.orderDetails}>
                <Text style={[styles.orderItemDetails, styles.itemFlexTitle]}>
                  Rider Fullname: &nbsp;
                  <Text style={{fontWeight: 'normal'}}>
                  {branchParams.rider_first_name} {branchParams.rider_middle_name} {branchParams.rider_last_name}
                  </Text>
                </Text>
                <Text style={[styles.orderItemDetails, styles.itemFlexTitle]}>
                  Rider Contact #: &nbsp;
                  <Text style={{fontWeight: 'normal'}}>
                  {branchParams.rider_phone_number} 
                  </Text>
                </Text>
                {/* <Text style={[styles.orderItemDetails, styles.itemFlexTitle]}>
                  Rider Email #: &nbsp;
                  {branchParams.rider_phone_number}
                </Text> */}
                <Text style={[styles.orderItemDetails, styles.itemFlexTitle]}>
                  Payment method: &nbsp;
                  {/* Needs Data */}
                  <Text style={{fontWeight: 'normal'}}>
                    Cash on Delivery
                  </Text>
                </Text>
              </View>
            </View>
          )
        }

        
        <View style={styles.viewHolder}>
          <Text style={styles.bannerTitle}> Order Details</Text> 
          <View style={styles.orderDetails}>
            <Text style={[styles.orderItemDetails, styles.itemFlexTitle]}>
              Order Id: &nbsp;
              <Text style={{fontWeight: 'normal'}}>
                {branchParams.order_id}
              </Text>
            </Text>
            <Text style={[styles.orderItemDetails, styles.itemFlexTitle]}>
              Ordered On: &nbsp;
              <Moment 
                style={{fontWeight: 'normal'}}
                format="LLL" 
                element={Text}>
                {branchParams.order_date}
              </Moment>
            </Text>
            <Text style={[styles.orderItemDetails, styles.itemFlexTitle]}>
              Delivery Address: &nbsp;
              
              {ORDER}

              
            </Text>
            {/* <Text style={[styles.orderItemDetails, styles.itemFlexTitle]}> */}
              {/* Landmark: &nbsp; */}
              {/* Needs Data */}
              {/* <Text style={{fontWeight: 'normal'}}> */}
                
              {/* </Text> */}
            {/* </Text> */}
          </View>
        </View>


        <View style={styles.viewHolder}>
          <Text style={styles.bannerTitle}> Order Items</Text>   
          <View style={styles.orderItems}>
            {/* <Image source={{ uri: item.logo }} style={styles.pic} /> */}
            <Text style={[styles.itemFlex, styles.itemFlexTitle]}>Item</Text>
            <Text style={[styles.itemFlex, styles.itemFlexTitle]}>Price</Text>
            <Text style={[styles.itemFlex, styles.itemFlexTitle]}>Quantity</Text>
            <Text style={[styles.itemFlex, styles.itemFlexTitle]}>Total</Text>
          </View>     
          {itemParams.map((item, i) => {
            return (
              <>
                <View style={styles.orderItems}>
                  {/* <Image source={{ uri: item.logo }} style={styles.pic} /> */}
                  <Text style={[styles.itemFlex]}>{item.item_name}</Text>
                  <Text style={[styles.itemFlex]}>{item.price}</Text>
                  <Text style={[styles.itemFlex, styles.itemCenter]}>{item.qty}</Text>
                  <Text style={[styles.itemFlex]}>Php {item.total}.00</Text>
                </View>               
              </>
            )
          })}              
        </View>
        <View style={[styles.viewHolderPrice, {paddingTop: 25}]}>
          <View style={styles.orderItems}>
            {/* <Image source={{ uri: item.logo }} style={styles.pic} /> */}
            <Text style={[styles.itemFlexThird, styles.itemFlexTitle]}>Sub Total</Text>
            <Text style={[styles.itemFlexThird, styles.itemFlexTitle]}></Text>
            {/* <Text style={[styles.itemFlex, styles.itemFlexTitle]}></Text> */}
            <Text style={[styles.itemFlexThird, styles.itemFlexTitle]}>Php {total}.00</Text>
          </View> 
        </View>
        <View style={[styles.viewHolderPrice]}>
          <View style={styles.orderItems}>
            {/* <Image source={{ uri: item.logo }} style={styles.pic} /> */}
            <Text style={[styles.itemFlexThird, styles.itemFlexTitle]}>Delivery Fee</Text>
            <Text style={[styles.itemFlexThird, styles.itemFlexTitle]}></Text>
            {/* <Text style={[styles.itemFlex, styles.itemFlexTitle]}></Text> */}
            <Text style={[styles.itemFlexThird, styles.itemFlexTitle]}>Php 59.00</Text>
          </View> 
        </View>
        <View style={[styles.viewHolderPrice, {paddingBottom: 25}]}>
          <View style={styles.orderItems}>
            {/* <Image source={{ uri: item.logo }} style={styles.pic} /> */}
            <Text style={[styles.itemFlexThird, styles.itemFlexTitle]}>Total</Text>
            <Text style={[styles.itemFlexThird, styles.itemFlexTitle]}></Text>
            {/* <Text style={[styles.itemFlex, styles.itemFlexTitle]}></Text> */}
            <Text style={[styles.itemFlexThird, styles.itemFlexTitle]}>Php {total + 59}.00</Text>
          </View> 
        </View>
      </ScrollView>
    </>
  );
}

export default Details


const styles = StyleSheet.create({
  container:{
    backgroundColor:'transparent'
  },
  banner:{
    padding:25,
    alignItems: 'center',
    backgroundColor: "#ff9501",
  },
  bannerTitle:{
    fontWeight: 'bold',
    fontSize:25,
    color:"#ff9501",
    marginTop:10,
  },
  pic: {
    borderRadius: 25,
    width: 50,
    height: 50,
  },
  branchName: {
    color: '#fff',
    marginTop: 8,
    fontSize: 20,
    fontWeight: 'bold'
  },
  branchAddress: {
    color: '#fff',
    fontSize: 16,
  },
  branchLogo: {
    width: 75,
    height: 75,
    borderRadius: 63,
    borderWidth: 1,
    marginHorizontal: 'auto',
    borderColor: "#f2f2f2",
  },
  viewHolder: {
    backgroundColor: '#fff',
    paddingTop: 25,
    paddingHorizontal: 15,
  },
  viewHolderPrice: {
    backgroundColor: '#fff',
    paddingHorizontal: 15,
  },
  orderDetails: {
    display: 'flex',
    flexDirection: 'column',
    paddingHorizontal: 8,
    marginTop: 20,
  },
  orderItemDetails: {
    marginBottom: 10,
  },
  orderItems: {
    display: 'flex',
    flexDirection: 'row',
    paddingHorizontal: 8,
    marginTop: 10,
  },
  itemFlex: {
    width: screenWidth / 4,
  },
  itemFlexThird: {
    width: screenWidth / 3,
  },
  itemFlexTitle: {
    fontWeight: 'bold',
    fontSize: 16,
  },
});