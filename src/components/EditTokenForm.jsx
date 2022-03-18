import Joi from 'joi-browser';
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Context from '../context/Context';
import Button from './Button';
import DisplayErrors from './DisplayErrors';
import Input from './Input';

export default function EditTokenForm() {
  const navigate = useNavigate();

  const { dataToFeedEditPage, setDataToFeedEditPage } = useContext(Context);

  const handleChange = ({ target: { name, value } }) => {
    setDataToFeedEditPage({
      ...dataToFeedEditPage,
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

  const feedErrorArray = (arrError) => {
    const errorData = [];

    arrError.details.forEach((item) => {
      const { message } = item;
      errorData.push(message);
    });
    setErrors(errorData);
    return errorData;
  };

  const validateForm = () => {
    const { error } = Joi.validate(
      dataToFeedEditPage,
      schema,
      { abortEarly: false },
    );

    if (!error) {
      return null;
    }
    return feedErrorArray(error);
  };

  const { compare } = useContext(Context);

  const updateLocalStorage = (arrTokensFromLocalStorage, tokenObjToOverWrite, blnRemove) => {
    // Generate an array without the object which will updated
    const arrWithoutTokenToUpdate = arrTokensFromLocalStorage.filter(
      ({ token }) => token !== tokenObjToOverWrite.token,
    );
    if (blnRemove === false || undefined) {
      // Including the object from global state
      const arrToSaveIntoLocalStorage = [...arrWithoutTokenToUpdate, tokenObjToOverWrite];
      // Saving it in localStorage
      localStorage.setItem('walletKlever', JSON.stringify(arrToSaveIntoLocalStorage.sort(compare)));
    } else {
      // =====================================================================================
      // Insight: https://linuxhint.com/comparing-two-arrays-in-javascript/
      if (arrTokensFromLocalStorage.toString() === arrWithoutTokenToUpdate.toString()) alert(`${tokenObjToOverWrite.token} não encontrado.`);
      // =====================================================================================
      // Saving it in localStorage
      localStorage.setItem('walletKlever', JSON.stringify(arrWithoutTokenToUpdate.sort(compare)));
    }
  };

  const handleClick = () => {
    const hasError = validateForm();
    if (hasError === null) {
      const { token, balance } = dataToFeedEditPage;
      // check if "walletKlever" in in localStorage
      // If afirmative, get it and does spread to add new
      const localWallet = JSON.parse(localStorage.getItem('walletKlever'));
      if (localWallet) {
        updateLocalStorage(localWallet, dataToFeedEditPage);
        navigate('/home');
      } else {
        // In fact it will not be used...
        localStorage.setItem(
          'walletKlever',
          JSON.stringify([{ token, balance }]),
        );
        navigate('/home');
      }
    }
  };

  const handleClickRemove = () => {
    const { error } = Joi.validate(
      dataToFeedEditPage.token,
      Joi.string().min(3).max(3).required(),
      { abortEarly: false },
    );
    if (!error) {
      const localWallet = JSON.parse(localStorage.getItem('walletKlever'));
      updateLocalStorage(localWallet, dataToFeedEditPage, true);
      navigate('/home');
    } else {
      return feedErrorArray(error);
    }
    return null;
  };

  return (
    <>
      { errors ? <DisplayErrors errors={errors} /> : null }
      <Input
        id="edit_token_page__input-token"
        name="token"
        onChange={handleChange}
        text="Token"
        type="text"
        value={dataToFeedEditPage.token.toUpperCase()}
      />
      <Input
        id="edit_token_page__input-balance"
        name="balance"
        onChange={handleChange}
        text="Balance"
        type="text"
        value={dataToFeedEditPage.balance}
      />
      <Button
        id="edit_token_page__btn-save"
        onClick={handleClick}
        text="Save"
      />
      <Button
        id="edit_token_page__btn-remove"
        onClick={handleClickRemove}
        text="Remove"
      />
    </>
  );
}
