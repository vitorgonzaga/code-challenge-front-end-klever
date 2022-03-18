import PropTypes from 'prop-types';
import React from 'react';

export default function Button({
  id,
  disabled,
  onClick,
  text,
}) {
  return (
    <button
      type="button"
      data-testid={id}
      onClick={onClick}
      disabled={disabled}
    >
      { text }
    </button>
  );
}
Button.propTypes = {
  disabled: PropTypes.bool,
  id: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
};

Button.defaultProps = {
  disabled: false,
};
