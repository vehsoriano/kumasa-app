import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView
} from 'react-native';

function Terms() {
    return (
        <ScrollView>
        <View style={styles.container}>
          <View style={styles.header}>
              <Text style={styles.headerTitle}>
                Terms and Conditions
              </Text>
          </View>

          <View style={styles.postContent}>
              <Text style={styles.postTitle}>
              Terms of Use
              </Text>

              <Text style={styles.postDescription}>
              This Terms and Conditions Agreement sets forth the standards of use of the Food Delivery service, “Kumasa” Online Service. By using the app, you the ”User” agree to these terms and conditions. If you do not agree to the terms and conditions of this Agreement, you should immediately cease all usage of this app. We reserve the right, at any time, to modify, alter, or update the terms and conditions of this agreement without prior notice. Modifications shall become effective immediately upon being posted on the app. Your continued use of the Service after amendments are posted constitutes an acknowledgement and acceptance of the Agreement and its modifications. 
              </Text>
          </View>

          <View style={styles.postContent}>
              <Text style={styles.postTitle}>
              Services
              </Text>

              <Text style={styles.postDescription}>
              We are a delivery service provider providing you an online platform to (a) order food online from the list of restaurants, food chains, and groceries available on the Services (“Service providers”); (b) payment for your food or product order made available to you by paying through online payment or cash at the time of us delivering your food order to your delivery address.
There will be no limitation for how many items can be ordered provided that the vehicle which will be used for the delivery of products will be a tricycle, if the rider cannot accommodate the products any longer with a motorcycle. Rest assured that the items will be packaged in a delivery box to keep the items safe.

              </Text>
          </View>

          <View style={styles.postContent}>
              <Text style={styles.postTitle}>
              Registration   
              </Text>

              <Text style={styles.postDescription}>
              Signing up to the service means we must have the following information:
              </Text>
              <Text style={styles.postDescription}>
              &nbsp;  &nbsp; &nbsp; - Your first and last name, email address, phone number, and complete address.

              </Text>
              <Text style={styles.postDescription}>
              &nbsp;  &nbsp; &nbsp; - Your email address, so we can supply you with important information like any updates or changes within the app.

              </Text>
              <Text style={styles.postDescription}>
              You are responsible for safeguarding your password. You agree that you will not disclose your password to any third party and that you will take sole responsibility for any activities or actions under your Kumasa Account, whether or not you have authorized such activities or actions. You will immediately notify us of any unauthorized use of your Kumasa Account.
              </Text>
              <Text style={styles.postDescription}>
              Please be aware that there will be a fixed delivery charge of 59 pesos since the products are in their original prices. there will be no option to cancel your order, so once you agreed to the said terms and conditions and proceeded with the checkout option, you can no longer cancel your order and it will automatically be delivered at your premise
              </Text>
          </View>

        </View>
      </ScrollView>
    )
}

export default Terms


const styles = StyleSheet.create({
    container:{
      flex:1,
    },
    header:{
      padding:30,
      alignItems: 'center',
      backgroundColor: "#00BFFF",
    },
    headerTitle:{
      fontSize:30,
      color:"#FFFFFF",
      marginTop:10,
    },
    name:{
      fontSize:22,
      color:"#FFFFFF",
      fontWeight:'600',
    },
    postContent: {
      flex: 1,
      padding:30,
    },
    postTitle:{
      fontSize:26,
      fontWeight:'600',
    },
    postDescription:{
      fontSize:16,
      marginTop:10,
    },
    tags:{
      color: '#00BFFF',
      marginTop:10,
    },
    date:{
      color: '#696969',
      marginTop:10,
    },
    avatar: {
      width: 80,
      height: 80,
      borderRadius: 35,
      borderWidth: 4,
      borderColor: "#00BFFF",
    },
    profile:{
      flexDirection: 'row',
      marginTop:20
    },
    name:{
      fontSize:22,
      color:"#00BFFF",
      fontWeight:'600',
      alignSelf:'center',
      marginLeft:10
    }, 
    shareButton: {
      marginTop:10,
      height:45,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius:30,
      backgroundColor: "#00BFFF",
    },
    shareButtonText:{
      color: "#FFFFFF",
      fontSize:20,
    }
  });
    