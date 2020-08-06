import { 
  changeNetwork
} from '../actions';
import { 
  CHANGE_NETWORK
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
});
