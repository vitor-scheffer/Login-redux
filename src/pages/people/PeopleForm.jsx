import * as Yup from 'yup'
import moment from 'moment'
import  { IMaskInput }  from 'react-imask'
import { useEffect } from 'react'
import { Formik, Field, Form } from 'formik'
import { useParams, useNavigate } from 'react-router-dom'
import { Card } from '../../components/Card/Card'
import { Button } from '../../components/Button/Button'
import SideBar from '../../components/SideBar/SideBar'
import { cpfValidation } from '../../Utils/Validations'
import { Section } from '../../components/Section/Section'
import { colorHoverMenu } from '../../consts'
import { TextSm } from '../../components/Fonts/Fonts'
import { FormContentPeople } from '../../components/FormPeople';
import UserInfo from '../../components/UserInfo';
import { ErrorsAlert } from '../../components/ErrorsAlert'
import { connect } from 'react-redux'
import * as PessoaActions from '../../store/actions/PessoaActions'
import Loading from '../../components/Loading/Loading'
 
const PeopleForm = ({dispatch, pessoa, isUpdate, loading}) => {
  const { idPessoa } = useParams()
  const navigate = useNavigate()

  const userSchema = Yup.object().shape({
    nome: Yup.string().required('Campo obrigatório.'),
    dataNascimento: Yup.string().required('Campo obrigatório.'),
    cpf: Yup.string().matches(cpfValidation, 'Insira um CPF válido.').required('Campo obrigatório.'),
    email: Yup.string().email('Insira um email válido').required('Campo obrigatório.'),
  })

  const setup = () => {
    if (idPessoa) {
      PessoaActions.setUpdatePessoa(idPessoa, dispatch)
    } else {
      dispatch(
        {
          type: 'SET_IS_UPDATE'
        }
      )
    }
  }

  useEffect(() => {
    setup()
  },[])

  if (loading) {
    return ( <Loading /> )
  }
 
    return (
      <Section>
      <UserInfo tittle={isUpdate ? 'Atualizar Pessoa' : 'Cadastrar Pessoa'} />
      <SideBar />
      <Card width="100%" height="600px">
      <Formik
          initialValues={{
            nome: isUpdate ? pessoa.nome : '',
            dataNascimento: isUpdate ? moment(pessoa.dataNascimento, 'YY/YY/MMDD').format('DD-MM-YYYY') : '',
            cpf: isUpdate ? pessoa.cpf : '',
            email: isUpdate ? pessoa.email : '',
          }}
          validationSchema={userSchema}
          onSubmit={(values, {resetForm}) => {          
            values.cpf = values.cpf.replace(/[^0-9]/gi,'')
            values.dataNascimento = moment(values.dataNascimento, 'DD/MM/YYYY').format('YYYY-MM-DD')
            {isUpdate ? PessoaActions.handleUpdate(values, idPessoa, setup, dispatch, navigate) : PessoaActions.handleRegisterPeople(values, setup, dispatch, navigate) }
            resetForm()
          }}
        >
          {({errors, touched, handleSubmit }) =>(
            <Form className="formPeople" onSubmit={handleSubmit}>
            <FormContentPeople>
              <label htmlFor="nome"><TextSm color={colorHoverMenu} fontSize='12px'>NOME*</TextSm></label>
              <Field id="nome" name="nome"/>
              {errors.nome && touched.nome ? (
             <ErrorsAlert>{errors.nome}</ErrorsAlert>
           ) : null}
            </FormContentPeople>
            <FormContentPeople>
              <label htmlFor="dataNascimento"><TextSm color={colorHoverMenu} fontSize='12px'>DATA DE NASCIMENTO*</TextSm></label>
              <Field
              name="dataNascimento"
              render= {({field}) => (
                <IMaskInput
                {...field}
                id="dataNascimento" 
                mask="00/00/0000"
                /> 
                )}
              />
                {errors.dataNascimento && touched.dataNascimento ? (
             <ErrorsAlert>{errors.dataNascimento}</ErrorsAlert>
           ) : null}
            </FormContentPeople>
            <FormContentPeople>
              <label htmlFor="cpf"><TextSm color={colorHoverMenu} fontSize='12px'>CPF*</TextSm></label>
              <Field
              name="cpf"
              render= {({field}) => (
                <IMaskInput
                {...field}
                id="cpf" 
                mask="000.000.000-00"
                /> 
                )}
              />
                {errors.cpf && touched.cpf ? (
             <ErrorsAlert>{errors.cpf}</ErrorsAlert>
           ) : null}
            </FormContentPeople>
            <FormContentPeople>
              <label htmlFor="email"><TextSm color={colorHoverMenu} fontSize='12px'>EMAIL*</TextSm></label>
              <Field id="email" name="email"/>
              {errors.email && touched.email ? (
             <ErrorsAlert>{errors.email}</ErrorsAlert>
           ) : null}
            </FormContentPeople>
            <Button disabled={errors.email || errors.cpf || errors.dataNascimento || errors.nome} type="submit">{isUpdate ? 'Atualizar' : 'Cadastrar'}</Button>
          </Form>
          )}
        </Formik>
      </Card>
      </Section>
    )
  }

const mapStateToProps = state => ({
  pessoas: state.pessoaReducer.pessoas,
  isUpdate: state.pessoaReducer.isUpdate,
  loading: state.pessoaReducer.loading,
  pessoa: state.pessoaReducer.pessoa
}) 
export default connect(mapStateToProps)(PeopleForm)