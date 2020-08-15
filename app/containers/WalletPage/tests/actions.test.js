import { 
  changeNetwork,
  faucetSend,
  faucetContractSend,
  sendTransaction
} from '../actions';
import { 
  CHANGE_NETWORK,
  SEND_TRANSACTION
} from '../constants';

describe('WalletPage actions', () => {
  describe('Change Network Action', () => {
    it('has a type of CHANGE_NETWORK', () => {
      const expected = {
        type: CHANGE_NETWORK,
      };
      expect(changeNetwork()).toEqual(expected);
    });
  });
  
  describe('Send Transaction From Faucet Action', () => {
    it('has a type of SEND_TRANSACTION', () => {
      const expected = {
        type: SEND_TRANSACTION,
        sendFrom: "faucet",
      };
      expect(faucetSend()).toEqual(expected);
    });
  });
  
  describe('Send Transaction From Faucet To Contract Action', () => {
    it('has a type of SEND_TRANSACTION', () => {
      const expected = {
        type: SEND_TRANSACTION,
        sendFrom: "faucetContract",
      };
      expect(faucetContractSend()).toEqual(expected);
    });
  });
  
  describe('Send Transaction From User Action', () => {
    it('has a type of SEND_TRANSACTION', () => {
      const expected = {
        type: SEND_TRANSACTION,
        sendFrom: "user",
      };
      expect(sendTransaction()).toEqual(expected);
    });
  });
});

