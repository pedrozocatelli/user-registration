import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';

import api from '../../services/api';
import './styles.css';
import logo from '../../assets/logo.png';

export default function List({ history, location }) {
  const [clients, setClients] = useState([]);
  let count = 1;

  let formataCPF = cpf => {
    cpf = cpf.replace(/[^\d]/g, '');
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  };

  useEffect(() => {
    async function loadClients() {
      const response = await api.get('/users');
      setClients(response.data);
    }
    loadClients();
  }, []);

  let nextRoute = id => {
    history.push({
      pathname: 'user',
      state: {
        key: id
      }
    });
  };

  let deleteUser = (e, id) => {
    e.stopPropagation();

    Swal.fire({
      title: 'Você tem certeza?',
      text: 'Não será possível reverter essa ação!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim, excluir usuário!',
      cancelButtonText: 'Cancelar'
    }).then(result => {
      if (result.value) {
        try {
          async function deleteClient() {
            await api.delete(`/users/${id}`);
          }
          deleteClient();
          Swal.fire({
            title: 'Sucesso!',
            text: 'Usuário excluído com sucesso!',
            icon: 'success',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'OK'
          }).then(result => {
            async function reloadTable() {
              const response = await api.get('/users');
              setClients(response.data);
            }
            reloadTable();
          });
        } catch (error) {
          Swal.fire('Oops...', 'Ocorreu um erro', 'error');
        }
      }
    });
  };

  return (
    <div className="container-table">
      <div className="content-table">
        <Link to="/">
          <button className="btn-voltar">Voltar</button>
        </Link>
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
              <th></th>
            </tr>
          </thead>
          <tbody>
            {clients.map(client => (
              <tr
                key={client.id}
                id={client.id}
                onClick={() => {
                  nextRoute(client.id);
                }}
              >
                <td>
                  <b>{count++}</b>
                </td>
                <td>{client.name}</td>
                <td>{formataCPF(client.cpf)}</td>
                <td>{client.telephone}</td>
                <td>{client.email}</td>
                <td>
                  <FontAwesomeIcon icon={faPencilAlt} color="black" size="lg" />
                </td>
                <td onClick={e => deleteUser(e, client.id)}>
                  <FontAwesomeIcon icon={faTrashAlt} color="black" size="lg" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
