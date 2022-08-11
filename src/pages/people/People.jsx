import { Section } from '../../components/Section/Section'
import SideBar from '../../components/SideBar/SideBar'
import { useEffect } from 'react'
import { connect } from 'react-redux'
import UserInfo from '../../components/UserInfo'
import * as PessoaActions from '../../store/actions/PessoaActions'
import * as ContactActions from '../../store/actions/ContactActions'
import * as AddressActions from '../../store/actions/AddressActions'
import Modal from '../../Utils/Modal'
import { Button } from '../../components/Button/Button'
import { Lista, Item, TitleList } from '../../components/FlatList/Lista'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { TextSm } from '../../components/Fonts/Fonts'
import moment from "moment"
import { colorHoverMenu } from "../../consts"
import { Card } from '../../components/Card/Card'
import { ContainerPeople } from './People.styled';
import { useNavigate } from 'react-router-dom'
import Loading from '../../components/Loading/Loading'

const People = ({pessoas, loading, dispatch, openModalDelete}) => {
  const navigate = useNavigate()
  
  const setup = () => {
    PessoaActions.getPessoa(dispatch)
  }
  
  useEffect(() => {
    setup()
  },[openModalDelete]) 

  if(loading) {
    return ( <Loading /> )
  }

  return (
    <Section>
      <SideBar />
      <UserInfo tittle='Pessoas'/>
      <Card width="100%" height="100%">
      <ContainerPeople>
        <div>
          <h1>Colaboradores</h1>
          <Button onClick={() => PessoaActions.setRegisterPage(navigate, dispatch)}>Cadastrar</Button>
        </div>
        <div>
        <TitleList>
          <TextSm color={colorHoverMenu}>Nome</TextSm>
          <TextSm color={colorHoverMenu}>Data de Nascimento</TextSm>
          <TextSm color={colorHoverMenu}>Email</TextSm>
        </TitleList>
        <Lista>
          {pessoas.map(item =>(
            <Item key={item.idPessoa}>
              <TextSm>{item.nome}</TextSm>
              <TextSm>{moment(item.dataNascimento, 'YYYY-MM-DD').format('DD/MM/YYYY')}</TextSm>
              <TextSm >{item.email}</TextSm>
              <div className="btnsEdit">
                <Button onClick={() => {ContactActions.setContactPage(item.idPessoa, navigate, dispatch)}}>Contatos</Button>
                <Button onClick={() => {AddressActions.setAddressPage(item.idPessoa, navigate, dispatch)}}>Endereços</Button>
                <Button onClick={() => {PessoaActions.setUpdatePage(item.idPessoa, navigate, dispatch)}} width="80px">Editar</Button>
                <Button onClick={() => dispatch({type: 'SET_OPEN_MODAL', idModal: item.idPessoa})}width="80px">Apagar</Button>
              </div>
            </Item>
          ))} 
        </Lista>
        {openModalDelete && <Modal closeModal={PessoaActions.setModalDelete} setup={setup} dispatch={dispatch} confirmModal={PessoaActions.handleDeletePeople}/>}
        </div>
      </ContainerPeople>
      </Card>
    </Section>
  )
}

const mapStateToProps = state => ({
  pessoas: state.pessoaReducer.pessoas,
  pessoa: state.pessoaReducer.pessoa,
  loading: state.pessoaReducer.loading,
  openModalDelete: state.pessoaReducer.openModalDelete
}) 

export default connect(mapStateToProps)(People)