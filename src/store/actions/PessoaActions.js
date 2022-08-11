import { apiDbc } from '../../services/api'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

  const getPessoa = async (dispatch) => {
    try {
      const { data } = await apiDbc.get('/pessoa?pagina=0&tamanhoDasPaginas=20')
      const pessoas = {
        type: 'SET_PESSOA',
        pessoas: data.content,
      }
      dispatch (pessoas)
    } catch (error) {
      console.log(error)
    }
  }

  const setUpdatePage = (idPessoa, navigate, dispatch) => {
    dispatch({
      type: 'SET_LOADING_PEOPLE'
    })
    navigate(`/cadastrar-pessoa/${idPessoa}`)
  }

  const setRegisterPage = (navigate, dispatch) => {
    dispatch({
      type: 'SET_LOADING_PEOPLE'
    })
    navigate('/cadastrar-pessoa')
  }

  const setUpdatePessoa = async (idPessoa, dispatch) => {
    try {
      const { data } = await apiDbc.get(`/pessoa/lista-completa?idPessoa=${idPessoa}`)
      const isUpdate = {
        type: 'SET_PESSOA_BY_ID',
        pessoa: data && data[0]
      }
      console.log(data)
      dispatch(isUpdate)
    } catch (error) {
      console.log(error)
    }
  } 

  const handleDeletePeople = async (idModal, setup, dispatch) => {
    const notify = () => toast("Usuário apagado com sucesso!");
    try {
      await apiDbc.delete(`/pessoa/${idModal}`)
      dispatch({
        type: 'SET_LOADING_PEOPLE'
      })
      setup()
      dispatch({
        type: 'SET_CLOSE_MODAL'
      })
      notify()
    } catch (error) {
      console.log(error)
    }
  }

  export const handleRegisterPeople = async (values, setup, dispatch, navigate) => {
    const notify = () => toast("Cadastro realizado com sucesso!");
    try {
      await apiDbc.post('/pessoa', values)
      dispatch({
        type: 'SET_LOADING_PEOPLE'
      })
      notify()
      navigate('/')
      setup()
    } catch (error) {
      console.log(error)
    }
  }

  export const setModalDelete = (dispatch) => {
    dispatch({
      type: 'SET_CLOSE_MODAL'
    })
  }

  export const handleUpdate = async (values, idPessoa, setup, dispatch, navigate) => {
    const notify = () => toast("Usuário modificado com sucesso!");
    try {
      await apiDbc.put(`/pessoa/${idPessoa}`, values)
      dispatch({
        type: 'SET_LOADING_PEOPLE'
      })
      notify()
      navigate('/')
      setup()
    } catch (error) {
      console.log(error)
    }
  }

  export { getPessoa, setUpdatePage, setUpdatePessoa, setRegisterPage, handleDeletePeople }