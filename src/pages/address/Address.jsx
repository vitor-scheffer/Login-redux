import { ModalEndereco, Body } from '../../Utils/Modal.styled'
import { Button } from '../../components/Button/Button'
import { redColor, colorHoverMenu } from '../../consts'
import { useState, useEffect } from 'react'
import { apiDbc } from '../../services/api' 
import {Subtitle, Text, TextSm } from '../../components/Fonts/Fonts'
import { Lista, Item, TitleList } from '../../components/FlatList/Lista'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import moment from 'moment'
import photo from '../../images/no-user.jpeg'
import ModalAddress from '../../Utils/ModalAddress'
import { connect } from 'react-redux'
import Loading from '../../components/Loading/Loading'
import * as AddressActions from '../../store/actions/AddressActions'

const Address = ({pessoa, loading, dispatch, openModalAddress}) => {
  const navigate = useNavigate()

  const handleDelete = async (idModal, dispatch, navigate) => {
    const notify = () => toast("Endereço excluído com sucesso!");
    try {
      await apiDbc.delete(`/endereco/${idModal}`)
    } catch (error) {
      console.log(error)
    }
    notify()
    dispatch({
      type: 'SET_CLOSE_MODAL_ADDRESS'
    }) 
    navigate('/pessoa')
  }

  
  useEffect(() => {
  },[openModalAddress])

    return (
      <div className="modalBackgroundEnd">
      <ToastContainer />
      <ModalEndereco>
        <Button width="80px" padding="10px" className="closeBtn" onClick={() => navigate('/pessoa')}> Voltar </Button>
        <div className="infoPessoa">
          <div>
          <img src={photo} alt="" />
          <Subtitle>{pessoa.nome}</Subtitle>
          </div>

        <div className="datasUser">
          <TextSm>{pessoa.email}</TextSm>
          <TextSm>Data de Nascimento: {moment(pessoa.dataNascimento, 'YYYY-MM-DD').format('DD/MM/YYYY')}</TextSm>
          <TextSm>CPF: {pessoa.cpf}</TextSm>
        </div>
        </div>
        <Body>
        <nav>
          <ul>
            <li><TextSm color={colorHoverMenu}>Tipo</TextSm> </li>
            <li><TextSm color={colorHoverMenu}>CEP</TextSm> </li>
            <li><TextSm color={colorHoverMenu}>Rua</TextSm> </li>
            <li><TextSm color={colorHoverMenu}>Nº</TextSm> </li>
            <li><TextSm color={colorHoverMenu}>Complemento</TextSm> </li>
            <li><TextSm color={colorHoverMenu}>Cidade</TextSm> </li>
            <li><TextSm color={colorHoverMenu}>UF</TextSm> </li>
            <li><TextSm color={colorHoverMenu}>País</TextSm> </li>
          </ul>
        </nav>
        <Lista>
          {pessoa.enderecos.length > 0 ?
          pessoa.enderecos.map(item =>(
            <Item key={item.idEndereco}>
              <p><TextSm>{item.tipo}</TextSm></p>
              <p><TextSm>{item.cep}</TextSm></p>
              <p><TextSm>{item.logradouro}</TextSm></p>
              <p><TextSm>{item.numero}</TextSm></p>
              <p><TextSm>{item.complemento}</TextSm></p>
              <p><TextSm>{item.cidade}</TextSm></p>
              <p><TextSm>{item.estado}</TextSm></p>
              <p><TextSm>{item.pais}</TextSm></p>
              <div className="btnsEdit btnsEditModal">
                <Button width="150px" onClick={() => navigate(`/cadastrar-endereco/${pessoa.idPessoa}/${item.idEndereco}`)}>Editar Endereço</Button>
                <Button width="150px" onClick={() => dispatch({type: 'SET_OPEN_MODAL_ADDRESS', idModalAddress: item.idEndereco})}>Apagar Endereço</Button>
              </div>
              {openModalAddress && <ModalAddress name="endereço." closeModal={AddressActions.setModalDelete} navigate={navigate} dispatch={dispatch} confirmModal={handleDelete}/>}
            </Item>
          )) : <h1>Ainda não existem endereços cadastrados.</h1>
          }
          
        </Lista>
        </Body>
        <div>
          <Button width="180px" onClick={() => navigate(`/cadastrar-endereco/${pessoa.idPessoa}`)}>Cadastrar Endereço</Button>
        </div>
        </ModalEndereco>
        
      </div> 
  )
  }


const mapStateToProps = state => ({
  pessoa: state.addressReducer.pessoa,
  loading: state.addressReducer.loading,
  openModalAddress: state.addressReducer.openModalAddress
})

export default connect(mapStateToProps)(Address)