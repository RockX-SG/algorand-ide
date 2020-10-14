/*
 *
 * TutorialJsCreateAccountPage reducer
 *
 */
import produce from 'immer';
import { 
  CHANGE_FAUCET_DESTINATION_ADDRESS
} from './constants';

export const initialState = {
  inputAddress: "",
};

/* eslint-disable default-case, no-param-reassign */
const tutorialJsCreateAccountPageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case CHANGE_FAUCET_DESTINATION_ADDRESS:
        draft.inputAddress = action.address;
        
        break;
    }
  });

export default tutorialJsCreateAccountPageReducer;
