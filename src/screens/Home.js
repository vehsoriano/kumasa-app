import React, { useState } from 'react'
import { 
  Button, 
  View, 
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  Dimensions,
  SafeAreaView,
  TextInput,
  ImageBackground 
} from 'react-native';
import Header from '../components/Header'
import { ScrollView } from 'react-native-gesture-handler';
let ScreenHeight = Dimensions.get("window").height;
let ScreenWidth = Dimensions.get("window").width;
import axios from 'axios'

function Home({ navigation }) {

  const [branches, setBranches] = useState()
  const [searchBranch, setSearchBranches] = useState()
  const [loader, setLoader] = useState(true)

  React.useEffect(() => {
    getBranch()
  }, [])

  function getBranch() {
    axios.get('https://kumasa-admin.herokuapp.com/api/branch')
    .then(res => {
      setBranches(res.data)
      setSearchBranches(res.data)
      setLoader(false)
    })
    .catch(err => {
      console.log(err)
    })
  }

  const searchFilterFunction = (text) => {    
    const newData = searchBranch.filter(item => {   
      const itemData = `${item.name.toString().toUpperCase()}`;
      const textData = text.search.toString().toUpperCase();
      return itemData.indexOf(textData) > -1;    
    });
    setBranches(newData)
  };

  const goToChild = (item) => {
    console.log(item.name)
    navigation.navigate('Branch', {
      BranchDetailsName: item.name,
      BranchDetailsImage: item.logo,
      Branch_ID: item._id,
    })
  }

  return (
    <>
      <Header navigationProps={navigation} />
      
      <View style={styles.holderBanner}>
        <ImageBackground  
          source={{uri: 'https://i.pinimg.com/736x/e6/7d/af/e67daf68a6e8f6d4a9283cb7d64b098c.jpg'}}
          style={styles.holdeBannerText}>
          <Text style={styles.bannerText}>Restaurants/Food Beverages</Text>
        </ImageBackground >
        {/* <Image 
        style={styles.bannerImage}
          source={{uri: 'https://i.pinimg.com/736x/e6/7d/af/e67daf68a6e8f6d4a9283cb7d64b098c.jpg'}}
        ></Image> */}
      </View>
      <View style={styles.inputContainer}>
        {/* <Image style={[styles.icon, styles.inputIcon]} source={{uri: 'https://png.icons8.com/search/androidL/100/2ecc71'}}/> */}
        <TextInput style={styles.searchInput}
            placeholder="Search"
            underlineColorAndroid='transparent'
            onChangeText={(search) => searchFilterFunction({search})}/>
      </View>
      <SafeAreaView style={styles.container}>
        {
          !loader ? 
          <FlatList 
            style={styles.contentList}
            columnWrapperStyle={styles.listContainer}
            data={branches}
            keyExtractor= {(item) => {
              return item._id;
            }}
            renderItem={({item}) => {
            return (
              <View style={styles.card}>
                <Image style={styles.image} source={{uri: item.logo}}/>
                <View style={styles.cardContent}>
                  <Text style={styles.name}>{item.name}</Text>
                  <Text style={styles.count}>{item.address}</Text>
                  {/* <Text style={styles.count}>{item.count}</Text> */}
                  <TouchableOpacity style={styles.followButton} 
                  onPress={()=> goToChild(item)}>
                    <Text style={styles.followButtonText}>Explore now</Text>  
                  </TouchableOpacity>
                </View>
              </View>
            )}}/>
            : <Text style={{textAlign:'center'}}>Loading...</Text>
        }
      </SafeAreaView >
    </>
  );
}

export default Home


const styles = StyleSheet.create({

  holderBanner: {
    position: 'relative',
    height: 200,
    // marginTop: 50,
    // zIndex: -1,
    // elevation: 0,
    // marginTop:-50,
  },
  holdeBannerText: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom:0,
    justifyContent: 'center', 
    alignItems: 'center',
    margin: 'auto',
    paddingBottom: 40,
    backgroundColor: 'red',
    zIndex: 10,
  },
  bannerText: {
    fontSize:25,
    color:"#FFFFFF",
  },
  bannerImage: {
    height: 200,
    width: ScreenWidth,
  },


  inputContainer: {
    borderBottomColor: 'white',
    backgroundColor: 'white',
    borderRadius:6,
    borderBottomWidth: 1,
    height:45,
    marginTop: -65,    
    margin:20,
  },
  icon:{
    width:30,
    height:30,
  },
  searchInput:{
    height:45,
    marginLeft:16,
    borderBottomColor: '#FFFFFF',
    flex:1,
},
 



  container:{
    flex:1,
    height: ScreenHeight,
    // marginTop:50,
    // paddingBottom:20,
    backgroundColor:"#ebf0f7"
  },
  contentList:{
    flex:1,
  },
  cardContent: {
    marginLeft:20,
    // marginTop:10,
    // backgroundColor: 'red'
  },
  image:{
    width:90,
    height:90,
    borderRadius:45,
    borderWidth:2,
    borderColor:"#ebf0f7"
  },

  card:{
    marginLeft: 20,
    marginRight: 20,
    marginTop:5,
    backgroundColor:"white",
    padding: 10,
    flexDirection:'row',
    borderRadius:6,
  },

  name:{
    fontSize:18,
    flex:1,
    // alignSelf:'center',
    color:"#000",
    fontWeight:'bold'
  },
  count:{
    fontSize:14,
    flex:1,
    // alignSelf:'center',
    color:"#000"
  },
  followButton: {
    marginTop:10,
    height:35,
    width:100,
    padding:10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius:30,
    backgroundColor: "white",
    borderWidth:1,
    borderColor:"#dcdcdc",
  },
  followButtonText:{
    color: "#dcdcdc",
    fontSize:12,
  },
});  

/* <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
  <Text>Home Screen</Text>
  <Button
    title="Go to Details"
    onPress={() => {
      navigation.navigate('Details', {
        itemId: 86,
        otherParam: 'anything you want here',
      });
    }}
  />
  <Button 
    onPress={() => navigation.openDrawer()}
    title="open drawer"
  /
</View> */