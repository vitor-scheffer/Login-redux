const INITIAL_STATE = {
  auth: {
    token: null,
    isLoading: true,
    isAuth: false
  }
}

const authReducer = (state = INITIAL_STATE, action) => {

  switch (action.type) {
    case 'SET_LOGIN': 
    return {
      auth: {
        token: action.token,
        isLoading: false,
        isAuth: true
      }
    }
    case 'SET_AUTH':
      return {
        auth: {
          isAuth: false
        }
      }
    case 'SET_LOGOUT':
      return {
        auth: {
          token: action.token,
          isAuth: false
        }
      }
    default:
      return state
  }
    

  
} 

export default authReducer