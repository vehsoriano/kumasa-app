import React, { useState } from 'react'
import { 
  View, 
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions
} from 'react-native';
import forms from '../styles/forms'
import Toast from 'react-native-simple-toast';
import axios from 'axios'

import Icon from 'react-native-vector-icons/FontAwesome';
import { Input } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
let ScreenHeight = Dimensions.get("window").height;
let ScreenWidth = Dimensions.get("window").width;

function Signup({navigation}) {


  const [first_name, setFirstName] = useState('')
  const [last_name, setLastName] = useState('')
  const [phone_number, setPhoneNumber] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loader, setLoader] = useState(false)
  const [address, setAddress] = useState('')

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


  const handleRegisterSubmit = () => {
    console.log('register!')
    setLoader(true)
    const req = {
      first_name,
      middle_name: '',
      last_name,
      phone_number,
      email,
      address,
      city: 'Angeles City',
      province: 'Pampanga',
      role: 'customer',
      password
    }

    console.log(req)

    axios.post('https://kumasa-admin.herokuapp.com/api/users', req)
    .then(res => {
      console.log(res)
      navigation.navigate('Login')
      setLoader(false)
    })
    .catch(err => {
      console.log(err)
      console.log(err.response.data.errors[0].msg)
      Toast.show(err.response.data.errors[0].msg);
    })
  }

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
      <ScrollView>
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <Image style={styles.avatar}
                source={{uri: 'https://i.imgur.com/WNO3kFq.png'}}/>
            <Text style={styles.name}>
              Welcome to Kumasa Registration!
            </Text>
          </View> 
        </View>
        <View style={container}>
          <View style={formGroup}>            
            <Input
              label="First Name"
              placeholder='John'
              labelStyle={labelStyle}
              inputContainerStyle={formInput}
              required
              rightIcon={
                <Icon
                  name='user'
                  size={20}
                  color='#FCD69D'
                />
              }
              onChangeText={(first_name) => setFirstName(first_name)}
              value={first_name}
            />
          </View>
          <View style={formGroup}>            
            <Input
              label="Last Name"
              placeholder='Doe'
              labelStyle={labelStyle}
              inputContainerStyle={formInput}
              rightIcon={
                <Icon
                  name='user'
                  size={20}
                  color='#FCD69D'
                />
              }
              onChangeText={(last_name) => setLastName(last_name)}
              value={last_name}
            />
          </View>
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
              label="Phone Number"
              placeholder='09XXXXXXXXX'
              labelStyle={labelStyle}
              inputContainerStyle={formInput}
              keyboardType="numeric"
              rightIcon={
                <Icon
                  name='mobile'
                  size={30}
                  color='#FCD69D'
                />
              }
              onChangeText={(phone_number) => setPhoneNumber(phone_number)}
              value={phone_number}
            />
          </View>

          <View style={formGroup}>            
            <Input
              label="Complete Address (Exlude City)"
              placeholder='#15-8 San Lazaro St. Marisol'
              labelStyle={labelStyle}
              inputContainerStyle={formInput}
              rightIcon={
                <Icon
                  name='location-arrow'
                  size={20}
                  color='#FCD69D'
                />
              }
              onChangeText={(address) => setAddress(address)}
              value={address}
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
                  
          <TouchableOpacity 
            onPress={handleRegisterSubmit} 
            style={[buttonHolder, backgroundOrange, buttonWhite]}>
            <Text style={[button, buttonWhite]}>SIGN UP</Text>
          </TouchableOpacity>
          <Text style={{marginTop: 20}}>Do you have account already? &nbsp;  
            <Text 
              style={{textDecorationLine: 'underline'}}
              onPress={() => navigation.navigate('Login')}
            >Login</Text>
          </Text>
          {/* <TouchableOpacity style={[buttonHolder, backgroundWhite, buttonOrange]}>
          </TouchableOpacity> */}
        </View>
      </ScrollView>
    </>
  )
}

export default Signup

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
  }
})