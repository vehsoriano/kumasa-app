import React from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions 
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
var width = Dimensions.get('window').width; //full width

function Header({navigationProps}) {

  console.log('header component')

  return (
    <View style={style.headerContainer}>
      <View style={style.menuIconHolder}>
        <TouchableOpacity 
          onPress={() => navigationProps.openDrawer()}
        >
          <Icon
            name='bars'
            size={28}
            color='#fff'
          />
        </TouchableOpacity>
      </View>
      <View style={[style.menuIconHolder, style.cartMenuHolder]}>
        <TouchableOpacity 
          onPress={() => navigationProps.navigate('Cart')}
        >
          <Icon
            name='shopping-cart'
            size={28}
            color='#fff'
          />
        </TouchableOpacity>
      </View>
    </View>
  )
}

const style = StyleSheet.create({
  headerContainer: {
    position: 'absolute',
    flex: 1,
    top: 0,
    zIndex: 10000,
    elevation: 0,
    width: width,
    height: 50,
    padding: 15,
    // justifyContent: 'center',
    backgroundColor: 'transparent',
    flexDirection: 'row'
  },
  menuIconHolder: {
    // alignItems: 'center',
    justifyContent: 'center'
  },
  cartMenuHolder: {
    marginLeft: 'auto'
  }
})

export default Header