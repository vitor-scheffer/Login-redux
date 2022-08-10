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
      ...state,
      auth: {
        token: action.token,
        isLoading: false,
        isAuth: action.isAuth
      }
    }
    case 'SET_LOGOUT':
      return {
        auth: {
          token: action.token,
        }
      }
    default:
      return state
  }
    

  
} 

export default authReducer