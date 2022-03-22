import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Context from '../context/Context';

export default function EditIcon({ token, balance }) {
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
    <svg
      data-testid={`${token}-edit-icon`}
      // key={key}
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6"
      width={22}
      fill="none"
      viewBox="0 0 24 24"
      stroke="#FFFFFF"
      strokeWidth="2"
      onClick={async () => imageClick(token, balance)}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
      />
    </svg>
  );
}

EditIcon.propTypes = {
  fill: PropTypes.string,
}.isRequired;
