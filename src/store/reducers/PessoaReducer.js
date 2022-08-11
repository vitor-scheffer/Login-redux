const INITIAL_STATE = {
  pessoas: [],
  pessoa: {},
  loading: true,
  isUpdate: false,
  openModalDelete: false,
  idModal: null
}

const pessoaReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'SET_PESSOA':
      return {
        ...state,
        pessoas: action.pessoas,
        loading: false
      }
    case 'SET_PESSOA_BY_ID':
      return {
        ...state,
        pessoa: action.pessoa,
        isUpdate: true,
        loading: false
      }
    case 'SET_LOADING_PEOPLE':
      return {
        ...state,
        loading: true
      }
    case 'SET_IS_UPDATE':
      return {
        ...state,
        isUpdate: false,
        loading: false
      }
    case 'SET_OPEN_MODAL':
      return {
        ...state,
        loading: true,
        openModalDelete: true,
        idModal: action.idModal
      }
    case 'SET_CLOSE_MODAL':
        return {
          ...state,
          openModalDelete: false
        }
    default:
      return state
  }
}

export default pessoaReducer
