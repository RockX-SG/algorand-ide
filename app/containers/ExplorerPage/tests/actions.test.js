import { 
  addNewFile 
} from '../actions';
import { 
  ADD_NEW_FILE 
} from '../constants';

describe('ExplorerPage actions', () => {
  describe('Add new file Action', () => {
    it('has a type of ADD_NEW_FILE', () => {
      const expected = {
        type: ADD_NEW_FILE,
      };
      expect(addNewFile()).toEqual(expected);
    });
  });
});
