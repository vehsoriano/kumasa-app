import React, { useState, useEffect }from 'react'
import { 
  View, 
  Text,
  Image,
  TextInput, 
  TouchableOpacity,
  StyleSheet 
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

function Profile() {
  const [userData, setUserData] = useState('')

  useEffect(() => {
    getToken()
  }, [])

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

  return (
    <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerContent}>
              <Image style={styles.avatar}
                source={{uri: 'https://bootdey.com/img/Content/avatar/avatar1.png'}}/>
                <Text>{userData.first_name}</Text>
          </View>
        </View>
    </View>
  )
}

export default Profile


const styles = StyleSheet.create({
  header:{
    backgroundColor: "#00BFFF",
  },
  headerContent:{
    padding:30,
    alignItems: 'center',
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white",
    marginBottom:10,
  },
  name:{
    fontSize:22,
    color:"#FFFFFF",
    fontWeight:'600',
  },

  bodyContent: {
    flex: 1,
    alignItems: 'center',
    padding:30,
  },
  textInfo:{
    fontSize:18,
    marginTop:20,
    color: "#696969",
  },
});