import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import Provider from '../context/Provider';

// Versão chave e valor (Por enquanto não foi necessário utilizar)
// const walletLocal = {
//   walletKlever: [
//     { token: 'BTC', balance: '10' },
//     { token: 'KLV', balance: '1256.01' },
//     { token: 'DVK', balance: '50250.71' },
//   ],
// };

const host = 'http://localhost';

const walletLocal = [
  { token: 'BTC', balance: '10' },
  { token: 'KLV', balance: '1256.01' },
  { token: 'DVK', balance: '50250.71' },
];

const selectors = {
  home_page: {
    logoId: 'header-logo-image',
    shootingStarIconId: 'header-shootinStarIcon-svg',
    mainTextId: 'header-main-text-page',
    buttonAddTokenId: 'header-button-add-token',
    tHeadTokenId: 'home_page__thead-tokens',
    tHeadBalanceId: 'home_page__thead-balance',
    editIconId: '-edit-icon',
    tokenId: '-div-token',
    balanceId: '-div-balance',
  },
};

const selectorsAddTokenPage = {
  inputToken: 'add_token_page__input-token',
  inputBalance: 'add_token_page__input-balance',
  saveButton: 'add_token_page__btn-save',
};

const newTokens = [
  { token: 'BTC', balance: '11' },
  { token: 'KFI', balance: '10.00' },
];

describe('Considerando uma carteira pré-estabelecida no local Storage para realização dos testes', () => {
  let originalLocalStorage;

  // ===============================================================================================
  // Source: https://javascript.plainenglish.io/testing-local-storage-with-testing-library-580f74e8805b
  // ===============================================================================================
  beforeEach(() => {
    originalLocalStorage = window.localStorage;
    delete window.localStorage;
    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: jest.fn(() => JSON.stringify(walletLocal)),
        setItem: jest.fn(() => null),
      },
      writable: true,
    });
  });

  // Source: https://github.com/facebook/jest/issues/6798#issuecomment-437537691
  afterEach(() => {
    Object.defineProperty(window, 'localStorage', {
      writable: true,
      value: originalLocalStorage,
    });
  });

  it('Verifica se o localStorage foi chamado uma vez', async () => {
    await render(<App />, { wrapper: Provider });
    expect(window.localStorage.getItem).toHaveBeenCalledTimes(1);
  });

  it('Verifica se os elementos estão renderizados na home page', async () => {
    await render(<App />, { wrapper: Provider });
    screen.getByTestId(selectors.home_page.logoId);
    screen.getByTestId(selectors.home_page.shootingStarIconId);
    screen.getByTestId(selectors.home_page.mainTextId);
    screen.getByTestId(selectors.home_page.buttonAddTokenId);
    screen.getByTestId(selectors.home_page.tHeadTokenId);
    screen.getByTestId(selectors.home_page.tHeadBalanceId);
    walletLocal.forEach(async (item) => {
      screen.getByTestId(`${item.token}${selectors.home_page.editIconId}`);
      screen.getByTestId(`${item.token}${selectors.home_page.tokenId}`);
      screen.getByTestId(`${item.token}${selectors.home_page.balanceId}`);
    });
    // screen.debug();
  });

  it('Adiciona um token repetido e verifica se o existente no localStorage foi atualizado', async () => {
    await render(<App />, { wrapper: Provider });

    userEvent.click(screen.getByTestId(selectors.home_page.buttonAddTokenId));

    await expect(window.location.href).toEqual(`${host}/addtoken`);

    expect(screen.getByTestId(selectorsAddTokenPage.inputToken)).toHaveValue('');
    expect(screen.getByTestId(selectorsAddTokenPage.inputBalance)).toHaveValue('');

    await userEvent.type(screen.getByTestId(
      selectorsAddTokenPage.inputToken,
    ), newTokens[0].token);

    await userEvent.type(screen.getByTestId(
      selectorsAddTokenPage.inputBalance,
    ), newTokens[0].balance);

    await userEvent.click(screen.getByTestId(selectorsAddTokenPage.saveButton));

    await expect(window.location.href).toEqual(`${host}/home`);

    expect(screen.getAllByText('BTC')).toHaveLength(1);
  });
});
