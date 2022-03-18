import React from 'react';
import CardToken from './CardToken';

export default function ListTokens() {
  const localTokens = JSON.parse(localStorage.getItem('walletKlever'));

  const renderTokens = (arrTokens) => arrTokens.map((elem) => (
    <CardToken
      key={elem.token}
      // index={elem.token}
      token={elem.token}
      balance={elem.balance}
    />
  ));

  return (
    <div>
      {localTokens !== null
        ? renderTokens(localTokens)
        : <p>Wallet vazia</p>}
    </div>
  );
}
