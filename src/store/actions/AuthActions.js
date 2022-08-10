import { apiDbc } from "../../services/api"

const handleLogin = async (user, dispatch, navigate) => {
  try {
    const {data} = await apiDbc.post('/auth', user)
    const logado = {
      type: 'SET_LOGIN',
      token: data,
    }
    apiDbc.defaults.headers.common['Authorization'] = data
    localStorage.setItem('token', data)
    dispatch(logado)
    navigate('/')
  } catch (error) {
    console.log(error);
  }
}

const isAuth = (dispatch) => {
  const token = localStorage.getItem('token')
  if (token)  {
    apiDbc.defaults.headers.common['Authorization'] = token
    const logado = {
      type: 'SET_LOGIN',
      token: token,
      isAuth: true
    }
    dispatch(logado)
  } else {
    const logado = {
      type: 'SET_LOGIN'
    }
    dispatch(logado)
  }
}

export { handleLogin, isAuth }