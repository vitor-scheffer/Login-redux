import Item from './Item'
import { Button } from '../Button/Button'
import { NavSideBar } from './NavSideBar.styled'
import { handleLogout } from '../../store/actions/AuthActions'
import { useNavigate } from 'react-router-dom'
import { connect } from 'react-redux'

const Menu = ({dispatch}) => {
  const navigate = useNavigate()
  return (
    <>
    <NavSideBar>
      <ul>
          <Item name="Pessoa" url="/pessoa"/>
          <Item name="Cadastrar Pessoa" url="/cadastrar-pessoa"/>
      </ul>
    </NavSideBar>
    <Button onClick={() => {handleLogout(dispatch, navigate)}} marginLeft='32px'>Sair</Button>
    </>
     
  )
}

export default connect()(Menu)