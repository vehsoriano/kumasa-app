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

  console.log(userData)

  return (
    // <View style={styles.container}>
    //     <View style={styles.header}>
    //       <View style={styles.headerContent}>
    //           <Image style={styles.avatar}
    //             source={{uri: 'https://bootdey.com/img/Content/avatar/avatar1.png'}}/>
    //             <Text>{userData.first_name}</Text>
    //       </View>
    //     </View>
    // </View>
    <View style={styles.container}>
        <View style={styles.header}></View>
        <Image style={styles.avatar} source={{uri: 'https://bootdey.com/img/Content/avatar/avatar6.png'}}/>
        <View style={styles.body}>
          <View style={styles.bodyContent}>
            <Text style={styles.name}>{userData.first_name} {userData.last_name}</Text>
            {/* <Text style={styles.info}>{userData.email}</Text> */}
          </View>
          <View style={styles.card}>
            <Text style={styles.cardTittle}>Email:</Text>     
            <Text style={styles.description}>{userData.email}</Text>
          </View>
          <View style={styles.card}>
            <Text style={styles.cardTittle}>Phone Number:</Text>     
            <Text style={styles.description}>{userData.phone_number}</Text>
          </View>
          <View style={styles.card}>
            <Text style={styles.cardTittle}>Complete Address:</Text>     
            <Text style={styles.description}>{userData.address}, {userData.city}</Text>
          </View>
      </View>
    </View>
  )
}

export default Profile


const styles = StyleSheet.create({
  header:{
    backgroundColor: "#00BFFF",
    height:200,
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white",
    marginBottom:10,
    alignSelf:'center',
    position: 'absolute',
    marginTop:130
  },
  card:{
    backgroundColor: "#FFFFFF",
    borderRadius:10,
    padding:10,
    height:100,
    marginTop:10,
    marginHorizontal: 15,
  },
  name:{
    fontSize:22,
    color:"#FFFFFF",
    fontWeight:'600',
    marginBottom: 15,
  },
  body:{
    marginTop:40,
  },
  bodyContent: {
    flex: 1,
    alignItems: 'center',
    padding:30,
    marginBottom: 15,
  },
  name:{
    fontSize:28,
    color: "#696969",
    fontWeight: "600"
  },
  info:{
    fontSize:16,
    color: "#00BFFF",
    marginTop:10
  },
  description:{
    fontSize:16,
    color: "#696969",
    marginTop:10,
    textAlign: 'center'
  },
  buttonContainer: {
    marginTop:10,
    height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:20,
    width:250,
    borderRadius:30,
    backgroundColor: "#00BFFF",
  },
});