import { StyleSheet } from 'react-native';

const forms = StyleSheet.create({
  container: {
    padding: 30,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  formGroup: {
    borderBottomColor: '#F5FCFF',
    backgroundColor: '#FFFFFF',
    borderRadius:30,
    borderBottomWidth: 1,
    height:45,
    width: 250,
    marginBottom:20,
    flexDirection: 'row',
    alignItems:'center'
  },
  inputIcon: {
    width:30,
    height:30,
    marginLeft:15,
    justifyContent: 'center'
  },
  formInput: {
    width: '100%',
    borderBottomColor: '#FFFFFF',
  },
  buttonHolder: {
    height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:20,
    width:250,
    borderRadius:30,
  },
  backgroundOrange: {    
    backgroundColor: '#ff9501',
  },
  buttonWhite: {    
    color: 'white',
  },
  backgroundWhite: {    
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#ff9501',
    borderStyle: 'solid',
  },
  buttonOrange: {    
    color: 'orange',
  },
  button: {
    fontSize: 17,
  }
});

export default forms