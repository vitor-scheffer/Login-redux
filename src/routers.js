import { useEffect } from 'react'
import { connect } from 'react-redux'
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import Login from './pages/login/Login'
import People from './pages/people/People'
import { isAuth } from './store/actions/AuthActions'
import NotFound from './components/NotFound/NotFound'
import PeopleForm from './pages/people/PeopleForm'


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
            <Route path="/" element={<People />}></Route>
            <Route path="/cadastrar-pessoa" element={<PeopleForm />}></Route>
          </>
        ) : (
        <>
          <Route path="/login" element={<Login />}></Route>
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