import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.svg';
import shootingStart from '../assets/shooting-star.svg';
import Button from './Button';

export default function Header() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const selectVarsBy = {
    '/home': {
      id: 'add-token',
      text: 'Add Token',
      func: () => { navigate('/addToken'); },
    },
    '/editpage': {
      id: 'edit',
      text: 'Voltar',
      func: () => { navigate('/home'); },
    },
    '/addToken': {
      id: 'back-to-home',
      text: 'Voltar',
      func: () => { navigate('/home'); },
    },
  };

  return (
    <div>
      <img src={logo} style={{ width: 150 }} alt="logo" />
      <div>
        <img src={shootingStart} style={{ width: 50 }} alt="shooting-star" />
        <p>Wish Wallet</p>
        <Button
          id={`header_button-${selectVarsBy[pathname].id}`}
          onClick={selectVarsBy[pathname].func}
          text={selectVarsBy[pathname].text}
        />
      </div>
    </div>
  );
}
