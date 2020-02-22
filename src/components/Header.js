import React from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image 
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
var width = Dimensions.get('window').width; //full width

import { connect, useSelector, useDispatch} from 'react-redux'


function Header({navigationProps}) {
  const cartItems = useSelector(state => state.cartItems);
  const dispatch = useDispatch();

  console.log('header component')

  return (
    <View 
      style={style.headerContainer}
    >
      <View style={style.menuIconHolder}>
        <TouchableOpacity 
          onPress={() => navigationProps.openDrawer()}
          style={style.headerIcon}
        >
          <Icon
            name='bars'
            size={28}
            color='#FC9404'
          />
        </TouchableOpacity>
      </View>
      <View style={{marginLeft: 15}}>
        <Image style={style.icon} source={{uri:'https://i.imgur.com/jaT8Frm.png'}}/>
      </View>
      <View style={[style.menuIconHolder, style.cartMenuHolder]}>
        <TouchableOpacity 
          onPress={() => navigationProps.navigate('Cart')}
          style={style.headerIcon}
        >
          <View style={{
            position: 'absolute',
            height: 27.5,
            width: 27.5,
            borderRadius: 15,
            backgroundColor: 'rgba(95,197,123,.5)',
            right: 12,
            bottom: 5,
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1
          }}>
            <Text
              style={{color: 'white',
              fontWeight: 'bold'
            }}>
              {cartItems.length}
            </Text>
          </View>
          <Icon
            name='shopping-cart'
            size={28}
            color='#FC9404'
          />
        </TouchableOpacity>
      </View>
    </View>
  )
}

const style = StyleSheet.create({
  headerContainer: {
    // position: 'absolute',
    // flex: 1,
    // top: 0,
    // left: 0,
    // right: 0,
    // bottom: 0,
    position: 'relative',
    width: width,
    height: 50,
    padding: 15,
    elevation: 1,
    // backgroundColor:'#FCFAF6',
    // zIndex: 11,
    // justifyContent: 'center',
    backgroundColor: 'transparent',
    flexDirection: 'row'
  },
  headerIcon: {
    // backgroundColor: 'red',
    // elevation: 2,
  },
  menuIconHolder: {
    // alignItems: 'center',
    justifyContent: 'center'
  },
  icon: {
    width: 160,
    height: 25,
  },
  cartMenuHolder: {
    marginLeft: 'auto'
  }
})

export default Header