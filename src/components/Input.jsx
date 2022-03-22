import 'bootstrap/dist/css/bootstrap.min.css';
import PropTypes from 'prop-types';
import React from 'react';
import { Form } from 'react-bootstrap';

export default function Input({
  id,
  name,
  onChange,
  text,
  type,
  value,
}) {
  return (
    <Form.Label htmlFor={name} style={{ border: '0px solid yellow', width: '100%', fontSize: 'medium' }}>
      {text}
      <Form.Control
        style={{ border: '0px solid blue', margin: '0 0 15px 0' }}
        className="flex-fill"
        data-testid={id}
        type={type}
        name={name}
        onChange={onChange}
        value={value}
      />
    </Form.Label>
  );
}

Input.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func,
  text: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.string,
}.isRequired;

Input.defaultProps = {
  pattern: '',
  dataType: 'text',
};
