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


function HeaderSettings({navigationProps}) {
  const cartItems = useSelector(state => state.cartItems);
  const dispatch = useDispatch();

  console.log('header component')

  return (
    <View style={style.headerContainer}>
      <View style={style.menuIconHolder}>
      </View>
      <View>
        <Image style={style.icon} source={{uri:'https://i.imgur.com/xCpTTEB.png'}}/>
      </View>
      <View style={[style.menuIconHolder, style.cartMenuHolder]}>
        <TouchableOpacity 
          onPress={() => navigationProps.navigate('Settings')}
          style={style.headerIcon}
        >
          <Icon
            name='cog'
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

export default HeaderSettings