import Joi from 'joi-browser';
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Context from '../context/Context';
import Button from './Button';
import DisplayErrors from './DisplayErrors';
import Input from './Input';

export default function AddTokenForm() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    token: '',
    balance: '',
  });

  const handleChange = ({ target: { name, value } }) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Some insights were got with sources bellow:
  // Source: https://www.geeksforgeeks.org/implementing-joi-module-in-reactjs/
  // Source: https://codesandbox.io/s/y4pmy07xz?file=/src/Form/Form.js
  const [errors, setErrors] = useState([]);
  const schema = {
    token: Joi.string().min(3).max(3).required(),
    balance: Joi.number().positive().required(),
  };

  const validateForm = () => {
    const { error } = Joi.validate(
      formData,
      schema,
      { abortEarly: false },
    );

    if (!error) {
      return null;
    }

    const errorData = [];

    error.details.forEach((item) => {
      const { message } = item;
      errorData.push(message);
    });
    setErrors(errorData);
    return errorData;
  };

  const { compare } = useContext(Context);

  const handleClick = () => {
    const hasError = validateForm();
    if (hasError === null) {
      const { token, balance } = formData;
      // check if "walletKlever" in in localStorage
      // If afirmative, get it and does spread to add new
      const localWallet = JSON.parse(localStorage.getItem('walletKlever'));
      if (localWallet) {
        const formattedData = [
          ...localWallet,
          { token, balance },
        ];
        localStorage.setItem(
          'walletKlever',
          JSON.stringify(formattedData.sort(compare)),
        );
        navigate('/home');
      } else {
        localStorage.setItem(
          'walletKlever',
          JSON.stringify([{ token, balance }]),
        );
        navigate('/home');
      }
    }
  };

  return (
    <>
      { errors ? <DisplayErrors errors={errors} /> : null }
      <Input
        id="add_token_page__input-token"
        name="token"
        onChange={handleChange}
        text="Token"
        type="text"
        value={formData.token.toUpperCase()}
      />
      <Input
        id="add_token_page__input-balance"
        name="balance"
        onChange={handleChange}
        text="Balance"
        type="text"
        value={formData.balance}
      />
      <Button
        id="add_token_page__btn-save"
        onClick={handleClick}
        text="Save"
      />
    </>
  );
}
