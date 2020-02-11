import React, { useState } from 'react'
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  SafeAreaView,
} from 'react-native';

function OrderHistory() {

  const [orderHistory, setOrderHistory] = useState(
    [
      {id: 1, description: "Lorem ipsum dolor sit amet, indu consectetur elit"}, 
    ]
  )

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.banner}>
          <Text style={styles.bannerTitle}>
            Order History
          </Text>
      </View>
      <FlatList 
        style={styles.notificationList}
        columnWrapperStyle={styles.listContainer}
        data={orderHistory}
        
        keyExtractor= {(item) => {
          return item.id;
        }}
        renderItem={({item}) => {
          return (
            <View style={styles.notificationBox}>
              <Image style={styles.icon}
                source={{uri: 'https://i.ya-webdesign.com/images/up-vector-reminder-13.png'}}/>
              
              <Text style={styles.description}>{item.description}</Text>
            </View>
          )}}/>
    </SafeAreaView>
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
    flexDirection: 'row',
    alignItems: 'center',
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
});