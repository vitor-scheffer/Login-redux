const INITIAL_STATE = {
  pessoas: [],
  pessoa: {},
  loading: true
}

const pessoaReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'SET_PESSOA':
      return {
        ...state,
        pessoas: action.pessoas,
      }
    case 'SET_PESSOA_BY_ID':
      return {
        ...state,
        pessoa: action.pessoa
      }
    default:
      return state
  }
}

export default pessoaReducer
