import PropTypes from 'prop-types';
import React, { useMemo, useState } from 'react';
import Context from './Context';

export default function Provider({ children }) {
  const [dataToFeedEditPage, setDataToFeedEditPage] = useState({});

  // Source: https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
  const compare = (a, b) => {
    if (a.token < b.token) {
      return -1;
    }
    if (a.token > b.token) {
      return 1;
    }
    return 0;
  };

  const context = useMemo(() => ({
    dataToFeedEditPage,
    setDataToFeedEditPage,
    compare,
  }));

  return (
    <Context.Provider value={context}>
      {children}
    </Context.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node,
}.isRequired;
