import { apiDbc } from "../../services/api"
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const handleLogin = async (user, dispatch, navigate) => {
  const notify = () => toast("Seja bem vindo!")
  try {
    const {data} = await apiDbc.post('/auth', user)
    const logado = {
      type: 'SET_LOGIN',
      token: data,
    }
    apiDbc.defaults.headers.common['Authorization'] = data
    localStorage.setItem('token', data)
    dispatch(logado)
    notify()
    navigate('/pessoa')
  } catch (error) {
    console.log(error);
  }
}

const handleSignUp = async (values, dispatch, navigate) => {
  const notify = () => toast('Usuário cadastrado com sucesso');
    try {
      await apiDbc.post('/auth/create', values)
      notify()
      navigate('/')
    } catch(error){
      console.log(error)
      const notifyError = () => toast(error.response.data.message);
      notifyError()
    }

}

const handleLogout = async (dispatch, navigate) => {
  const notify = () => toast("Até logo!")
  try {
    const logado = {
      type: 'SET_LOGOUT',
      token: '',
    }
    localStorage.removeItem('token')
    dispatch(logado)
    notify()
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
      type: 'SET_AUTH',
    }
    dispatch(logado)
  }
}

export { handleLogin, handleLogout, handleSignUp, isAuth }