import { PageNotFound, TitleNotFound } from "./NotFound.styled"
import astronaut from '../../images/astronaut.svg'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <PageNotFound>
      <TitleNotFound>Página não encontrada</TitleNotFound>
      <img src={astronaut} alt="" />
      <Link to="/"><TitleNotFound>Back to home</TitleNotFound></Link>
    </PageNotFound>
  )
}
export default NotFound