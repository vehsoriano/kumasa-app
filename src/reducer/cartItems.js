const cartItems = (state = [], action) => {
  switch(action.type) {
    case 'ADD_TO_CART':
      return [            
          ...state, 
          action.payload
      ]
      
    case 'REMOVE_FROM_CART':
      const arr = [...state]
      arr.splice(action.payload, 1)

      return arr
      // state.filter(cartItem=>cartItem._id !== action.payload._id)
    case 'INCREASE_ITEM_QUANTITY':
      const incState = [...state]
      let incVal = incState.find(x =>x._id === action.payload)
      incVal.initialQuantity++
      // console.log(incState)
      return incState
    case 'DECREASE_ITEM_QUANTITY':
      const decState = [...state]
      let decVal = decState.find(x =>x._id === action.payload)
      if(decVal.initialQuantity > 1) {
        decVal.initialQuantity--
      }
      return decState
    case 'REMOVE_ALL_ITEM_TO_CART':
      return state = []
    default:
      return state
  }
}

export default cartItems

