function vehicle(state = {vehicle: ''}, action){
  switch (action.type) {
    case "Car":
    return {
      vehicle: "Car"
    };
    case "Bike":
    return {
      vehicle: "Bike"
    };
    default:
      return "No";
  }
}

export default vehicle;