import Logo from '../Logo'
import Menu from './Menu'
import { NavBar, LogoSideBar } from './SideBar.styled'
import {Subtitle} from '../Fonts/Fonts'

const SideBar = () => {
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
export default SideBar