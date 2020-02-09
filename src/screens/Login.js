import React, { useState } from 'react'
import { 
  View, 
  Text,
  TextInput, 
  TouchableOpacity 
} from 'react-native';
import forms from '../styles/forms'
import { connect, useSelector, useDispatch} from 'react-redux'

function Login({navigation}) {

  const counter = useSelector(state => state.first);
  const dispatch = useDispatch();

  /*
  * State
  */

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [value, setValue] = useState(1)


  /*
  * Methods
  */

  const handleLoginSubmit = () => {
    if(email === 'admin' && password === 'admin') {
      console.log('login successful')
      navigation.navigate('Home')
    } else {
      console.log('wrong credentials')
    }
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
    buttonOrange
  } = forms

  return (
    <View style={container}>

      <View>
        
      </View>

      <View style={formGroup}>
        <TextInput 
          style={formInput}
          placeholder="Email"
          onChangeText={(email) => setEmail(email)}
          value={email}
        />
      </View>
      <View style={formGroup}>
        <TextInput 
          style={formInput}
          placeholder="Password"
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
          value={password}
        />
      </View>
      <TouchableOpacity 
        onPress={handleLoginSubmit}
        style={[buttonHolder, backgroundOrange, buttonWhite]}
      >
        <Text style={[button, buttonWhite]}>LOG IN</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        onPress={handleSignupSubmit}
        style={[buttonHolder, backgroundWhite, buttonOrange]}
      >
        <Text style={[button, buttonOrange]}>SIGN UP</Text>
      </TouchableOpacity>




      <TouchableOpacity
        onPress={() => dispatch({type: 'Car'})}
      >
        <Text>Car</Text>
      </TouchableOpacity>
        <Text>It is a {counter.vehicle}</Text>
      <TouchableOpacity
         onPress={() => dispatch({type: 'Bike'})}
      >
        <Text>Bike</Text>
      </TouchableOpacity>
    </View>
  )
}



export default Login



