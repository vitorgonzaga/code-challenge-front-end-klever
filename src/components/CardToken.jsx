import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import editIcon from '../assets/icons8-edit-64.png';
import Context from '../context/Context';

export default function CardToken({
  token,
  balance,
}) {
  const navigate = useNavigate();
  const { setDataToFeedEditPage } = useContext(Context);

  const imageClick = async (strToken, strBalance) => {
    try {
      await setDataToFeedEditPage({
        token: strToken,
        balance: strBalance,
      });
      await navigate('/editpage');
    } catch (error) {
      console.log('imageClick -> error', error.message);
    }
  };

  return (
    <div key={token}>
      <button key={`${token}-btn`} type="button" onClick={async () => imageClick(token, balance)}>
        <img
          alt="edit icon"
          key={`${token}-icon`}
          src={editIcon}
        />
      </button>
      <div key={`${token}-div-token`}>{token}</div>
      <div key={`${token}-div-balance`}>{balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}</div>
    </div>
  );
}

CardToken.propTypes = {
  index: PropTypes.number,
  balance: PropTypes.string,
  token: PropTypes.string,
}.isRequired;
