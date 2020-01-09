import React from 'react';
import { Link } from 'react-router-dom';
import './styles.css';

import logo from '../../assets/logo.png';

function Dashboard() {
  return (
    <div className="container">
      <div className="content">
        <img src={logo} alt="SolarTech" />
        <div className="title">
          <h1>Seja bem-vindo, João!</h1>
        </div>
        <Link to="/new">
          <button className="btn">Cadastrar Novo Cliente</button>
        </Link>
        <Link to="/list">
          <button className="btn">Visualizar Todos os Clientes</button>
        </Link>
      </div>
    </div>
  );
}

export default Dashboard;
