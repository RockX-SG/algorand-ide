/**
 * Test sagas
 */

/* eslint-disable redux-saga/yield-effects */
import { take, call, put, select, takeLatest } from 'redux-saga/effects';
import { 
  SEND_TRANSACTION,
  GET_FAUCET_BALANCE
} from 'containers/WalletPage/constants';

import { 
  getFaucetBalanceSuccess,
  getFaucetBalanceError,
} from 'containers/WalletPage/actions';

import { 
  sendTransaction,
  getFaucetBalance
} from '../saga';

import {
  makeSelectExplorerPage
} from 'containers/ExplorerPage/selectors';
// import walletPageSaga from '../saga';
// 
// const generator = walletPageSaga();


var algosdk = require('algosdk')

const baseServer = 'https://testnet-algorand.api.purestake.io/ps1';
const port = '';
const token = {
    'X-API-Key': 'iUYKksMBYO6odqKYA6PN65HzsvLJ8slV5zSugoGx'
}

const algodclient = new algosdk.Algod(token, baseServer, port);

describe('walletPageSaga Saga', () => {
  it('Expect to have unit tests specified', () => {
    expect(true).toEqual(true);
  });
  
  // it('Send Transaction', () => {
  //   expect(true).toEqual(true);
  // });
});

describe('sendTransactionSaga Saga', () => {
  const sendTransactionSaga = sendTransaction({sendFrom: "user"});

  it('should start task to watch for SEND_TRANSACTION action', () => {
    const takeLatestDescriptor = sendTransactionSaga.next().value;
    expect(takeLatestDescriptor).toEqual(select(makeSelectExplorerPage()));
    // const takeLatestDescriptor = sendTransactionSaga.next().value;
    // expect(takeLatestDescriptor).toEqual(takeLatest(SEND_TRANSACTION, sendTransaction));
  });
});

// describe('getFaucetBalanceSaga Saga', () => {
//   let getFaucetBalanceSaga;
// 
//   beforeEach(() => {
//     getFaucetBalanceSaga = getFaucetBalance();
// 
//     const selectDescriptor = getFaucetBalance.next().value;
//     expect(selectDescriptor).toMatchSnapshot();
// 
//     const callDescriptor = getFaucetBalance.next(username).value;
//     expect(callDescriptor).toMatchSnapshot();
//   });
// 
//   it('should start task to watch for GET_FAUCET_BALANCE action', () => {
//     const takeLatestDescriptor = getFaucetBalanceSaga.next().value;
//     console.log(takeLatestDescriptor);
//     // expect(takeLatestDescriptor).toEqual(takeLatest(GET_FAUCET_BALANCE, getFaucetBalance));
//     // expect(takeLatestDescriptor).toEqual(call(algodclient.accountInformation,"CYVBA6MAXXDHMAALBJEJGUXERVK2LHPZWZGMQFVIC5CGIDGUQ4IWGOLTMM"));
//     expect(takeLatestDescriptor).toEqual(call(algodclient.accountInformation,"CYVBA6MAXXDHMAALBJEJGUXERVK2LHPZWZGMQFVIC5CGIDGUQ4IWGOLTMM"));
//     // expect(takeLatestDescriptor).toEqual(put(getFaucetBalanceSuccess('accountInfo["amount"]')));
//   });
// });
