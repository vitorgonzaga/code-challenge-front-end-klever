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
      classNameBtn: 'btn btn-primary',
      func: () => { navigate('/addtoken'); },
      id: 'add-token',
      textBtn: 'Add Token',
    },
    '/editpage': {
      classNameBtn: 'btn btn-secondary',
      func: () => { navigate('/home'); },
      id: 'edit',
      text: 'Edit Token',
      textBtn: 'Voltar',
    },
    '/addtoken': {
      classNameBtn: 'btn btn-secondary',
      func: () => { navigate('/home'); },
      id: 'back-to-home',
      text: 'Add Token',
      textBtn: 'Voltar',
    },
  };

  return (
    <Container style={{ border: '0px solid white', width: '700px' }}>
      <div style={{
        border: '0px solid blue',
        display: 'flex',
        flexDirection: 'row',
        height: '200px',
        justifyContent: 'center',
      }}
      >
        <img
          alt="logo"
          data-testid="header-logo-image"
          src={logo}
          style={{ width: 200 }}
        />
      </div>
      <Container style={{
        border: '0px solid red',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: '',
        padding: '0 13px 0 13px',
      }}
      >
        <div style={{}}>
          <ShootingStarIcon width="90px" height="90px" />
        </div>
        <p
          data-testid="header-main-text-page"
          style={{
            fontWeight: 'bold',
            fontSize: '1.4em',
            border: '0px solid yellow',
            margin: '0 0 0 15px',
            width: '100%',
          }}
        >
          Wish Wallet
        </p>
        {pathname === '/home'
          ? (
            <div style={{
              margin: '0',
              padding: '0',
              border: '0px solid white',
              // width: '100%',
              display: 'flex',
              justifyContent: 'flex-end',
            }}
            >
              <Button
                id={`header-button-${selectVarsBy[pathname].id}`}
                onClick={selectVarsBy[pathname].func}
                text={selectVarsBy[pathname].textBtn}
                className={selectVarsBy[pathname].classNameBtn}
              />
            </div>
          )
          : null}
      </Container>
      {pathname !== '/home'
        ? (
          <Container style={{
            border: '0px solid green',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
          >
            <p style={{ margin: '0 0 0 66px', fontWeight: 'bold' }}>{selectVarsBy[pathname].text}</p>
            <Button
              id={`header_button-${selectVarsBy[pathname].id}`}
              onClick={selectVarsBy[pathname].func}
              text={selectVarsBy[pathname].textBtn}
              className={selectVarsBy[pathname].classNameBtn}
            />
          </Container>
        )
        : null}
    </Container>
  );
}
