const INITIAL_STATE = {
  pessoa: [],
  loading: true,
  openModalAddress: false,
  idModalAddress: null
}

const addressReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'SET_ENDERECO':
      return {
        ...state,
        pessoa: action.pessoa,
        loading: false
      }
    case 'SET_LOADING_ADDRESS':
      return {
        ...state,
        loading: true
      }
      case 'SET_OPEN_MODAL_ADDRESS':
        return {
          ...state,
          loading: true,
          openModalAddress: true,
          idModalAddress: action.idModalAddress
        }
      case 'SET_CLOSE_MODAL_ADDRESS':
          return {
            ...state,
            openModalAddress: false
          }
    default:
      return state
  }
}

export default addressReducer