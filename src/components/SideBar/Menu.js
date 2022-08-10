import Item from './Item'
import { Button } from '../Button/Button'
import { NavSideBar } from './NavSideBar.styled'

const Menu = () => {
  return (
    <>
    <NavSideBar>
      <ul>
          <Item name="Pessoa" url="/"/>
          <Item name="Cadastrar Pessoa" url="/cadastrar-pessoa"/>
      </ul>
    </NavSideBar>
    <Button marginLeft='32px'>Sair</Button>
    </>
     
  )
}
export default Menu