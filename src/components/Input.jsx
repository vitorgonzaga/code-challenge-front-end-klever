import PropTypes from 'prop-types';
import React from 'react';

export default function Input({
  id,
  name,
  onChange,
  text,
  type,
  value,
}) {
  return (
    <label htmlFor={name}>
      {text}
      <input
        data-testid={id}
        type={type}
        name={name}
        onChange={onChange}
        value={value}
      />
    </label>
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
