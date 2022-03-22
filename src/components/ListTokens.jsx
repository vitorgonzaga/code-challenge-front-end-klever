import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { Container } from 'react-bootstrap';
import CardToken from './CardToken';

export default function ListTokens() {
  const localTokens = JSON.parse(localStorage.getItem('walletKlever'));

  const renderTokens = (arrTokens) => (
    <>
      <Container style={{
        display: 'flex',
        flexDirection: 'row',
        height: '70px',
        width: '700px',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
      }}
      >
        <div
          data-testid="home_page__thead-tokens"
          style={{
            fontWeight: 'bold',
            fontSize: 'medium',
            margin: '0 0 15px 40px',
          }}
        >
          Tokens

        </div>
        <div
          data-testid="home_page__thead-balance"
          style={{
            fontWeight: 'bold',
            fontSize: 'medium',
            margin: '0 0 15px 0',
          }}
        >
          Balance

        </div>
      </Container>
      <Container>
        {arrTokens.map((elem) => (
          <CardToken
            key={elem.token}
          // index={elem.token}
            token={elem.token}
            balance={elem.balance}
          />
        ))}
      </Container>
    </>
  );

  return (
    <div>
      {localTokens !== null
        ? renderTokens(localTokens)
        : (
          <Container style={{
            display: 'flex',
            flexDirection: 'row',
            height: '140px',
            width: '700px',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          >
            Wallet vazia
          </Container>
        )}
    </div>
  );
}
