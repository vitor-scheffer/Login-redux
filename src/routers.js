import { useEffect } from 'react'
import { connect } from 'react-redux'
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import Login from './pages/login/Login'
import People from './pages/people/People'
import { isAuth } from './store/actions/AuthActions'
import NotFound from './components/NotFound/NotFound'
import PeopleForm from './pages/people/PeopleForm'
import SignUp from './pages/signup/SignUp'
import ContactForm from './pages/contact/ContactForm'
import AddressForm from './pages/address/AddressForm'
import Address from './pages/address/Address'
import Contact from './pages/contact/Contact'


const Routers = ({auth, dispatch}) => {

  useEffect(() => {
    isAuth(dispatch)
  },[])

  if (auth.isLoading) {
    return (<h1>Loading</h1>)
  }

  return (
    <BrowserRouter>
      <Routes>
        {auth.isAuth ? (
          <>
            <Route path="/pessoa" element={<People />}></Route>
            <Route path="/cadastrar-pessoa" element={<PeopleForm />}></Route>
            <Route path="/cadastrar-pessoa/:idPessoa" element={<PeopleForm />}></Route>
            <Route path="/endereco" element={<Address />}></Route>
            <Route path="/cadastrar-endereco/:id" element={<AddressForm />}></Route>
            <Route path="/cadastrar-endereco/:id/:idEndereco" element={<AddressForm />}></Route>
            <Route path="/contato" element={<Contact />}></Route>
            <Route path="/cadastrar-contato/:id" element={<ContactForm />}></Route>
            <Route path="/cadastrar-contato/:id/:idContato" element={<ContactForm />}></Route>
          </>
        ) : (
        <>
          <Route path="/" element={<Login />}></Route>
          <Route path="/cadastrar-usuario" element={<SignUp />}></Route>
        </>
        )}
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

const mapStateToProps = state => ({
  auth: state.authReducer.auth
})

export default connect(mapStateToProps)(Routers)