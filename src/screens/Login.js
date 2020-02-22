import React, { useState } from 'react'
import { 
  View, 
  Text,
  Image,
  // TextInput, 
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Keyboard 
} from 'react-native';
import forms from '../styles/forms'
import { connect, useSelector, useDispatch} from 'react-redux'
import Toast from 'react-native-simple-toast';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import axios from 'axios'
import AsyncStorage from '@react-native-community/async-storage';
let ScreenHeight = Dimensions.get("window").height;
let ScreenWidth = Dimensions.get("window").width;
import allActions from '../actions'

function Login({navigation}) {


  // const counter = useSelector(state => state.first);
  const auth = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(false)


  /*
  * State
  */

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  /*
  * Methods
  */

  const storeData = async (value) => {
    try {
      await AsyncStorage.setItem('TOKEN', value) 
    } catch (e) {
      // saving error
    }
  }

  const storeDataID = async (value) => {
    try {
      await AsyncStorage.setItem('USER_ID', value) 
    } catch (e) {
      // saving error
    }
  }
  

  const forgotPassword = () => {
    alert('forgot password')
  }

  const handleLoginSubmit = () => {
    // if(email === '' && password === '') {
    //   dispatch({type: 'LOG_IN'})
    //   console.log('login successful')

    setLoader(true)

      const req = {
        email,
        password
      }
      
      axios.post('https://kumasa-admin.herokuapp.com/api/auth', req)
      .then(res => {
        console.log(res.data)
          storeData(res.data.token)
          Keyboard.dismiss()
          storeDataID(res.data.user)
          setLoader(false)
          dispatch(allActions.authActions.login())
          if(auth) {     
            navigation.navigate('Home')     
          } 
        })
        .catch(err => {
          setLoader(false)
          console.log(err.response.data.errors[0].msg)
          Toast.show(err.response.data.errors[0].msg);
        })

      // if(auth.isLogged) {
      //   navigation.navigate('Home')
      // } 
    // } 
    
    // else {
    //   Toast.show('wrong credentials.');
    //   dispatch({type: 'LOG_OUT'})
    // }
  }

  /*
  * Destructured Styles 
  */

  const {
    container,
    formInput,
    labelStyle,
    formGroup,
    buttonHolder,
    button,
    backgroundOrange,
    backgroundWhite,
    buttonWhite,
    buttonOrange,
    inputIcon,
  } = forms

  return (
    <>
    {
      loader ? (
        // <View style={styles.overlayContent}>
        //   <Text
        //     style={styles.overlayText}
        //   >Loading...</Text>
        // </View>
        <View style={styles.loaderHolder}>
          <Image style={styles.loaderAvatar} source={{uri:'https://i.imgur.com/jaT8Frm.png'}}/>
        </View>
      ) : (
        null
      )
    }
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Image style={styles.avatar}
              source={{uri: 'https://i.imgur.com/WNO3kFq.png'}}/>
        </View> 
      </View>
      <View style={container}>
        <View style={formGroup}>
          <Input
            label="Email"
            placeholder='johndoe@gmail.com'
            labelStyle={labelStyle}
            inputContainerStyle={formInput}
            rightIcon={
              <Icon
                name='envelope'
                size={16}
                color='#FCD69D'
              />
            }
            onChangeText={(email) => setEmail(email)}
            value={email}
          />
        </View>
        <View style={formGroup}>
          <Input
            label="Password"
            placeholder='********'
            labelStyle={labelStyle}
            inputContainerStyle={formInput}
            secureTextEntry={true}
            rightIcon={
              <Icon
                name='lock'
                size={24}
                color='#FCD69D'
              />
            }
            onChangeText={(password) => setPassword(password)}
            value={password}
          />
        </View>
        <TouchableOpacity onPress={handleLoginSubmit} style={[buttonHolder, backgroundOrange, buttonWhite]}>
          <Text style={[button, buttonWhite]}>LOGIN</Text>
        </TouchableOpacity>
        
        <Text 
          style={{marginTop: 20}}
          onPress={() => forgotPassword()}
          >Forgot Password?
        </Text>
        <Text style={{marginTop: 10}}>Don't have an account? &nbsp;  
          <Text 
            style={{textDecorationLine: 'underline'}}
            onPress={() => navigation.navigate('Signup')}
          >Sign Up</Text>
        </Text>

        {/* <TouchableOpacity
          onPress={() => dispatch({type: 'Car'})}
        >
          <Text>Car</Text>
        </TouchableOpacity>
          <Text>It is a {counter.vehicle}</Text>
        <TouchableOpacity
          onPress={() => dispatch({type: 'Bike'})}
        >
          <Text>Bike</Text>
        </TouchableOpacity> */}
      </View>
    </>
  )
}



export default Login



const styles = StyleSheet.create({


  loaderHolder: {
    position: 'absolute',
    top: 0,
    left: 0,
    flex:1,
    zIndex: 2,
    backgroundColor: '#F8E8D5',
    alignContent: 'center',
    justifyContent: 'center',
    width: ScreenWidth,
    height: ScreenHeight,
  },
  loaderAvatar: {
    width: ScreenWidth - 50,
    height: 85,
    marginLeft: 'auto',
    marginRight: 'auto'
  },

  name:{
    fontSize:22,
    color:"#ff9501",
    fontWeight:'600',
  },
  header:{
    backgroundColor: "#FCFAF6",
    // height: 200,
  },
  headerContent:{
    padding:30,
    alignItems: 'center',
  },
  avatar: {
    width: 160,
    height: 160,
    // borderRadius: 63,
    // borderWidth: 4,
    // borderColor: "white",
    // marginBottom:10,
  },


  // overlayContent: {
  //   position: 'absolute',
  //   // width: '100vw',
  //   // height: '100vh',
  //   zIndex: 5,
  //   width: ScreenWidth,
  //   height: ScreenHeight,
  //   backgroundColor: 'rgba(0,0,0,0.5)'
  // },
  
  // overlayText: {    
  //   marginTop: '50%',
  //   color: '#fff',
  //   textAlign: 'center',
  //   fontSize: 24,
  // }
})