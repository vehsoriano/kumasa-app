import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  ListView,
  TouchableOpacity,
  View,
  Image,
  Text,
  TouchableHighlight,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

function Accepted({route, navigation}) {

  const { userData_id } = route.params;

  return (
    <View style={styles.container}>
        <Icon
          name='thumbs-up'
          size={100}
          color='green'
        />
        <Text style={styles.title}>Congratulations {userData_id}, your order has been placed</Text>
        <Text style={styles.description}>Congratulations your order has been succesfully placed and is being processed by our Kumasa Riders</Text>
        <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} onPress={() => navigation.navigate('OrderHistory')}>
          <Text style={styles.buttonText}>Go to Orders</Text>
        </TouchableHighlight>
      </View>
  )
}

export default Accepted


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EEEEEE',
    alignItems: 'center',
    justifyContent: 'center'
    // paddingTop:50,
  },
  icon:{
    width:200,
    height:200,
  },
  title:{
    fontSize:20,
    textAlign: 'center',
    marginTop:22,
    color: "#5F6D7A"
  },
  description: {
    marginTop:20,
    textAlign: 'center',
    color: "#A9A9A9",
    fontSize:16,
    margin:40,
  },
  buttonContainer: {
    height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:20,
    width:250,
    borderRadius:30,
  },
  loginButton: {
    backgroundColor: "#3498db",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize:20,
  }
});