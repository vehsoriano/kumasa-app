const addToCart = (postItem) => {
  return {
    type: "ADD_TO_CART",
    payload: postItem
  }
}

const removeToCart = (id) => {
  return {
    type: "REMOVE_FROM_CART",
    payload: id
  }
}

const $REMOVE_ALL = () => {
  return {
    type: "REMOVE_ALL_ITEM_TO_CART",
  }
}

const increaseQTY = (id) => {
  return {
    type: "INCREASE_ITEM_QUANTITY",
    payload: id
  }
}

const decreaseQTY = (id) => {
  return {
    type: "DECREASE_ITEM_QUANTITY",
    payload: id
  }
}

const updateStatus = (id) => {
  return {
    type: "UPDATE_STATE_CART",
    payload:id
  }
}

export default {
  addToCart,
  removeToCart,
  increaseQTY,
  decreaseQTY,
  $REMOVE_ALL,
  updateStatus
}