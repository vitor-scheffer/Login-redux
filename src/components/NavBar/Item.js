import { Link } from "react-router-dom"
import { Text } from '../Fonts/Fonts'

const Item = ({name, url}) => {
  return (
    <>
      <Link to={url}><li><Text>{name}</Text></li></Link>
    </>
  )
}
export default Item