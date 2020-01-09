import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import './styles.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';

import logo from '../../assets/logo.png';

export default function List() {
  const [clients, setClients] = useState([]);
  var count = 1;

  useEffect(() => {
    async function loadClients() {
      const response = await api.get('/users');
      setClients(response.data);
    }

    loadClients();
  }, []);

  return (
    <div className="container-table">
      <div className="content-table">
        <img src={logo} alt="SolarTech" />
        <h1 className="title">Lista de Clientes</h1>
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th>#</th>
              <th>Nome</th>
              <th>CPF/CNPJ</th>
              <th>Telefone</th>
              <th>Email</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {clients.map(client => (
              <tr key={client.id} id={client.id}>
                <td>
                  <b>{count++}</b>
                </td>
                <td>{client.name}</td>
                <td>{client.cpf}</td>
                <td>{client.telephone}</td>
                <td>{client.email}</td>
                <td>
                  <FontAwesomeIcon icon={faPencilAlt} color="black" size="lg" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
