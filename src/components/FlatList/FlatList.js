import apiDBC from "../../Services/apiDBC"
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import Modal from '../../Utils/Modal'
import { Button } from '../Button/Button'
import { Lista, Item, TitleList } from './Lista'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ModalDescription from '../../Utils/ModalDescription'
import ModalContacts from "../../Utils/ModalContacts"
import { TextSm } from '../Fonts/Fonts'
import moment from "moment"
import { colorHoverMenu } from "../../consts"

const FlasList = ({list, setup}) => {
  const navigate = useNavigate()
  const [openModal, setOpenModal] = useState(false)
  const [openDescription, setOpenDescription] = useState(false)
  const [openContacts, setOpenContacts] = useState(false)
  const [id, setId] = useState()
  
  const setDelete = (id) => {
    setId(id)
    setOpenModal(true)
  }

  const handleDelete = async () => {
    const notify = () => toast("Usuário apagado com sucesso!");
    let idPessoa = id
    try {
      await apiDBC.delete(`/pessoa/${idPessoa}`)
      setOpenModal(false)
      setup()
      notify()
    } catch (error) {
      console.log(error)
    }
  }

  const handleUpdate = (idPessoa) => {
    navigate(`/editar-cadastro/${idPessoa}`)
  }

  const setPeopleAddress = (id) => {
    setId(id)
    setOpenDescription(true)
  }

  const setPeopleContacts = (id) => {
    setId(id)
    setOpenContacts(true)
  }

  const setCadastroEndereco = () => {
    navigate(`/endereco/${id}`)
  }

  const setUpdateEndereco = (idEndereco) => {
    navigate(`/endereco/${id}/${idEndereco}`)
  }

  
  const setCadastroContato = () => {
    navigate(`/contato/${id}`)
  }

  const setUpdateContato = (idContato) => {
    navigate(`/contato/${id}/${idContato}`)
  }

  return (
      <div>
        <TitleList>
          <TextSm color={colorHoverMenu}>Nome</TextSm>
          <TextSm color={colorHoverMenu}>Data de Nascimento</TextSm>
          <TextSm color={colorHoverMenu}>Email</TextSm>
        </TitleList>
        <Lista>
          {list.map(item =>(
            <Item key={item.idPessoa}>
              <TextSm>{item.nome}</TextSm>
              <TextSm>{moment(item.dataNascimento, 'YYYY-MM-DD').format('DD/MM/YYYY')}</TextSm>
              <TextSm >{item.email}</TextSm>
              <div className="btnsEdit">
                <Button onClick={() => {setPeopleContacts(item.idPessoa)}}>Contatos</Button>
                <Button onClick={() => {setPeopleAddress(item.idPessoa)}}>Endereços</Button>
                <Button width="80px" onClick={() => {handleUpdate(item.idPessoa)}}>Editar</Button>
                <Button width="80px" onClick={() => {setDelete(item.idPessoa)}}>Apagar</Button>
              </div>
            </Item>
          ))} 
        </Lista>
        {openModal && <Modal closeModal={setOpenModal} confirmModal={handleDelete}/>}
        {openDescription && <ModalDescription
          close={setOpenDescription}
          setCadastro={setCadastroEndereco}
          setUpdate={setUpdateEndereco}
          id={id} />}
        {openContacts && <ModalContacts
          close={setOpenContacts}
          setCadastro={setCadastroContato}
          setUpdate={setUpdateContato}
          id={id} />}
      </div>
  )
}
export default FlasList