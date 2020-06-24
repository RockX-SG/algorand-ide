/*
 *
 * SmartContractPage reducer
 *
 */
import produce from 'immer';
import {
  UPDATE_CODE_VALUE,
  CHANGE_CONTRACT,
  CODE_DEPLOY
} from './constants';

import templateContract1 from './templateContract1.js';
import templateContract2 from './templateContract2.js';
import templateContract3 from './templateContract3.js';
import templateContract4 from './templateContract4.js';

export const initialState = {
  codeValue: ""
};

/* eslint-disable default-case, no-param-reassign */
const smartContractPageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case UPDATE_CODE_VALUE:
        draft.codeValue = action.codeValue;

        break;

      case CHANGE_CONTRACT:
        if(action.contract == "contract1"){
          draft.codeValue = templateContract1;
        }else if(action.contract == "contract2"){
          draft.codeValue = templateContract2;
        }else if(action.contract == "contract3"){
          draft.codeValue = templateContract3;
        }else if(action.contract == "contract4"){
          draft.codeValue = templateContract4;
        }else{
          draft.codeValue = "";
        }

        break;
    }
  });

export default smartContractPageReducer;
