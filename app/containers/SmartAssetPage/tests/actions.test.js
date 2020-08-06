import { 
  createAsset 
} from '../actions';
import { 
  CREATE_ASSET 
} from '../constants';

describe('SmartAssetPage actions', () => {
  describe('Create asset Action', () => {
    it('has a type of CREATE_ASSET', () => {
      const expected = {
        type: CREATE_ASSET,
      };
      expect(createAsset()).toEqual(expected);
    });
  });
});
