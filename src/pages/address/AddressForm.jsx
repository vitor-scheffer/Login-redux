import * as Yup from 'yup'
import  { IMaskInput }  from 'react-imask'
import { Formik, Field, Form } from 'formik'
import { ToastContainer, toast } from 'react-toastify';
import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { apiDbc, apiCep } from '../../services/api'
import { Card } from '../../components/Card/Card'
import 'react-toastify/dist/ReactToastify.css';
import SideBar from '../../components/SideBar/SideBar'
import { Button } from '../../components/Button/Button'
import { Section } from '../../components/Section/Section'
import { colorHoverMenu } from '../../consts'
import { TextSm } from '../../components/Fonts/Fonts'
import { FormContentPeople } from '../../components/FormPeople';
import { BodyFormAddress } from '../../components/FormAddress';
import UserInfo from '../../components/UserInfo';
import {ErrorsAlert } from '../../components/ErrorsAlert'

const cepSchema = Yup.object().shape({
  tipo: Yup.string().required('Campo obrigatório.'),
  logradouro: Yup.string().required('Campo obrigatório.'),
  numero: Yup.number().required('Campo obrigatório.'),
  cep: Yup.string().required('Campo obrigatório.'),
  cidade: Yup.string().required('Campo obrigatório.'),
  estado: Yup.string().required('Campo obrigatório.'),
  pais: Yup.string().required('Campo obrigatório.'),
  bairro: Yup.string().required('Campo obrigatório.'),
})

const Endereco = () => {
  const navigate = useNavigate()
  const { id } = useParams();
  const { idEndereco } = useParams();
  const [isUpdate, setIsUpdate] = useState(false);
  const [endereco, setEndereco] = useState();

  const setup = async () => {
    if( id && idEndereco) {
      setIsUpdate(true)
      try {
        const { data } = await apiDbc.get(`/endereco/${idEndereco}`)
        setEndereco(data)
      } catch (error) {
        console.log(error)
      }
  }
  }

  useEffect(()=> {
    setup()
  },[])
  
  const handleRegister = async (values) => {
    const notify = () => toast("Endereço cadastrado com sucesso!");
    try{
      await apiDbc.post(`/endereco/{idPessoa}?idPessoa=${id}`, values)
      notify()
      navigate(`/`)
    } catch(error)
    {console.log(error);}
  }

  const handleUpdate = async (values) => {
    const notify = () => toast("Endereço modificado com sucesso!");
    try {
      await apiDbc.put(`/endereco/${idEndereco}`, values)
      notify()
      navigate('/')
    } catch (error) {
      console.log(error)
    }
  }

  const procuraCep = async (setFieldValue, cep) => {
    const newCep = cep.replaceAll('-','')
    try {
      const { data } = await apiCep.get(`/${parseInt(newCep)}/json/`)
      setFieldValue('logradouro', data.logradouro)
      setFieldValue('bairro', data.bairro)
      setFieldValue('cidade', data.localidade)
      setFieldValue('estado', data.uf) 
    } catch (error) {
      console.log(error)
    }
  }

  if((isUpdate && endereco) || !isUpdate) {
    return (
      <Section>
        <UserInfo tittle={isUpdate ? 'Atualizar Endereço' : 'Cadastrar Endereço'} />
        <SideBar />
        <Card width="100%" height="615px">
        <Formik
          initialValues={{
            idPessoa: id,
            cep: isUpdate ? endereco.cep : '',
            tipo: isUpdate ? endereco.tipo : '',
            logradouro: isUpdate ? endereco.logradouro : '',
            numero: isUpdate ? endereco.numero : '',
            cidade: isUpdate ? endereco.cidade : '',
            estado: isUpdate ? endereco.estado : '',
            pais: isUpdate ? endereco.pais : '',
            complemento: isUpdate ? endereco.complemento : ''
          }}
          validationSchema={cepSchema}
          onSubmit={(values, {resetForm}) => {     
            values.cep = values.cep.replace('-', '')
            {isUpdate ? handleUpdate(values) : handleRegister(values)}
            resetForm()
          }}
          >
            {({errors, touched, handleSubmit, setFieldValue }) =>(
            <Form className="formAddress" onSubmit={handleSubmit}>
              <BodyFormAddress>
              <div>
              <FormContentPeople>
                <label htmlFor="cep"><TextSm color={colorHoverMenu} fontSize='12px'>CEP*</TextSm></label>
                <Field
                name="cep"
                render= {({field}) => (
                  <IMaskInput
                  {...field}
                  id="cep" 
                  mask="00000-000"
                  onBlur={(ev) => {procuraCep(setFieldValue, ev.target.value)}}
                  /> 
                  )}
                />
                {errors.cep && touched.cep ? (
               <ErrorsAlert>{errors.cep}</ErrorsAlert>
                ) : null}
              </FormContentPeople>
  
              <FormContentPeople>
                <label htmlFor="tipo"><TextSm color={colorHoverMenu} fontSize='12px'>TIPO*</TextSm></label>
                <Field
                component="select"
                id="tipo"
                name="tipo"
                >
               <option value={null}>Escolha um tipo</option>
               <option value="RESIDENCIAL">Residencial</option>
               <option value="COMERCIAL">Comercial</option>
               </Field>
                {errors.tipo && touched.tipo ? (
               <ErrorsAlert>{errors.tipo}</ErrorsAlert>
             ) : null}
              </FormContentPeople>
              
              <FormContentPeople>
                <label htmlFor="logradouro"><TextSm color={colorHoverMenu} fontSize='12px'>RUA*</TextSm></label>
                <Field
                id="logradouro"
                name="logradouro"
                />
                {errors.logradouro && touched.logradouro ? (
               <ErrorsAlert>{errors.logradouro}</ErrorsAlert>
             ) : null}
              </FormContentPeople>
              
              <FormContentPeople>
                <label htmlFor="numero"><TextSm color={colorHoverMenu} fontSize='12px'>NÚMERO*</TextSm></label>
                <Field
                id="numero"
                name="numero"
                />
                {errors.numero && touched.numero ? (
               <ErrorsAlert>{errors.numero}</ErrorsAlert>
             ) : null}
              </FormContentPeople>
              </div>
              
              <div>
              <FormContentPeople>
                <label htmlFor="cidade"><TextSm color={colorHoverMenu} fontSize='12px'>CIDADE*</TextSm></label>
                <Field
                id="cidade"
                name="cidade"
                />
                {errors.cidade && touched.cidade ? (
               <ErrorsAlert>{errors.cidade}</ErrorsAlert>
             ) : null}
              </FormContentPeople>
              
              <FormContentPeople>
                <label htmlFor="estado"><TextSm color={colorHoverMenu} fontSize='12px'>ESTADO*</TextSm></label>
                <Field
                id="estado"
                name="estado"
                />
                {errors.estado && touched.estado ? (
               <ErrorsAlert>{errors.estado}</ErrorsAlert>
             ) : null}
              </FormContentPeople>
              
              <FormContentPeople>
                <label htmlFor="pais"><TextSm color={colorHoverMenu} fontSize='12px'>PAÍS*</TextSm></label>
                <Field
                id="pais"
                name="pais"
                />
                {errors.pais && touched.pais ? (
               <ErrorsAlert>{errors.pais}</ErrorsAlert>
             ) : null}
              </FormContentPeople>
              
              <FormContentPeople>
                <label htmlFor="complemento"><TextSm color={colorHoverMenu} fontSize='12px'>COMPLEMENTO</TextSm></label>
                <Field
                id="complemento"
                name="complemento"
                />
              </FormContentPeople>
              </div>
              </BodyFormAddress>
              <Button disabled={errors.pais || errors.numero || errors.rua || errors.estado || errors.tipo || errors.cidade || errors.cep} type="submit">{isUpdate ? 'Atualizar' : 'Cadastrar'}</Button>
            </Form>
            )}
          </Formik>
        </Card>
        <ToastContainer />
      </Section>
    )
  }
}


export default Endereco