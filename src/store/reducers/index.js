import { combineReducers } from "redux";

import authReducer from './AuthReducer'
import pessoaReducer from './PessoaReducer'

export default combineReducers({
  authReducer,
  pessoaReducer
})