import { ModalPeople } from './Modal.styled'
import { Button } from '../components/Button/Button'
import { redColor } from '../consts'
import { connect } from 'react-redux'
import Loading from '../components/Loading/Loading'

const Modal = ({name, closeModal, dispatch, setup, confirmModal, idModal, idModalAddress, loading}) => {

  if(loading) {
    return ( <Loading /> )
  }

    return (
      <div className="modalBackground">
      <ModalPeople>
        <div className="title">
          <h1>Você tem certeza?</h1>
        </div>
        <div className="body">
          <p>Se você deletar não será possível recuperar o {name ? name : 'usuário.'}</p>
        </div>
        <div className="btnsModal">
          <Button onClick={() => closeModal(dispatch)} backgroundColor={redColor} border={`1px solid ${redColor}`}>Cancelar</Button>
          <Button onClick={() => confirmModal(idModal, idModalAddress, setup, dispatch)} >Confirmar</Button>
        </div>
        </ModalPeople>
      </div>
  )
  }

const mapStateToProps = state => ({
  idModal: state.pessoaReducer.idModal,
  loading: state.pessoaReducer.loading,
  idModalAddress: state.addressReducer.idModalAddress
}) 

export default connect(mapStateToProps)(Modal)