function auth(state = {isLogged: false}, action){
  switch (action.type) {
    case "LOG_IN":
    return {
      isLogged: true 
    }    
    case "LOG_OUT":
    return {
      isLogged: false
    }        
    default:
      return false;
  }
}

export default auth;