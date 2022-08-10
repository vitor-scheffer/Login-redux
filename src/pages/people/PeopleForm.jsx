import * as Yup from 'yup'
import moment from 'moment'
import { useContext } from 'react'
import  { IMaskInput }  from 'react-imask'
import { useState, useEffect } from 'react'
import { Formik, Field, Form } from 'formik'
import { useParams } from 'react-router-dom'
import { apiDbc } from '../../services/api'
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
 
const PeopleForm = () => {
  const { id } = useParams();
  const [people, setPeople] = useState();
  const [isUpdate, setIsUpdate] = useState(false);
  const [isError, setIsError] = useState(true);

  const userSchema = Yup.object().shape({
    nome: Yup.string().required('Campo obrigatório.'),
    dataNascimento: Yup.string().required('Campo obrigatório.'),
    cpf: Yup.string().matches(cpfValidation, 'Insira um CPF válido.').required('Campo obrigatório.'),
    email: Yup.string().email('Insira um email válido').required('Campo obrigatório.'),
  })
  
  const setup = async () => {
    if (id) {
      setIsUpdate(true)
      try {
        const { data } = await apiDbc.get(`/pessoa/lista-completa?idPessoa=${id}`)
        setPeople(data[0])
      } catch (error) {
        console.log(error)
      }
    }
  }

  useEffect(() => {
    setup()

  },[]) 

  if (people || !isUpdate) {
    return (
      <Section>
      <UserInfo tittle={isUpdate ? 'Atualizar Pessoa' : 'Cadastrar Pessoa'} />
      <SideBar />
      <Card width="100%" height="600px">
      <Formik
          initialValues={{
            nome: isUpdate ? people.nome : '',
            dataNascimento: isUpdate ? moment(people.dataNascimento, 'YY/YY/MMDD').format('DD-MM-YYYY') : '',
            cpf: isUpdate ? people.cpf : '',
            email: isUpdate ? people.email : '',
          }}
          validationSchema={userSchema}
          onSubmit={(values, {resetForm}) => {          
            // values.cpf = values.cpf.replace(/[^0-9]/gi,'')
            // values.dataNascimento = moment(values.dataNascimento, 'DD/MM/YYYY').format('YYYY-MM-DD')
            // {isUpdate ? handleUpdate(values, id, setup, setIsUpdate) : handleRegister(values, setup) }
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
}
export default PeopleForm