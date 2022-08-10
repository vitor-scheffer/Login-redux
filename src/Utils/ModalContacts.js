import { ModalEndereco, Body } from './Modal.styled'
import { Button } from '../components/Button/Button'
import { redColor, colorHoverMenu } from '../consts'
import { useState, useEffect } from 'react'
import apiDBC from '../Services/apiDBC' 
import {Subtitle, Text, TextSm } from '../components/Fonts/Fonts'
import { Lista, Item, TitleList } from '../components/FlatList/Lista'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import moment from 'moment'
import photo from '../images/no-user.jpeg'
import Modal from './Modal'

const ModalContacts = ({close, setCadastro, setUpdate, id}) => {
  const [pessoa, setPessoa] = useState()
  const navigate = useNavigate()
  const [openModal, setOpenModal] = useState(false)
  const [idContato, setIdContato] = useState()

  const setup = async () => {
    try {
      const { data } = await apiDBC.get(`/pessoa/lista-completa?idPessoa=${id}`)
      setPessoa(data[0])
    } catch (error) {
      console.log(error)
    }
  }

  const setDelete = (idContato) => {
    setIdContato(idContato)
    setOpenModal(true)
  }

  useEffect(() => {
    setup()
  },[])

  const handleDelete = async () => {
    const notify = () => toast("Contato excluído com sucesso!");
    try {
      await apiDBC.delete(`/contato/${idContato}`)
    } catch (error) {
      console.log(error)
    }
    notify()
    close()
  }

  if(pessoa) {
    return (
      
      <div className="modalBackgroundEnd">
      <ToastContainer />
      <ModalEndereco>
        <Button width="80px" padding="10px" onClick={() =>{close()}} className="closeBtn" > Voltar </Button>
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
                <Button width="150px" onClick={() =>{setUpdate(item.idContato)}}>Editar Contato</Button>
                <Button width="150px" onClick={() => {setDelete(item.idContato)}}>Apagar Contato</Button>
              </div>
              {openModal && <Modal name="contato."closeModal={setOpenModal} confirmModal={handleDelete}/>}
            </Item>
          )) : <h1>Ainda não existem contatos cadastrados.</h1>
          }
          
        </Lista>
        </Body>
        <div>
          <Button onClick={setCadastro} width="180px">Cadastrar Contato</Button>
        </div>
        </ModalEndereco>
        
      </div> 
  )
  }
}
export default ModalContacts