import { combineReducers } from "redux";

import authReducer from './AuthReducer'
import pessoaReducer from './PessoaReducer'
import addressReducer from './AddressReducer'
import contactReducer from './ContactReducer'

export default combineReducers({
  authReducer,
  pessoaReducer,
  addressReducer,
  contactReducer
})