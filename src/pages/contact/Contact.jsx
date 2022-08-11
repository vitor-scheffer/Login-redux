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
import Modal from '../../Utils/Modal'
import { connect } from 'react-redux'

const Contacts = ({pessoa, loading}) => {
  const navigate = useNavigate()

  // const setup = async () => {
  //   try {
  //     const { data } = await apiDbc.get(`/pessoa/lista-completa?idPessoa=${id}`)
  //     setPessoa(data[0])
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  // const setDelete = (idContato) => {
  //   setIdContato(idContato)
  //   setOpenModal(true)
  // }

  // useEffect(() => {
  //   setup()
  // },[])

  // const handleDelete = async () => {
  //   const notify = () => toast("Contato excluído com sucesso!");
  //   try {
  //     await apiDbc.delete(`/contato/${idContato}`)
  //   } catch (error) {
  //     console.log(error)
  //   }
  //   notify()
  //   close()
  // }


    return (
      <div className="modalBackgroundEnd">
      <ToastContainer />
      <ModalEndereco>
        <Button width="80px" padding="10px" className="closeBtn" onClick={() => navigate('/')}> Voltar </Button>
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
            <li><TextSm color={colorHoverMenu}>Telefone</TextSm> </li>
            <li><TextSm color={colorHoverMenu}>Descrição</TextSm> </li>
          </ul>
        </nav>
        <Lista>
          {pessoa.contatos.length > 0 ?
          pessoa.contatos.map(item =>(
            <Item key={item.idContato}>
              <p><TextSm>{item.tipoContato}</TextSm></p>
              <p><TextSm>{item.telefone}</TextSm></p>
              <p><TextSm>{item.descricao}</TextSm></p>
              <div className="btnsEdit btnsEditModal">
                <Button width="150px" >Editar Contato</Button>
                <Button width="150px" >Apagar Contato</Button>
              </div>
              {/* {openModal && <Modal name="contato."closeModal={setOpenModal} confirmModal={handleDelete}/>} */}
            </Item>
          )) : <h1>Ainda não existem contatos cadastrados.</h1>
          }
          
        </Lista>
        </Body>
        <div>
          <Button width="180px">Cadastrar Contato</Button>
        </div>
        </ModalEndereco>
        
      </div> 
  )
  }


const mapStateToProps = state => ({
  pessoa: state.contactReducer.pessoa,
  loading: state.contactReducer.loading
})

export default connect(mapStateToProps)(Contacts)