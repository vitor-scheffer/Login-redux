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

const ModalDescription = ({close, setCadastro, setUpdate, id}) => {
  const [pessoa, setPessoa] = useState()
  const navigate = useNavigate()
  const [openModal, setOpenModal] = useState(false)
  const [idEndereco, setIdEndereco] = useState()

  const setup = async () => {
    try {
      const { data } = await apiDBC.get(`/pessoa/lista-completa?idPessoa=${id}`)
      setPessoa(data[0])
    } catch (error) {
      console.log(error)
    }
  }

  const setDelete = (idEndereco) => {
    setIdEndereco(idEndereco)
    setOpenModal(true)
  }

  useEffect(() => {
    setup()
  },[])

  const handleDelete = async () => {
    const notify = () => toast("Endereço excluído com sucesso!");
    try {
      await apiDBC.delete(`/endereco/${idEndereco}`)
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
                <Button width="150px" onClick={() =>{setUpdate(item.idEndereco)}}>Editar Endereço</Button>
                <Button width="150px" onClick={() => {setDelete(item.idEndereco)}}>Apagar Endereço</Button>
              </div>
              {openModal && <Modal name="endereço."closeModal={setOpenModal} confirmModal={handleDelete}/>}
            </Item>
          )) : <h1>Ainda não existem endereços cadastrados.</h1>
          }
          
        </Lista>
        </Body>
        <div>
          <Button onClick={setCadastro} width="180px">Cadastrar Endereço</Button>
        </div>
        </ModalEndereco>
        
      </div> 
  )
  }
}
export default ModalDescription