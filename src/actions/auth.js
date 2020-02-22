const login = () => {
  return {
    type: "LOG_IN"
  }
}

const logout = () => {
  return {
    type: "LOG_OUT"
  }
}

export default {
  login,
  logout
}