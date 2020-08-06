import { 
  changeAssetId 
} from '../actions';
import { 
  CHANGE_ASSET_ID 
} from '../constants';

describe('TransactionPage actions', () => {
  describe('Change asset id Action', () => {
    it('has a type of CHANGE_ASSET_ID', () => {
      const expected = {
        type: CHANGE_ASSET_ID,
      };
      expect(changeAssetId()).toEqual(expected);
    });
  });
});
