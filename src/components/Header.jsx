import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { Container } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.svg';
import ShootingStarIcon from '../svgComponents/ShootingStarIcon';
import Button from './Button';

export default function Header() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const selectVarsBy = {
    '/home': {
      id: 'add-token',
      text: 'Add Token',
      func: () => { navigate('/addToken'); },
      classNameBtn: 'btn btn-primary',
    },
    '/editpage': {
      id: 'edit',
      text: 'Voltar',
      func: () => { navigate('/home'); },
      classNameBtn: 'btn btn-default',
    },
    '/addToken': {
      id: 'back-to-home',
      text: 'Voltar',
      func: () => { navigate('/home'); },
      classNameBtn: 'btn btn-default',
    },
  };

  return (
    <Container style={{ border: '2px solid white', width: '700px' }}>
      <div style={{
        border: '2px solid blue',
        display: 'flex',
        flexDirection: 'row',
        height: '200px',
        justifyContent: 'center',
      }}
      >
        <img src={logo} style={{ width: 150 }} alt="logo" />
      </div>
      <Container style={{
        border: '2px solid red', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around',
      }}
      >
        <Container style={{
          display: 'flex', flexDirection: 'row', justifyContent: '', alignItems: 'center',
        }}
        >
          <ShootingStarIcon width={50} />
          <p style={{
            fontWeight: 'bold', fontSize: '1.4em', border: '1px solid yellow', margin: '0 0 0 15px',
          }}
          >
            Wish Wallet
          </p>
        </Container>
        <Button
          id={`header_button-${selectVarsBy[pathname].id}`}
          onClick={selectVarsBy[pathname].func}
          text={selectVarsBy[pathname].text}
          className={selectVarsBy[pathname].classNameBtn}
        />
      </Container>
    </Container>
  );
}
