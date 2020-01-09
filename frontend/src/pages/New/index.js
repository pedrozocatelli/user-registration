import React from 'react';
import { render } from 'react-dom';
import { Formik } from 'formik';
import * as Yup from 'yup';

import './styles.css';

export default function New() {
  return (
    <div className="container-add">
      <div className="content-add">
        {' '}
        <Formik
          initialValues={{ email: '', name: '' }}
          onSubmit={async values => {
            await new Promise(resolve => setTimeout(resolve, 500));
            alert(JSON.stringify(values, null, 2));
          }}
          validationSchema={Yup.object().shape({
            name: Yup.string()
              .required('É necessário um nome')
              .min(8, 'Poucos caracteres'),
            cpf: Yup.string()
              .required('É necessário o CPF do cliente')
              .min(8),
            email: Yup.string()
              .email('E-mail inválido')
              .required('É necessário o email do cliente')
          })}
        >
          {props => {
            const {
              values,
              touched,
              errors,
              dirty,
              isSubmitting,
              handleChange,
              handleBlur,
              handleSubmit,
              handleReset
            } = props;
            return (
              <form onSubmit={handleSubmit}>
                {/* NOME */}
                <h1 className="add-title">Dados do Cliente</h1>
                <label htmlFor="name" style={{ display: 'block' }}>
                  Nome
                </label>
                <input
                  id="name"
                  placeholder="Digite o nome completo"
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
                <input
                  id="cpf"
                  placeholder="Digite o CPF do cliente"
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
                  placeholder="Digite o email do cliente"
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

                <button
                  type="button"
                  className="outline"
                  onClick={handleReset}
                  disabled={!dirty || isSubmitting}
                >
                  Limpar
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
