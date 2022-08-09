import userPhoto from '../images/vitor.jpg'
import search from '../images/search.svg'
import notify from '../images/new.svg'
import { TextSm } from './Fonts/Fonts'
import { UserInfoContainer } from './UserInfo.styled'

const UserInfo = ({tittle}) => {
  return (
    <UserInfoContainer>
      <h2>{tittle}</h2>
      <div>
        <div>
          <img src={search} alt="" />
          <img src={notify} alt="" />
        </div>
        <div>
          <TextSm>Vitor</TextSm>
          <img src={userPhoto} alt="" />
        </div>
      </div>
    </UserInfoContainer>
  )
}
export default UserInfo