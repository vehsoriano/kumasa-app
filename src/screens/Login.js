import React, { useState } from 'react'
import { 
  View, 
  Text,
  Image,
  TextInput, 
  TouchableOpacity 
} from 'react-native';
import forms from '../styles/forms'
import { connect, useSelector, useDispatch} from 'react-redux'
import Toast from 'react-native-simple-toast';
import axios from 'axios'
import AsyncStorage from '@react-native-community/async-storage';

function Login({navigation}) {


  // const counter = useSelector(state => state.first);
  const auth = useSelector(state => state.authenticate);
  const dispatch = useDispatch();


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

  const handleLoginSubmit = () => {
    // if(email === '' && password === '') {
    //   dispatch({type: 'LOG_IN'})
    //   console.log('login successful')

      const req = {
        email,
        password
      }
      
      axios.post('https://kumasa-admin.herokuapp.com/api/auth', req)
      .then(res => {
          storeData(res.data.token)
          dispatch({type: 'LOG_IN'})
          if(auth.isLogged) {     
            navigation.navigate('Home')     
          } 
        })
        .catch(err => {
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

  const handleSignupSubmit = () => {
    navigation.navigate('Signup')
  }

  /*
  * Destructured Styles 
  */

  const {
    container,
    formInput,
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
    <View style={container}>
      <View style={formGroup}>
        <Image style={inputIcon} source={{uri: 'https://icons-for-free.com/iconfiles/png/512/email+email+notification+notification+icon-1320165659956528478.png'}}/>
        <TextInput 
          style={formInput}
          placeholder="Email"
          onChangeText={(email) => setEmail(email)}
          value={email}
        />
      </View>
      <View style={formGroup}>
        <Image style={inputIcon} source={{uri: 'https://www.pinclipart.com/picdir/middle/175-1755232_create-icons-from-png-jpg-images-online-password.png'}}/>
        <TextInput 
          style={formInput}
          placeholder="Password"
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
          value={password}
        />
      </View>
      <TouchableOpacity onPress={handleLoginSubmit} style={[buttonHolder, backgroundOrange, buttonWhite]}>
        <Text style={[button, buttonWhite]}>LOG IN</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleSignupSubmit} style={[buttonHolder, backgroundWhite, buttonOrange]}>
        <Text style={[button, buttonOrange]}>SIGN UP</Text>
      </TouchableOpacity>

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
  )
}



export default Login



