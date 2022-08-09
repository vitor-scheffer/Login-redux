import Logo from '../Logo'
import Menu from './Menu'
import { NavBar, LogoSideBar } from './NavBar.styled'
import {Subtitle} from '../Fonts/Fonts'

const NavBarLeft = () => {
  return (
    <NavBar>
      <LogoSideBar>
        <Logo />
        <Subtitle>Dashboard Kit</Subtitle>
      </LogoSideBar>
      <Menu />
    </NavBar>
  )
}
export default NavBarLeft