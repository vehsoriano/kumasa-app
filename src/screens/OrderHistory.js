import React, { useState, useEffect } from 'react'
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  SafeAreaView,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Moment from 'react-moment';
import Icon from 'react-native-vector-icons/FontAwesome';

import axios from 'axios'
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler';

function OrderHistory({navigation}) {

  const [orders, setOrders] = useState([])
  const [userData, setUserData] = useState('')

  useEffect(() => {
    getBranch()
    getToken()
  }, [])

  function getBranch() {
    axios.get('https://kumasa-admin.herokuapp.com/api/order/orders')
    .then(res => {
      // console.log(res)
      setOrders(res.data)
    })
    .catch(err => {
      console.log(err)
    })
  }

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

  // console.log(orders)


  const orderedItems = orders.filter(x => x.email === userData.email)


  // console.log(orderedItems)

  // function getOrderItems(orderID) {
  //   axios.get(`https://kumasa-admin.herokuapp.com/api/order/ordersItem/${}`)
  // }


  // const [orderHistory, setOrderHistory] = useState(
  //   [
  //     {id: 1, description: "Lorem ipsum dolor sit amet, indu consectetur elit"}, 
  //   ]
  // )

  function goToOrderBranch(item) {

    console.log(item)

    axios.get(`https://kumasa-admin.herokuapp.com/api/order/ordersItem/${item.order_id}`)
      .then(res => {
        // console.log(res.data)
        navigation.navigate('Details', {
          branchParams: item,
          itemParams: res.data
        });
      })
      .catch(err => {
        console.log(err)
      })
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.banner}>
          <Text style={styles.bannerTitle}>
            Order History
          </Text>
      </View>
      <FlatList 
        style={styles.notificationList}
        columnWrapperStyle={styles.listContainer}
        data={orderedItems}
        
        keyExtractor= {(item) => {
          return item.id;
        }}
        renderItem={({item}) => {
          return (
            <View key={item.order_id} 
              style={styles.notificationBox}>
               <View style={styles.headerCard}>
                  <Image style={styles.branchLogo} 
                  source={{uri: item.branch_logo}}/>
                  <View>
                    <Text style={[styles.description, styles.descriptionTitle]}>{item.order_branch}</Text>
                  </View>
                  <View style={{
                    marginLeft: 'auto',
                    marginTop: -20,
                    // backgroundColor: 'red'
                  }}>
                    <TouchableOpacity onPress={() => goToOrderBranch(item)}>
                        <Icon
                          name='arrow-right'
                          size={28}
                          color='#FC9404'
                        />                    
                    </TouchableOpacity>
                  </View>
               </View>
               <View style={styles.holderBodyCard}>
                <View style={styles.orderHolder}>
                  <Text style={[styles.description, styles.orderNum]}>#{item.order_number}</Text>
                  <Text 
                  style={
                    [
                      styles.description, 
                      styles.orderStatus,
                      item.status === "Pending" ? styles.orderStatusPending : '', 
                      item.status === "On Process" ? styles.orderStatusAccepted : '',
                      item.status === "Cancelled" ? styles.orderStatusCancelled : '',
                    ]
                  }>
                    {item.status}
                    </Text>
                </View>
                <View style={{marginBottom: 5,}}>
                  <Text style={{fontWeight: 'bold'}}>
                    Date: &nbsp; 
                    <Moment 
                      style={{fontWeight: 'normal'}}
                      format="lll" 
                      element={Text}>
                      {item.order_date}
                    </Moment>
                  </Text>                 
                </View>
                <View style={{marginBottom: 5,}}>
                  <Text style={{fontWeight: 'bold'}}>
                    Time: &nbsp; 
                    <Moment 
                      style={{fontWeight: 'normal'}}
                      format="LT" 
                      element={Text}>
                      {item.order_date}
                    </Moment>
                  </Text>                 
                </View>                 
              </View>
            </View>
          )}}/>
    </ScrollView>
  )
}

export default OrderHistory


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
    fontSize:25,
    color:"#FFFFFF",
    marginTop:10,
  },
  notificationList:{
    marginTop:20,
    padding:10,
  },
  notificationBox: {
    padding:20,
    marginTop:5,
    marginBottom:5,
    backgroundColor: '#FFFFFF',
    // flexDirection: 'row',
    // alignItems: 'center',
    borderRadius:10,
  },
  icon:{
    width:45,
    height:45,
  },
  description:{
    fontSize:14,
    color: "#3498db",
    marginLeft:10,
    marginRight:10,
  },
  branchLogo: {
    width: 50,
    height: 50,
    borderRadius: 63,
    borderWidth: 1,
    marginHorizontal: 'auto',
    borderColor: "#f2f2f2",
  },

  descriptionTitle: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 20,
  },

  headerCard: {
    position: 'relative',
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    alignItems: 'center',
    flexDirection: 'row'
    // backgroundColor: 'red'
  },

  holderBodyCard: {
    position: 'relative',
    paddingVertical: 15,
    // backgroundColor: 'red'
  },

  orderHolder: {
    position: 'absolute',
    top: 10,
    right: 0,
    // backgroundColor: 'red',
    alignItems: 'flex-end'
  },

  orderNum: {
    fontWeight: 'bold',
    color: '#000',
    fontSize: 16,

    // backgroundColor: 'blue'
  },
  orderStatus: {
    display: 'flex',
    paddingHorizontal: 5,
    paddingVertical: 3,
    marginTop: 3,
    width: 100,
    
    textAlign: 'center',
    fontSize: 12,
    textTransform: 'uppercase',
    color: '#fff',
    borderRadius: 3,
  },
  orderStatusPending: {
    backgroundColor: 'orange',
  },
  orderStatusAccepted: {
    backgroundColor: 'green'
  },
  orderStatusCancelled: {
    backgroundColor: 'red'
  }
});