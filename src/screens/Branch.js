import React, { useState } from 'react'
import axios from 'axios'
import { 
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
  FlatList,
  ImageBackground,
  Dimensions,
} from 'react-native';
let ScreenHeight = Dimensions.get("window").height;
let ScreenWidth = Dimensions.get("window").width;
import Icon from 'react-native-vector-icons/FontAwesome';
import Header from '../components/Header'
import allActions from '../actions'


// Redux

import { useSelector, useDispatch } from 'react-redux'

function Branch({route, navigation}) {
  const { BranchDetailsName, BranchDetailsImage, Branch_ID } = route.params;


  // Redux
  const cartItems = useSelector(state => state.cartItems);
  const dispatch = useDispatch()

  const [itemList, setItemList] = useState()
  // const [searchItemList, setSearchItemList] = useState()
  const [loader, setLoader] = useState(true)

  React.useEffect(() => {
    console.log('change route')
    // setLoader(false) //temp
    setLoader(true)
    getBranchItems()
  }, [Branch_ID])

  function getBranchItems() {
    axios.get(`https://kumasa-admin.herokuapp.com/api/item/branch/${Branch_ID}`)
    .then(res => {
      setItemList(res.data)
      // setSearchItemList(res.data)
      setLoader(false)
    })
    .catch(err => {
      console.log(err)
    })
  }

  const addProductToCart = (item) => {
    // console.log(item.item._id)
    
    console.log('------------------------')
    console.log(item.item)

    // const cart = {item.item}

    dispatch(allActions.cartActions.addToCart(item.item))
    // setItemList((state) => {
    //   // console.log(state)
    //   let val = state.find(x => x._id === id.item._id)
    //   val.isAdded = !val.isAdded
    //   return([
    //     ...state
    //     ]
    //   )
    // })
  }

  console.log(itemList)

  // console.log('------------------------')
  console.log(cartItems)


  const [viewWidth, setViewWidth] = useState(0)
  const [viewHeight, setViewHeight] = useState(0)

  function find_dimesions(layout){
    const {x, y, width, height} = layout;
    // console.warn(x);
    // console.warn(y);
    // console.log(width);
    setViewWidth(width)
    setViewHeight(height)
    // console.warn(height);
  }

  // console.log(loader)
  
  return (
    <>    
      <Header navigationProps={navigation} />
      <View style={styles.container}>
          <View style={styles.holderBanner}>
            {
              BranchDetailsName ? (          
                <ImageBackground  
                  source={{uri: `${BranchDetailsImage}`}}
                  style={styles.holdeBannerText}>
                  <Text style={styles.bannerText}>{BranchDetailsName}</Text>
                </ImageBackground >
              ) : 
              (null)
            }
          </View>
          {
            !loader ? 
            (
              itemList.length !== 0 ?
              <FlatList style={styles.list}
                contentContainerStyle={styles.listContainer}
                data={itemList}
                horizontal={false}
                numColumns={2}
                keyExtractor= {(item) => {
                  return item.id;
                }}
                ItemSeparatorComponent={() => {
                  return (
                    <View style={styles.separator}/>
                  )
                }}
                renderItem={(post) => {
                  const item = post.item;

                  return (
                    <View 
                      onLayout={(event) => { find_dimesions(event.nativeEvent.layout) }}
                      style={styles.card}
                    >                
                      <View style={styles.cardHeader}>
                        <View>
                          <Text style={styles.title}>{item.item_name}</Text>
                          <Text style={styles.price}>Php {item.price}.00</Text>
                        </View>                        
                      </View>
                      <Image style={styles.cardImage} source={{uri:item.logo}}/>
                      <View style={styles.cardFooter}>
                        <View style={styles.socialBarContainer}>
                        {/* addProductToCart(post)} */}
                          {
                            !item.isAdded ? (
                              <View style={styles.socialBarSection}>
                                <TouchableOpacity style={styles.socialBarButton} onPress={() => addProductToCart(post)}>
                                  {/* <Image style={styles.icon} source={{uri: 'https://png.icons8.com/nolan/96/3498db/add-shopping-cart.png'}}/> */}
                                  <Icon
                                    name='cart-plus'
                                    size={20}
                                    color='#000'
                                  />
                                  <Text style={[styles.socialBarLabel, styles.buyNow]}>Add To Cart</Text>
                                </TouchableOpacity>
                              </View>
                            ) : (
                              <View style={styles.socialBarSection}>
                                <Icon
                                  name='check-square'
                                  size={20}
                                  color='green'
                                />
                                <Text style={[styles.socialBarLabel, styles.buyNow]}>Added</Text>
                              </View>
                            )
                          }                          
                          {/* <View style={styles.socialBarSection}>
                            <TouchableOpacity style={styles.socialBarButton}>
                              <Image style={styles.icon} source={{uri: 'https://png.icons8.com/color/50/000000/hearts.png'}}/>
                              <Text style={styles.socialBarLabel}>25</Text>
                            </TouchableOpacity>
                          </View> */}
                        </View>
                      </View>  
                      { 
                        item.status === "Available" ? (
                          null
                        ) : (
                          <View style={{
                            position: 'absolute',
                            backgroundColor: 'rgba(0,0,0,.65)',
                            height: viewHeight,
                            width: viewWidth,
                            zIndex: 11,   
                            alignContent: 'flex-end',
                            justifyContent: 'flex-end'                    
                          }}>
                            <Text style={{
                              color: '#fff',
                              backgroundColor:'red',
                              textAlign: 'center',
                              fontSize: 20
                              
                              
                            }}>{item.status}</Text>
                          </View>  
                        )
                      }              
                    </View>
                  )            
              }}/> 
              : <Text style={{textAlign:'center'}}>Empty</Text>
            )
            : <Text style={{textAlign:'center'}}>Loading...</Text>
          }
      </View>
    </>
  )
}


export default Branch


const styles = StyleSheet.create({
  container:{
    position: 'relative',
    flex:1,
    // elevation: 0,
    // marginTop:-50,
  },
  list: {
    paddingHorizontal: 5,
    backgroundColor:"#E6E6E6",
  },
  listContainer:{
    alignItems:'center'
  },
  separator: {
    marginTop: 10,
  },
  /******** card **************/
  card:{
    position: 'relative',
    shadowColor: '#00000021',
    shadowOffset: {
      width: 2
    },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    marginVertical: 8,
    backgroundColor:"white",
    flexBasis: '45%',
    marginHorizontal: 12,
  },
  cardHeader: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderTopLeftRadius: 1,
    borderTopRightRadius: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardContent: {
    paddingVertical: 12.5,
    paddingHorizontal: 16,
  },
  cardFooter:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 12.5,
    paddingBottom: 12.5,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 1,
    borderBottomRightRadius: 1,
  },
  cardImage:{
    flex: 1,
    height: 120,
    width: null,
  },
  /******** card components **************/
  title:{
    fontSize:18,
    flex:1,
    fontWeight: 'bold'
  },
  price:{
    fontSize:14,
    color: "#000",
  },
  buyNow:{
    marginLeft: 5,
    color: "#000",
  },
  icon: {
    width:25,
    height:25,
  },
  /******** social bar ******************/
  socialBarContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    flex: 1
  },
  socialBarSection: {
    justifyContent: 'center',
    flexDirection: 'row',
    flex: 1,
    // backgroundColor: 'red'
  },
  socialBarlabel: {
    marginLeft: 8,
    alignSelf: 'flex-end',
    justifyContent: 'center',
  },
  socialBarButton:{
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },













  holderBanner: {
    position: 'relative',
    height: 200,
    zIndex: 9,
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
});



