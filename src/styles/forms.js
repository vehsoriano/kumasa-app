import { StyleSheet } from 'react-native';

const forms = StyleSheet.create({
  container: {
    padding: 30,
  },
  formGroup: {
    marginBottom: 20,
  },
  formInput: {
    width: '100%',
    borderWidth: 1,
    borderColor: 'black',
    borderStyle: 'solid',
    borderRadius: 5
  },
  buttonHolder: {
    padding: 15,
    marginBottom: 20,
    alignItems: 'center',
    borderRadius: 5,
  },
  backgroundOrange: {    
    backgroundColor: 'orange',
  },
  buttonWhite: {    
    color: 'white',
  },
  backgroundWhite: {    
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'orange',
    borderStyle: 'solid',
    borderRadius: 5
  },
  buttonOrange: {    
    color: 'orange',
  },
  button: {
    fontSize: 17,
  }
});

export default forms