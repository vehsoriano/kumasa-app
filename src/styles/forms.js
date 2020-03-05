import { StyleSheet } from 'react-native';

const forms = StyleSheet.create({
  container: {
    padding: 30,
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  formGroup: {
    borderBottomColor: '#F5FCFF',
    // backgroundColor: '#FFFFFF',
    borderRadius:30,
    // borderBottomWidth: 1,
    height:45,
    // width: 300,
    marginBottom:50,
    flexDirection: 'row',
    // alignItems:'center'
  },
  // inputIcon: {
  //   width:30,
  //   height:30,
  //   marginLeft:15,
  //   justifyContent: 'center'
  // },
  formInput: {
    width: '100%',
    // borderBottomWidth: 1,
    borderBottomColor: '#FCD69D',
  },
  labelStyle: {
    color: '#FCD69D'
  },

  buttonHolder: {
    height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop:20,
    width: 315,
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