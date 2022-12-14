const INITIAL_STATE = {
  pessoa: [],
  loading: true,

}

const contactReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'SET_CONTATO':
      return {
        ...state,
        pessoa: action.pessoa,
        loading: false
      }
    case 'SET_LOADING_CONTACT':
      return {
        ...state,
        loading: true
      }
      case 'SET_OPEN_MODAL_CONTACT':
        return {
          ...state,
          loading: true,
          openModalContact: true,
          idModalContact: action.idModalContact
        }
      case 'SET_CLOSE_MODAL_CONTACT':
          return {
            ...state,
            openModalContact: false
          }
    default:
      return state
  }
}

export default contactReducer