import React, { useState } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
  FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-community/async-storage';
import { useSelector, useDispatch} from 'react-redux'
import allActions from '../actions'

function Settings({navigation}) {
  const auth = useSelector(state => state.auth);
  const dispatch = useDispatch();

  const [data, setData] = useState(
    [
      {
        id:1, 
        title:"Profile",      
        color:"#FF4500",
        route:"Profile", 
        image:"user"
      }, {
        id:1, 
        title: "Restaurant",     
        color:"#87CEEB",
        route: "Home", 
        image:"building"
      }, {
        id:2, 
        title: "Order History",     
        color:"#4682B4",
        route: "OrderHistory", 
        image:"history"
      }, {
        id:3, 
        title: "Terms",   
        color:"#20B2AA",
        route: "Terms", 
        image:"copy"
      }, {
        id:4, 
        title: "Logout",   
        color:"#6A5ACD",
        isLogout: true,
        route: "logout", 
        image:"share-square"
      },
    ]
  )

  function clickEventListener(route) {
    if(route === "logout") {
      logout()
      console.log('logout me!')
    } else {
      navigation.navigate(route)
    }
  }

  const removeToken = async () => {
    try {
      await AsyncStorage.removeItem('TOKEN');
      return true;
    }
    catch(exception) {
      return false;
    }
  }

  const removeTokenID = async () => {
    try {
      await AsyncStorage.removeItem('USER_ID');
      return true;
    }
    catch(exception) {
      return false;
    }
  }

  const logout = () => {
    // dispatch({type: 'LOG_OUT'})
    removeToken()
    removeTokenID()
    clearAsyncStorage()
    dispatch(allActions.authActions.logout())
  } 
  
  const clearAsyncStorage = async() => {
    AsyncStorage.clear();
  }

  return (
    <View style={styles.container}>
        <FlatList style={styles.list}
          contentContainerStyle={styles.listContainer}
          data={data}
          horizontal={false}
          numColumns={2}
          keyExtractor= {(item) => {
            return item.id;
          }}
          renderItem={({item}) => {
            return (
              <TouchableOpacity style={[styles.card, {backgroundColor:item.color}]} onPress={() => {clickEventListener(item.route)}}>
                <View style={styles.cardHeader}>
                  <Text style={styles.title}>{item.title}</Text>                  
                  {/* <Image style={styles.icon} source={{uri:"https://img.icons8.com/ios/40/000000/settings.png"}}/> */}
                </View>
                {/* <Image style={styles.cardImage} source={{uri:item.image}}/> */}
                <Icon
                  style={styles.cardImage}
                  name={item.image}
                  size={70}
                  color='#fff'
                />
                <View style={styles.cardFooter}>
                  <Text style={styles.subTitle}></Text>
                </View>
              </TouchableOpacity>
            )
          }}/>
      </View>
 
  )
}

export default Settings


const styles = StyleSheet.create({
  container:{
    flex:1,
    marginTop:20,
  },
  list: {
    //paddingHorizontal: 5,
    backgroundColor:"#E6E6E6",
  },
  listContainer:{
    alignItems:'center'
  },
  /******** card **************/
  card:{
    marginHorizontal:2,
    marginVertical:2,
    flexBasis: '48%',
  },
  cardHeader: {
    paddingVertical: 17,
    paddingHorizontal: 16,
    borderTopLeftRadius: 1,
    borderTopRightRadius: 1,
    flexDirection: 'row',
    alignItems:"center", 
    justifyContent:"center"
  },
  cardContent: {
    paddingVertical: 12.5,
    paddingHorizontal: 16,
  },
  cardFooter:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 12.5,
    paddingBottom: 25,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 1,
    borderBottomRightRadius: 1,
  },
  cardImage:{
    height: 70,
    width: 70,
    alignSelf:'center'
  },
  title:{
    fontSize:16,
    flex:1,
    color:"#FFFFFF",
    fontWeight:'bold'
  },
  subTitle:{
    fontSize:12,
    flex:1,
    color:"#FFFFFF",
  },
  icon:{
    height: 20,
    width: 20, 
  }
}); 