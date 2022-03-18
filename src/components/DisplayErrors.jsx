import PropTypes from 'prop-types';
import React from 'react';

export default function DisplayErrors({ errors }) {
  return (
    <>
      {
        errors.map((error) => (
          <p key={error}>{ error }</p>
        ))
      }
    </>
  );
}

DisplayErrors.propTypes = {
  errors: PropTypes.shape(),
}.isRequired;
