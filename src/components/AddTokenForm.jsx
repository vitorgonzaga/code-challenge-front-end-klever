import 'bootstrap/dist/css/bootstrap.min.css';
import Joi from 'joi-browser';
import React, { useContext, useState } from 'react';
import {
  Col, Container, Form, Row,
} from 'react-bootstrap';
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

  // const handleChange = ({ target: { name, value } }) => {
  //   setFormData({
  //     ...formData,
  //     [name]: value,
  //   });
  // };

  // Some insights were got with sources bellow:
  // Source: https://www.geeksforgeeks.org/implementing-joi-module-in-reactjs/
  // Source: https://codesandbox.io/s/y4pmy07xz?file=/src/Form/Form.js
  const [errors, setErrors] = useState([]);
  const schema = {
    token: Joi.string().min(3).max(3).required(),
    balance: Joi.number().positive().required(),
  };

  const validateForm = () => {
    console.log('validateForm -> formData', formData);
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
    console.log('handleClick -> hasError', hasError);
    if (hasError === null) {
      const { token, balance } = formData;
      // check if "walletKlever" in in localStorage
      // If afirmative, get it and does spread to add new
      const localWallet = JSON.parse(localStorage.getItem('walletKlever'));
      if (localWallet) {
        const localClear = localWallet.filter((item) => item.token !== token);
        const formattedData = [
          ...localClear,
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
    <Container style={{ border: '0px solid white', width: '700px' }}>
      { errors ? <DisplayErrors errors={errors} /> : null }
      <Container style={{ border: '0px solid red' }}>
        <Form style={{ margin: '0 0 0 65px' }}>
          <Col>
            <Row>
              <Form.Group>
                <Input
                  id="add_token_page__input-token"
                  name="token"
                  onChange={({ target: { value } }) => {
                    const valueFormated = value.toUpperCase();
                    return setFormData(
                      {
                        ...formData,
                        token: valueFormated,
                      },
                    );
                  }}
                  text="Token"
                  type="text"
                  value={formData.token}
                />
              </Form.Group>
            </Row>
            <Row>
              <Form.Group>
                <Input
                  id="add_token_page__input-balance"
                  name="balance"
                  onChange={({ target: { value } }) => {
                    const balanceFormated = value
                      .toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2 });
                    console.log('AddTokenForm -> balanceFormated', balanceFormated);
                    return setFormData(
                      {
                        ...formData,
                        balance: balanceFormated,
                      },
                    );
                  }}
                  text="Balance"
                  type="text"
                  value={formData.balance}
                />
              </Form.Group>
            </Row>
            <Container style={{
              border: '0px solid green',
              display: 'flex',
              justifyContent: 'flex-end',
              padding: '0 0 0 0',
            }}
            >
              <Button
                id="add_token_page__btn-save"
                onClick={handleClick}
                text="Save"
                className="btn btn-primary"
              />
            </Container>
          </Col>
        </Form>
      </Container>
    </Container>
  );
}
