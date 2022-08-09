import {useNavigate} from 'react-router-dom'
import {useEffect, useContext} from 'react'
import { AuthContext } from '../../context/AuthContext'
import Item from './Item'
import { Button } from '../Button/Button'
import { NavSideBar } from './NavSideBar.styled'

const Menu = () => {
  const {handleLogout} = useContext(AuthContext)
  return (
    <>
    <NavSideBar>
      <ul>
          <Item name="Pessoa" url="/pessoa"/>
          <Item name="Cadastrar Pessoa" url="/cadastro"/>
      </ul>
    </NavSideBar>
    <Button marginLeft='32px' onClick={handleLogout}>Sair</Button>
    </>
     
  )
}
export default Menu