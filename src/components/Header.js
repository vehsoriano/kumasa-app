import React from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions 
} from 'react-native'

var width = Dimensions.get('window').width; //full width

function Header({navigationProps}) {
  return (
    <View style={style.container}>
      <View>
        <Text onPress={() => navigationProps.openDrawer()}>
          Open
        </Text>
      </View>
    </View>
  )
}

const style = StyleSheet.create({
  container: {
    position: 'absolute',
    flex: 1,
    width: width,
    height: 50,
    backgroundColor: 'red'
  }
})

export default Header