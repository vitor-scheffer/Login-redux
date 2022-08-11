import * as Yup from 'yup'
import  { IMaskInput }  from 'react-imask'
import { Formik, Field, Form } from 'formik'
import { ToastContainer, toast } from 'react-toastify';
import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { FormContentPeople } from '../../components/FormPeople';
import { apiDbc } from '../../services/api'
import { Card } from '../../components/Card/Card'
import 'react-toastify/dist/ReactToastify.css';
import SideBar from '../../components/SideBar/SideBar'
import { Button } from '../../components/Button/Button'
import { Section } from '../../components/Section/Section'
import { colorHoverMenu } from '../../consts'
import { TextSm } from '../../components/Fonts/Fonts'
import UserInfo from '../../components/UserInfo';
import {ErrorsAlert } from '../../components/ErrorsAlert'

const contactSchema = Yup.object().shape({
  tipoContato: Yup.string().required('Campo obrigatório.'),
  telefone: Yup.string().required('Campo obrigatório.'),
  descricao: Yup.string().required('Campo obrigatório.')
})

const Contato = () => {
  const navigate = useNavigate()
  const { id } = useParams();
  const { idContato } = useParams();
  const [isUpdate, setIsUpdate] = useState(false);
  const [contato, setContato] = useState();

  const setup = async () => {
    if( id && idContato) {
      setIsUpdate(true)
      try {
        const { data } = await apiDbc.get(`/contato/${id}`)
        setContato(data.find(item => item.idContato === parseInt(idContato)))
      } catch (error) {
        console.log(error)
      }
  }
  }

  useEffect(()=> {
    setup()
  },[])

  console.log(contato)
  
  
  const handleRegister = async (values) => {
    const notify = () => toast("Contato cadastrado com sucesso!");
    console.log(values)
    try{
      await apiDbc.post(`/contato/${id}`, values)
      notify()
      navigate('/')
    } catch(error)
    {console.log(error);}
  }

  const handleUpdate = async (values) => {
    const notify = () => toast("Contato modificado com sucesso!");
    try {
      await apiDbc.put(`/contato/${idContato}`, values)
      notify()
      navigate('/')
    } catch (error) {
      console.log(error)
    }
  }

  if((isUpdate && contato) || !isUpdate) {
    return (
      <Section>
        <UserInfo tittle={isUpdate ? 'Atualizar Contato' : 'Cadastrar Contato'} />
        <SideBar />
        <Card width="100%" height="615px">
        <Formik
          initialValues={{
            idPessoa: id,
            tipoContato: isUpdate ? contato.tipoContato : '',
            telefone: isUpdate ? contato.telefone : '',
            descricao: isUpdate ? contato.descricao : '',
          }}
          validationSchema={contactSchema}
          onSubmit={(values, {resetForm}) => {  
            values.idPessoa = parseInt(values.idPessoa)   

            {isUpdate ? handleUpdate(values) : handleRegister(values)}
            resetForm()
          }}
          >
            {({errors, touched, handleSubmit, setFieldValue }) =>(
            <Form className="formAddress" onSubmit={handleSubmit}>
              <div>
              <FormContentPeople>
                <label htmlFor="telefone"><TextSm color={colorHoverMenu} fontSize='12px'>TELEFONE*</TextSm></label>
                <Field
                name="telefone"
                render= {({field}) => (
                  <IMaskInput
                  {...field}
                  id="telefone" 
                  mask="(00)00000-0000"
                  /> 
                  )}
                />
                {errors.telefone && touched.telefone ? (
               <ErrorsAlert>{errors.telefone}</ErrorsAlert>
                ) : null}
              </FormContentPeople>
  
              <FormContentPeople>
                <label htmlFor="tipoContato"><TextSm color={colorHoverMenu} fontSize='12px'>TIPO*</TextSm></label>
                <Field
                component="select"
                id="tipoContato"
                name="tipoContato"
                >
               <option value={null}>Escolha um tipo</option>
               <option value="RESIDENCIAL">Residencial</option>
               <option value="COMERCIAL">Comercial</option>
               </Field>
                {errors.tipoContato && touched.tipoContato ? (
               <ErrorsAlert>{errors.tipoContato}</ErrorsAlert>
             ) : null}
              </FormContentPeople>
              
              <FormContentPeople>
                <label htmlFor="descricao"><TextSm color={colorHoverMenu} fontSize='12px'>DESCRIÇÃO*</TextSm></label>
                <Field
                id="descricao"
                name="descricao"
                />
                {errors.descricao && touched.descricao ? (
               <ErrorsAlert>{errors.descricao}</ErrorsAlert>
             ) : null}
              </FormContentPeople>
              </div>
              <Button disabled={errors.tipoContato || errors.telefone || errors.descricao} type="submit">{isUpdate ? 'Atualizar' : 'Cadastrar'}</Button>
            </Form>
            )}
          </Formik>
        </Card>
        <ToastContainer />
      </Section>
    )
  }
}


export default Contato