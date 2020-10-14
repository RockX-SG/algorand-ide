/*
 *
 * TutorialPage reducer
 *
 */
import produce from 'immer';
import { 
  JS_EXECUTE_CODE_TUTORIAL_SUCCESS,
  CHANGE_FAUCET_DESTINATION_ADDRESS,
} from './constants';

export const initialState = {
  inputAddress: "",
  createAccount: {
    step1: [],
    step2: [],
    step3: [],
    step4: [],
    step6: [],
  },
  createAsset: {
    step1: [],
    step2: [],
    step3: [],
    step4: [],
    step5: [],
    step6: [],
  },
  limitOrderContract: {
    step1: [],
    step2: [],
    step3: [],
    step4: [],
    step5: [],
    step6: [],
  },
  transferAsset: {
    step1: [],
    step2: [],
    step3: [],
    step4: [],
    step5: [],
    step6: [],
  },
  hashTimeLock: {
    step1: [],
    step2: [],
    step3: [],
    step4: [],
    step5: [],
    step6: [],
  },
  destroyAsset: {
    step1: [],
    step2: [],
    step3: [],
    step4: [],
    step5: [],
    step6: [],
  },
  revokeAsset: {
    step1: [],
    step2: [],
    step3: [],
    step4: [],
    step5: [],
    step6: [],
  },
  optInAsset: {
    step1: [],
    step2: [],
    step3: [],
    step4: [],
    step5: [],
    step6: [],
  },
  freezeAsset: {
    step1: [],
    step2: [],
    step3: [],
    step4: [],
    step5: [],
    step6: [],
  },
  writeTransactionNote: {
    step1: [],
    step2: [],
    step3: [],
    step4: [],
    step5: [],
    step6: [],
  },
};


/* eslint-disable default-case, no-param-reassign */
const tutorialPageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case JS_EXECUTE_CODE_TUTORIAL_SUCCESS:
        if(action.tutorial == "create-account"){
          console.log("action", action);
          console.log("action.response", action.response);
          if(action.step == 1){
            draft.createAccount.step1.push(action.response);
          }else if(action.step == 2){
            draft.createAccount.step2.push(action.response);
          }else if(action.step == 3){
            draft.createAccount.step3.push(action.response);
          }else if(action.step == 4){
            draft.createAccount.step4.push(action.response);
          }else if(action.step == 6){
            draft.createAccount.step6.push(action.response);
          }
          
        }else if(action.tutorial == "create-asset"){
          if(action.step == 1){
            draft.createAsset.step1.push(action.response);
          }else if(action.step == 2){
            draft.createAsset.step2.push(action.response);
          }else if(action.step == 3){
            draft.createAsset.step3.push(action.response);
          }else if(action.step == 4){
            draft.createAsset.step4.push(action.response);
          }else if(action.step == 6){
            draft.createAsset.step6.push(action.response);
          }
          
        }else if(action.tutorial == "limit-order-contract"){
          if(action.step == 1){
            draft.limitOrderContract.step1.push(action.response);
          }else if(action.step == 2){
            draft.limitOrderContract.step2.push(action.response);
          }else if(action.step == 3){
            draft.limitOrderContract.step3.push(action.response);
          }
          
        }else if(action.tutorial == "transfer-asset"){
          
        }else if(action.tutorial == "hash-time-lock"){
          
        }else if(action.tutorial == "destroy-asset"){
          
        }else if(action.tutorial == "revoke-asset"){
          
        }else if(action.tutorial == "opt-in-asset"){
          
        }else if(action.tutorial == "freeze-asset"){
          
        }else if(action.tutorial == "write-transaction-note"){
          
        }
        
        break;
        
      case CHANGE_FAUCET_DESTINATION_ADDRESS:
        draft.inputAddress = action.address;
        
        break;
    }
  });

export default tutorialPageReducer;
