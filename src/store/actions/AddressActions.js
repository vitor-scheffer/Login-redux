import { apiDbc } from '../../services/api'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const setAddressPage = async (idPessoa, navigate, dispatch) => {
  try {
      const { data } = await apiDbc.get(`/pessoa/lista-completa?idPessoa=${idPessoa}`)
      dispatch({
        type: 'SET_ENDERECO',
        pessoa: (data[0])
      })  
  } catch (error) {
    console.log(error);
  }
  dispatch({
    type: 'SET_LOADING_ADDRESS'
  })
  navigate(`/endereco`)
}

export const setModalDelete = (dispatch) => {
  dispatch({
    type: 'SET_CLOSE_MODAL_ADDRESS'
  })
}