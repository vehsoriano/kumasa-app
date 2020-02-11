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

function Home({ navigation }) {


  const [branches, setBranches] = useState(
    [
      {id:1,  name: "Mcdo",   image:"https://img.favpng.com/12/1/24/fast-food-mcdonald-s-logo-golden-arches-restaurant-png-favpng-FqDkHQgyYqDyRaha1Xs5qdMwU.jpg",           count:124.711},
      {id:2,  name: "Jollibee",    image:"https://i.dlpng.com/static/png/438536_thumb.png",       count:234.722},
      {id:3,  name: "KFC",       image:"https://pngimg.com/uploads/kfc/kfc_PNG37.png", count:324.723} ,
      {id:4,  name: "Chowking",   image:"https://upload.wikimedia.org/wikipedia/en/thumb/9/9b/Chowking_logo_with_CK.png/220px-Chowking_logo_with_CK.png",    count:154.573} ,
      {id:5,  name: "Burger King",   image:"https://www.alamosa.org/media/com_mtree/images/listings/m/1041.png",        count:124.678} ,
      {id:6,  name: "Greenwich",   image:"https://upload.wikimedia.org/wikipedia/en/thumb/3/3e/Greenwich_pizza.png/220px-Greenwich_pizza.png",        count:124.678} ,
      {id:7,  name: "Yellow Cab",   image:"https://zaidg.com/ContentFiles/96Logo.png",        count:124.678} ,
      {id:8,  name: "Taste from the Greens",   image:"https://img.icons8.com/color/100/000000/land-sales.png",        count:124.678} ,
    ]
  )

  const origData = [
    {id:1,  name: "Mcdo",   image:"https://img.favpng.com/12/1/24/fast-food-mcdonald-s-logo-golden-arches-restaurant-png-favpng-FqDkHQgyYqDyRaha1Xs5qdMwU.jpg",           count:124.711},
    {id:2,  name: "Jollibee",    image:"https://i.dlpng.com/static/png/438536_thumb.png",       count:234.722},
    {id:3,  name: "KFC",       image:"https://pngimg.com/uploads/kfc/kfc_PNG37.png", count:324.723} ,
    {id:4,  name: "Chowking",   image:"https://upload.wikimedia.org/wikipedia/en/thumb/9/9b/Chowking_logo_with_CK.png/220px-Chowking_logo_with_CK.png",    count:154.573} ,
    {id:5,  name: "Burger King",   image:"https://www.alamosa.org/media/com_mtree/images/listings/m/1041.png",        count:124.678} ,
    {id:6,  name: "Greenwich",   image:"https://upload.wikimedia.org/wikipedia/en/thumb/3/3e/Greenwich_pizza.png/220px-Greenwich_pizza.png",        count:124.678} ,
    {id:7,  name: "Yellow Cab",   image:"https://zaidg.com/ContentFiles/96Logo.png",        count:124.678} ,
    {id:8,  name: "Taste from the Greens",   image:"https://img.icons8.com/color/100/000000/land-sales.png",        count:124.678} ,
  ]


  const searchFilterFunction = (text) => {    
    const newData = origData.filter(item => {   
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
      BranchDetailsImage: item.image,
    })
  }

  return (
    <>
      {/* <Header navigationProps={navigation}/> */}
      
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
        <FlatList 
          style={styles.contentList}
          columnWrapperStyle={styles.listContainer}
          data={branches}
          keyExtractor= {(item) => {
            return item.id;
          }}
          renderItem={({item}) => {
          return (
            <View style={styles.card}>
              <Image style={styles.image} source={{uri: item.image}}/>
              <View style={styles.cardContent}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.count}>{item.count}</Text>
                <TouchableOpacity style={styles.followButton} 
                onPress={()=> goToChild(item)}>
                  <Text style={styles.followButtonText}>Explore now</Text>  
                </TouchableOpacity>
              </View>
            </View>
          )}}/>
      </SafeAreaView >
    </>
  );
}

export default Home


const styles = StyleSheet.create({

  holderBanner: {
    position: 'relative',
    height: 200,
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
    marginTop:10
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