import 'bootstrap/dist/css/bootstrap.min.css';
import PropTypes from 'prop-types';
import React from 'react';
import { Container } from 'react-bootstrap';
import EditIcon from '../svgComponents/EditIcon';

export default function CardToken({
  token,
  balance,
}) {
  return (
    <Container
      key={token}
      style={{
        border: '0px solid white',
        width: '700px',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}
    >
      <div style={{
        border: '0px solid red',
        display: 'flex',
        flexDirection: 'row',
        // justifyContent: 'flex-end',
      }}
      >
        <EditIcon key={`${token}-btn`} token={token} balance={balance} />
        <div
          role="listitem"
          data-testid={`${token}-div-token`}
          key={`${token}-div-token`}
          style={{
            width: '60px',
            margin: '0 20px 0 20px',
            fontWeight: 'bold',
          }}
        >
          {token}

        </div>
      </div>
      <div
        data-testid={`${token}-div-balance`}
        key={`${token}-div-balance`}
        style={{ fontWeight: 'bold' }}
      >
        {balance.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2 })}

      </div>
    </Container>
  );
}

CardToken.propTypes = {
  index: PropTypes.number,
  balance: PropTypes.string,
  token: PropTypes.string,
}.isRequired;
