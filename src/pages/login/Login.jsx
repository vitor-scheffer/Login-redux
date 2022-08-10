import { useFormik } from 'formik'
import { ContainerLogin } from './Login.styled'
import { Link } from 'react-router-dom'
import Logo from '../../components/Logo'
import { Subtitle, Tittle, TextSm } from '../../components/Fonts/Fonts'
import { Card } from '../../components/Card/Card'
import { colorHoverMenu, colorPrimary } from '../../consts'
import { Button } from '../../components/Button/Button'
import { ErrorsAlert } from '../../components/ErrorsAlert'
import { connect } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import * as AuthActions from '../../store/actions/AuthActions'


const validate = values => {
  const errors = {};
  if (!values.login) {
    errors.login = 'Insira seu email.';
  }

  if (!values.senha) {
    errors.senha = 'Insira sua senha.';
  } 

  return errors;
};

const Login = ({auth, handleLogin}) => {
  const navigate = useNavigate()
  const formik = useFormik({
    initialValues: {
      login: '',
      senha: ''
    },
    validate,
    onSubmit: (values, {resetForm}) => {
      handleLogin(values)
      resetForm()
    }
  })
  console.log(auth)

  return (
    <ContainerLogin>
      <Card height='582px' width='380px'>
        <Logo />
        <Subtitle paddingBottom="32px">Dashboard Kit</Subtitle>
        <Tittle paddingBottom="12px">Log In to Dashboard Kit</Tittle>
        <TextSm color={colorHoverMenu}>Enter your email and password below</TextSm>
        <form onSubmit={formik.handleSubmit}>
          <div>
          <label htmlFor="login"><TextSm color={colorHoverMenu} fontSize='12px'>EMAIL</TextSm></label>
          <input type="text"
            placeholder="Email address"
            id="login"
            name="login"
            onChange={formik.handleChange}
            value={formik.values.login}
          />
          {formik.errors.login ? <ErrorsAlert>{formik.errors.login}</ErrorsAlert> : null}
          </div>
          <div>
          <label htmlFor="senha"><TextSm color={colorHoverMenu} fontSize='12px'>PASSWORD</TextSm></label>
          <input type="password"
            placeholder="Password"
            id="senha"
            name="senha"
            onChange={formik.handleChange}
            value={formik.values.senha}
          />
          {formik.errors.senha ? <ErrorsAlert>{formik.errors.senha}</ErrorsAlert> : null}
          </div>
          <Button width='100%'>Log In</Button>     
        </form>
        <div>
          <TextSm color={colorHoverMenu}>Don’t have an account?</TextSm>
          <Link to='/usuarios'><TextSm color={colorPrimary}>Sign up</TextSm></Link>
        </div> 
      </Card>
    </ContainerLogin>
  )
}

const mapDispatchToProps = (dispatch, navigate) => ({
  handleLogin: (values) => dispatch(AuthActions.handleLogin(values, dispatch, navigate))
}) 

const mapStateToProps = state => ({
  auth: state.authReducer.auth
})

export default connect(mapStateToProps, mapDispatchToProps)(Login);