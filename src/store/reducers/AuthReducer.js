const INITIAL_STATE = {
  auth: {
    token: '',
    isLogged: false,
    isLoading: true
  }
}

const authReducer = (state = INITIAL_STATE, action) => {
  if (action.type === 'SET_LOGIN') {
    return {
      auth: {
        token: action.token,
        isLogged: true,
        isLoading: false
      }
    }
  }

  return state
} 

export default authReducer