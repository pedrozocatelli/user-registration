import React, { useEffect, useState } from 'react';
import { Formik, Field, getIn, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import api from '../../services/api';
import MaskedInput from 'react-text-mask';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import axios from 'axios';

import './styles.css';

export default function New() {
  const [menu, setMenu] = useState([]);

  useEffect(() => {
    setMenu(false);
  }, []);

  return (
    <div className="container-add">
      <div className="content-add">
        <Link to="/">
          <button className="btn-voltar">Voltar</button>
        </Link>
        <h2 className="add-title-main">Cadastrar Cliente</h2>
        {/* Padronização do JSON */}
        <Formik
          initialValues={{
            email: '',
            name: '',
            cpf: '',
            telephone: '',
            addresses: [
              {
                cep: '',
                state: 'AC',
                city: '',
                neighborhood: '',
                address: '',
                number: '',
                complement: '',
                type: 0,
                main: true
              },
              {
                cep: '',
                state: 'AC',
                city: '',
                neighborhood: '',
                address: '',
                number: '',
                complement: '',
                type: 0
              }
            ]
          }}
          onSubmit={async (
            values,
            { resetForm, props, setSubmitting, setFieldValue }
          ) => {
            const validarCpf = require('validar-cpf');
            const cpfValido = validarCpf(values.cpf);
            //Valida o CPF
            if (!cpfValido) {
              Swal.fire('Oops...', 'O CPF informado é inválido!', 'error');
            } else {
              // alert(JSON.stringify(values, null, 2));
              try {
                await api.post('/users', values);
                Swal.fire('Sucesso!', 'Cliente Editado!', 'success');
                resetForm();
                window.scrollTo(0, 0);
              } catch (error) {
                Swal.fire('Oops...', error.response.data.error, 'error');
                setSubmitting(false);
              }
            }
          }}
          validationSchema={Yup.object().shape({
            name: Yup.string()
              .required('Campo Obrigatório')
              .min(8, 'Digite o nome completo'),
            cpf: Yup.string()
              .required('Campo Obrigatório')
              .min(14, 'Digite o CPF completo'),
            email: Yup.string()
              .email('E-mail inválido')
              .required('Campo Obrigatório'),
            telephone: Yup.string()
              .required('Campo Obrigatório')
              .min(10, 'Digite um telefone válido')
            //Tive que tirar, dando conflito com validação do endereço secundário
            // addresses: Yup.array().of(
            //   Yup.object().shape({
            //     cep: Yup.string()
            //       .required('Campo Obrigatório')
            //       .min(8, 'Digite o CEP completo'),
            //     city: Yup.string()
            //       .required('Campo Obrigatório')
            //       .min(2, 'Digite o nome completo da cidade'),
            //     neighborhood: Yup.string()
            //       .required('Campo Obrigatório')
            //       .min(2, 'Digite o nome completo do bairro'),
            //     address: Yup.string()
            //       .required('Campo Obrigatório')
            //       .min(2, 'Digite o endereço completo'),
            //     number: Yup.string().required('Campo Obrigatório')
            //   })
            // )
          })}
        >
          {props => {
            const {
              values,
              touched,
              errors,
              isSubmitting,
              handleChange,
              handleBlur,
              handleSubmit,
              setFieldValue
            } = props;
            return (
              <form onSubmit={handleSubmit}>
                {/* NOME */}
                <h2 className="add-title">Dados do Cliente</h2>
                <label htmlFor="name" style={{ display: 'block' }}>
                  Nome
                </label>
                <input
                  id="name"
                  placeholder=""
                  type="text"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.name && touched.name
                      ? 'text-input error'
                      : 'text-input'
                  }
                />
                {errors.name && touched.name && (
                  <div className="input-feedback">{errors.name}</div>
                )}
                {/* CPF */}
                <label htmlFor="cpf" style={{ display: 'block' }}>
                  CPF
                </label>
                <MaskedInput
                  mask={[
                    /[0-9]/,
                    /\d/,
                    /\d/,
                    '.',
                    /\d/,
                    /\d/,
                    /\d/,
                    '.',
                    /\d/,
                    /\d/,
                    /\d/,
                    '-',
                    /\d/,
                    /\d/
                  ]}
                  id="cpf"
                  guide={false}
                  placeholder=""
                  type="text"
                  value={values.cpf}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.cpf && touched.cpf
                      ? 'text-input error'
                      : 'text-input'
                  }
                />
                {errors.cpf && touched.cpf && (
                  <div className="input-feedback">{errors.cpf}</div>
                )}

                {/* EMAIL */}
                <label htmlFor="email" style={{ display: 'block' }}>
                  Email
                </label>
                <input
                  id="email"
                  placeholder=""
                  type="text"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.email && touched.email
                      ? 'text-input error'
                      : 'text-input'
                  }
                />
                {errors.email && touched.email && (
                  <div className="input-feedback">{errors.email}</div>
                )}

                {/* TELEFONE */}
                <label htmlFor="telephone" style={{ display: 'block' }}>
                  Telefone
                </label>
                <MaskedInput
                  mask={[
                    '(',
                    /[0-9]/,
                    /\d/,
                    ')',
                    ' ',
                    /\d/,
                    /\d/,
                    /\d/,
                    /\d/,
                    /\d/,
                    '-',
                    /\d/,
                    /\d/,
                    /\d/,
                    /\d/
                  ]}
                  id="telephone"
                  placeholder=""
                  type="text"
                  guide={false}
                  value={values.telephone}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.telephone && touched.telephone
                      ? 'text-input error'
                      : 'text-input'
                  }
                />
                {errors.telephone && touched.telephone && (
                  <div className="input-feedback">{errors.telephone}</div>
                )}
                <hr className="division"></hr>

                <h2 className="add-subtitle">Endereço Principal</h2>

                {/* CEP */}
                <label htmlFor="cep" style={{ display: 'block' }}>
                  CEP
                </label>
                <MaskedInput
                  mask={[/[0-9]/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/]}
                  guide={false}
                  id="cep"
                  placeholder=""
                  type="text"
                  name="addresses[0].cep"
                  value={values.addresses[0].cep}
                  onChange={handleChange}
                  onBlur={() => {
                    async function carregaDadosCep() {
                      if (values.addresses[0].cep.length < 8) {
                        return;
                      }
                      const response = await axios.get(
                        `http://viacep.com.br/ws/${values.addresses[0].cep}/json/`
                      );
                      if (!response.data.erro) {
                        setFieldValue('addresses[0].state', response.data.uf);
                        values.addresses[0].state = response.data.uf;

                        setFieldValue(
                          'addresses[0].city',
                          response.data.localidade
                        );
                        values.addresses[0].city = response.data.localidade;

                        setFieldValue(
                          'addresses[0].neighborhood',
                          response.data.bairro
                        );
                        values.addresses[0].neighborhood = response.data.bairro;

                        setFieldValue(
                          'addresses[0].address',
                          response.data.logradouro
                        );
                        values.addresses[0].address = response.data.logradouro;
                      } else {
                        setFieldValue('addresses[0].state', '');
                        values.addresses[0].state = '';
                        setFieldValue('addresses[0].city', '');
                        values.addresses[0].city = '';
                        setFieldValue('addresses[0].neighborhood', '');
                        values.addresses[0].neighborhood = '';
                        setFieldValue('addresses[0].address', '');
                        values.addresses[0].address = '';
                        setFieldValue('addresses[0].number', '');
                        values.addresses[0].number = '';
                        setFieldValue('addresses[0].complement', '');
                        values.addresses[0].complement = '';
                      }
                    }
                    carregaDadosCep();
                  }}
                  className={
                    getIn(errors, 'addresses[0].cep') &&
                    getIn(touched, 'addresses[0].cep')
                      ? 'text-input error'
                      : 'text-input'
                  }
                />
                <ErrorMessage
                  component="div"
                  name="addresses[0].cep"
                  className="input-feedback"
                />

                {/* Estado */}
                <label htmlFor="state" style={{ display: 'block' }}>
                  Estado
                </label>
                <select
                  id="state"
                  placeholder=""
                  name="addresses[0].state"
                  value={values.addresses[0].state}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    getIn(errors, 'addresses[0].state') &&
                    getIn(touched, 'addresses[0].state')
                      ? 'text-input error'
                      : 'text-input'
                  }
                >
                  <option value="AC">Acre</option>
                  <option value="AL">Alagoas</option>
                  <option value="AP">Amapá</option>
                  <option value="AM">Amazonas</option>
                  <option value="BA">Bahia</option>
                  <option value="CE">Ceará</option>
                  <option value="DF">Distrito Federal</option>
                  <option value="ES">Espírito Santo</option>
                  <option value="GO">Goiás</option>
                  <option value="MA">Maranhão</option>
                  <option value="MT">Mato Grosso</option>
                  <option value="MS">Mato Grosso do Sul</option>
                  <option value="MG">Minas Gerais</option>
                  <option value="PA">Pará</option>
                  <option value="PB">Paraíba</option>
                  <option value="PR">Paraná</option>
                  <option value="PE">Pernambuco</option>
                  <option value="PI">Piauí</option>
                  <option value="RJ">Rio de Janeiro</option>
                  <option value="RN">Rio Grande do Norte</option>
                  <option value="RS">Rio Grande do Sul</option>
                  <option value="RO">Rondônia</option>
                  <option value="RR">Roraima</option>
                  <option value="SC">Santa Catarina</option>
                  <option value="SP">São Paulo</option>
                  <option value="SE">Sergipe</option>
                  <option value="TO">Tocantins</option>
                </select>
                <ErrorMessage
                  component="div"
                  name="addresses[0].state"
                  className="input-feedback"
                />

                {/* Cidade */}
                <label htmlFor="city" style={{ display: 'block' }}>
                  Cidade
                </label>
                <input
                  id="city"
                  placeholder=""
                  type="text"
                  name="addresses[0].city"
                  value={values.addresses[0].city}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    getIn(errors, 'addresses[0].city') &&
                    getIn(touched, 'addresses[0].city')
                      ? 'text-input error'
                      : 'text-input'
                  }
                />
                <ErrorMessage
                  component="div"
                  name="addresses[0].city"
                  className="input-feedback"
                />

                {/* Bairro */}
                <label htmlFor="neighborhood" style={{ display: 'block' }}>
                  Bairro
                </label>
                <input
                  id="neighborhood"
                  placeholder=""
                  type="text"
                  name="addresses[0].neighborhood"
                  value={values.addresses[0].neighborhood}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    getIn(errors, 'addresses[0].neighborhood') &&
                    getIn(touched, 'addresses[0].neighborhood')
                      ? 'text-input error'
                      : 'text-input'
                  }
                />
                <ErrorMessage
                  component="div"
                  name="addresses[0].neighborhood"
                  className="input-feedback"
                />

                {/* Endereço */}
                <label htmlFor="address" style={{ display: 'block' }}>
                  Endereço
                </label>
                <input
                  id="address"
                  placeholder=""
                  type="text"
                  name="addresses[0].address"
                  value={values.addresses[0].address}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    getIn(errors, 'addresses[0].address') &&
                    getIn(touched, 'addresses[0].address')
                      ? 'text-input error'
                      : 'text-input'
                  }
                />
                <ErrorMessage
                  component="div"
                  name="addresses[0].address"
                  className="input-feedback"
                />

                {/* Número */}
                <label htmlFor="number" style={{ display: 'block' }}>
                  Número
                </label>
                <input
                  id="number"
                  placeholder=""
                  type="text"
                  name="addresses[0].number"
                  value={values.addresses[0].number}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    getIn(errors, 'addresses[0].number') &&
                    getIn(touched, 'addresses[0].number')
                      ? 'text-input error'
                      : 'text-input'
                  }
                />
                <ErrorMessage
                  component="div"
                  name="addresses[0].number"
                  className="input-feedback"
                />

                {/* Complemento */}
                <label htmlFor="complement" style={{ display: 'block' }}>
                  Complemento
                </label>
                <input
                  id="complement"
                  placeholder=""
                  type="text"
                  name="addresses[0].complement"
                  value={values.addresses[0].complement}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    getIn(errors, 'addresses[0].complement') &&
                    getIn(touched, 'addresses[0].complement')
                      ? 'text-input error'
                      : 'text-input'
                  }
                />
                <ErrorMessage
                  component="div"
                  name="addresses[0].complement"
                  className="input-feedback"
                />

                {/* Tipo */}
                <label htmlFor="type" style={{ display: 'block' }}>
                  Tipo do Endereço
                </label>
                <div className="radio">
                  <label name="" className="radio-label">
                    <Field
                      type="radio"
                      name="addresses[0].type"
                      value="0"
                      checked={values.addresses[0].type === '0'}
                      onChange={() => setFieldValue('addresses[0].type', '0')}
                    />
                    Comercial
                  </label>
                </div>
                <div className="radio">
                  <label className="radio-label">
                    <input
                      type="radio"
                      name="addresses[0].type"
                      value="1"
                      checked={values.addresses[0].type === '1'}
                      onChange={() => setFieldValue('addresses[0].type', '1')}
                    />
                    Residencial
                  </label>
                </div>
                <div className="radio">
                  <label className="radio-label">
                    <input
                      type="radio"
                      value="2"
                      checked={values.addresses[0].type === '2'}
                      onChange={() => setFieldValue('addresses[0].type', '2')}
                    />
                    Rural
                  </label>
                </div>
                <div className="radio">
                  <label className="radio-label">
                    <input
                      type="radio"
                      name="addresses[0].type"
                      value="3"
                      checked={values.addresses[0].type === '3'}
                      onChange={() => setFieldValue('addresses[0].type', '3')}
                    />
                    Casa de Praia
                  </label>
                </div>

                {/* ENDEREÇO SECUNDÁRIO */}
                {/* ENDEREÇO SECUNDÁRIO */}
                {/* ENDEREÇO SECUNDÁRIO */}
                {/* ENDEREÇO SECUNDÁRIO */}
                {/* ENDEREÇO SECUNDÁRIO */}
                {/* ENDEREÇO SECUNDÁRIO */}

                <div
                  className={
                    menu ? 'end-secundario-show' : 'end-secundario-hide'
                  }
                >
                  <hr className="division-two"></hr>

                  <h2 className="add-subtitle">Endereço Secundário</h2>
                  {/* CEP */}
                  <label htmlFor="cepsec" style={{ display: 'block' }}>
                    CEP
                  </label>
                  <MaskedInput
                    mask={[/[0-9]/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/]}
                    guide={false}
                    id="cepsec"
                    placeholder=""
                    type="text"
                    name="addresses[1].cep"
                    value={values.addresses[1].cep}
                    onChange={handleChange}
                    onBlur={() => {
                      async function carregaDadosCep() {
                        if (values.addresses[1].cep.length < 8) {
                          return;
                        }
                        const response = await axios.get(
                          `http://viacep.com.br/ws/${values.addresses[1].cep}/json/`
                        );
                        if (!response.data.erro) {
                          setFieldValue('addresses[1].state', response.data.uf);
                          values.addresses[1].state = response.data.uf;

                          setFieldValue(
                            'addresses[1].city',
                            response.data.localidade
                          );
                          values.addresses[1].city = response.data.localidade;

                          setFieldValue(
                            'addresses[1].neighborhood',
                            response.data.bairro
                          );
                          values.addresses[1].neighborhood =
                            response.data.bairro;

                          setFieldValue(
                            'addresses[1].address',
                            response.data.logradouro
                          );
                          values.addresses[1].address =
                            response.data.logradouro;
                        } else {
                          setFieldValue('addresses[1].state', '');
                          values.addresses[1].state = '';
                          setFieldValue('addresses[1].city', '');
                          values.addresses[1].city = '';
                          setFieldValue('addresses[1].neighborhood', '');
                          values.addresses[1].neighborhood = '';
                          setFieldValue('addresses[1].address', '');
                          values.addresses[1].address = '';
                          setFieldValue('addresses[1].number', '');
                          values.addresses[1].number = '';
                          setFieldValue('addresses[1].complement', '');
                          values.addresses[1].complement = '';
                        }
                      }
                      carregaDadosCep();
                    }}
                    className={
                      getIn(errors, 'addresses[1].cep') &&
                      getIn(touched, 'addresses[1].cep')
                        ? 'text-input error'
                        : 'text-input'
                    }
                  />
                  <ErrorMessage
                    component="div"
                    name="addresses[1].cep"
                    className="input-feedback"
                  />

                  {/* Estado */}
                  <label htmlFor="statesec" style={{ display: 'block' }}>
                    Estado
                  </label>
                  <select
                    id="statesec"
                    placeholder=""
                    name="addresses[1].state"
                    value={values.addresses[1].state}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={
                      getIn(errors, 'addresses[1].statesec') &&
                      getIn(touched, 'addresses[1].statesec')
                        ? 'text-input error'
                        : 'text-input'
                    }
                  >
                    <option value="AC">Acre</option>
                    <option value="AL">Alagoas</option>
                    <option value="AP">Amapá</option>
                    <option value="AM">Amazonas</option>
                    <option value="BA">Bahia</option>
                    <option value="CE">Ceará</option>
                    <option value="DF">Distrito Federal</option>
                    <option value="ES">Espírito Santo</option>
                    <option value="GO">Goiás</option>
                    <option value="MA">Maranhão</option>
                    <option value="MT">Mato Grosso</option>
                    <option value="MS">Mato Grosso do Sul</option>
                    <option value="MG">Minas Gerais</option>
                    <option value="PA">Pará</option>
                    <option value="PB">Paraíba</option>
                    <option value="PR">Paraná</option>
                    <option value="PE">Pernambuco</option>
                    <option value="PI">Piauí</option>
                    <option value="RJ">Rio de Janeiro</option>
                    <option value="RN">Rio Grande do Norte</option>
                    <option value="RS">Rio Grande do Sul</option>
                    <option value="RO">Rondônia</option>
                    <option value="RR">Roraima</option>
                    <option value="SC">Santa Catarina</option>
                    <option value="SP">São Paulo</option>
                    <option value="SE">Sergipe</option>
                    <option value="TO">Tocantins</option>
                  </select>
                  <ErrorMessage
                    component="div"
                    name="addresses[1].statesec"
                    className="input-feedback"
                  />

                  {/* Cidade */}
                  <label htmlFor="citysec" style={{ display: 'block' }}>
                    Cidade
                  </label>
                  <input
                    id="citysec"
                    placeholder=""
                    type="text"
                    name="addresses[1].city"
                    value={values.addresses[1].city}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={
                      getIn(errors, 'addresses[1].citysec') &&
                      getIn(touched, 'addresses[1].citysec')
                        ? 'text-input error'
                        : 'text-input'
                    }
                  />
                  <ErrorMessage
                    component="div"
                    name="addresses[1].citysec"
                    className="input-feedback"
                  />

                  {/* Bairro */}
                  <label htmlFor="neighborhoodsec" style={{ display: 'block' }}>
                    Bairro
                  </label>
                  <input
                    id="neighborhoodsec"
                    placeholder=""
                    type="text"
                    name="addresses[1].neighborhood"
                    value={values.addresses[1].neighborhood}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={
                      getIn(errors, 'addresses[1].neighborhoodsec') &&
                      getIn(touched, 'addresses[1].neighborhoodsec')
                        ? 'text-input error'
                        : 'text-input'
                    }
                  />
                  <ErrorMessage
                    component="div"
                    name="addresses[1].neighborhoodsec"
                    className="input-feedback"
                  />

                  {/* Endereço */}
                  <label htmlFor="addresssec" style={{ display: 'block' }}>
                    Endereço
                  </label>
                  <input
                    id="addresssec"
                    placeholder=""
                    type="text"
                    name="addresses[1].address"
                    value={values.addresses[1].address}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={
                      getIn(errors, 'addresses[1].addresssec') &&
                      getIn(touched, 'addresses[1].addresssec')
                        ? 'text-input error'
                        : 'text-input'
                    }
                  />
                  <ErrorMessage
                    component="div"
                    name="addresses[1].addresssec"
                    className="input-feedback"
                  />

                  {/* Número */}
                  <label htmlFor="numbersec" style={{ display: 'block' }}>
                    Número
                  </label>
                  <input
                    id="numbersec"
                    placeholder=""
                    type="text"
                    name="addresses[1].number"
                    value={values.addresses[1].number}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={
                      getIn(errors, 'addresses[1].numbersec') &&
                      getIn(touched, 'addresses[1].numbersec')
                        ? 'text-input error'
                        : 'text-input'
                    }
                  />
                  <ErrorMessage
                    component="div"
                    name="addresses[1].numbersec"
                    className="input-feedback"
                  />

                  {/* Complemento */}
                  <label htmlFor="complementsec" style={{ display: 'block' }}>
                    Complemento
                  </label>
                  <input
                    id="complementsec"
                    placeholder=""
                    type="text"
                    name="addresses[1].complement"
                    value={values.addresses[1].complement}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={
                      getIn(errors, 'addresses[1].complementsec') &&
                      getIn(touched, 'addresses[1].complementsec')
                        ? 'text-input error'
                        : 'text-input'
                    }
                  />
                  <ErrorMessage
                    component="div"
                    name="addresses[1].complement"
                    className="input-feedback"
                  />

                  {/* Tipo */}
                  <label htmlFor="typesec" style={{ display: 'block' }}>
                    Tipo do Endereço
                  </label>
                  <div className="radio">
                    <label name="" className="radio-label">
                      <Field
                        type="radio"
                        name="addresses[1].type"
                        value="0"
                        checked={values.addresses[1].type === '0'}
                        onChange={() => setFieldValue('addresses[1].type', '0')}
                      />
                      Comercial
                    </label>
                  </div>
                  <div className="radio">
                    <label className="radio-label">
                      <input
                        type="radio"
                        name="addresses[1].type"
                        value="1"
                        checked={values.addresses[1].type === '1'}
                        onChange={() => setFieldValue('addresses[1].type', '1')}
                      />
                      Residencial
                    </label>
                  </div>
                  <div className="radio">
                    <label className="radio-label">
                      <input
                        type="radio"
                        value="2"
                        checked={values.addresses[1].type === '2'}
                        onChange={() => setFieldValue('addresses[1].type', '2')}
                      />
                      Rural
                    </label>
                  </div>
                  <div className="radio">
                    <label className="radio-label">
                      <input
                        type="radio"
                        name="addresses[1].type"
                        value="3"
                        checked={values.addresses[1].type === '3'}
                        onChange={() => setFieldValue('addresses[1].type', '3')}
                      />
                      Casa de Praia
                    </label>
                  </div>
                </div>
                <button
                  type="button"
                  disabled={isSubmitting}
                  onClick={() => {
                    function showHide() {
                      if (menu === true) {
                        setMenu(false);
                      } else {
                        setMenu(true);
                      }
                    }
                    showHide();
                  }}
                >
                  {menu ? '-' : '+'}
                </button>

                <button type="submit" disabled={isSubmitting}>
                  Cadastrar
                </button>
              </form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
}
