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
    step7: [],
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
    step7: [],
  },
  revokeAsset: {
    step1: [],
    step2: [],
    step3: [],
    step4: [],
    step5: [],
    step6: [],
    step7: [],
  },
  optInAsset: {
    step1: [],
    step2: [],
    step3: [],
    step4: [],
    step5: [],
    step6: [],
    step7: [],
  },
  freezeAsset: {
    step1: [],
    step2: [],
    step3: [],
    step4: [],
    step5: [],
    step6: [],
    step7: [],
    step8: [],
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
          if(action.step == 7){
            draft.transferAsset.step7.push(action.response);
          }
          
        }else if(action.tutorial == "hash-time-lock"){
          if(action.step == 1){
            draft.hashTimeLock.step1.push(action.response);
          }else if(action.step == 2){
            draft.hashTimeLock.step2.push(action.response);
          }else if(action.step == 3){
            draft.hashTimeLock.step3.push(action.response);
          }else if(action.step == 4){
            draft.hashTimeLock.step4.push(action.response);
          }
          
        }else if(action.tutorial == "destroy-asset"){
          if(action.step == 1){
            draft.destroyAsset.step1.push(action.response);
          }else if(action.step == 2){
            draft.destroyAsset.step2.push(action.response);
          }else if(action.step == 3){
            draft.destroyAsset.step3.push(action.response);
          }else if(action.step == 4){
            draft.destroyAsset.step4.push(action.response);
          }else if(action.step == 5){
            draft.destroyAsset.step5.push(action.response);
          }else if(action.step == 6){
            draft.destroyAsset.step6.push(action.response);
          }else if(action.step == 7){
            draft.destroyAsset.step7.push(action.response);
          }
        }else if(action.tutorial == "revoke-asset"){
          if(action.step == 7){
            draft.revokeAsset.step7.push(action.response);
          }
          
        }else if(action.tutorial == "opt-in-asset"){
          if(action.step == 7){
            draft.optInAsset.step7.push(action.response);
          }
          
        }else if(action.tutorial == "freeze-asset"){
          if(action.step == 1){
            draft.freezeAsset.step1.push(action.response);
          }else if(action.step == 2){
            draft.freezeAsset.step2.push(action.response);
          }else if(action.step == 3){
            draft.freezeAsset.step3.push(action.response);
          }else if(action.step == 4){
            draft.freezeAsset.step4.push(action.response);
          }else if(action.step == 5){
            draft.freezeAsset.step5.push(action.response);
          }else if(action.step == 6){
            draft.freezeAsset.step6.push(action.response);
          }else if(action.step == 7){
            draft.freezeAsset.step7.push(action.response);
          }else if(action.step == 8){
            draft.freezeAsset.step8.push(action.response);
          }
          
        }else if(action.tutorial == "write-transaction-note"){
          if(action.step == 1){
            draft.writeTransactionNote.step1.push(action.response);
          }else if(action.step == 2){
            draft.writeTransactionNote.step2.push(action.response);
          }else if(action.step == 3){
            draft.writeTransactionNote.step3.push(action.response);
          }else if(action.step == 4){
            draft.writeTransactionNote.step4.push(action.response);
          }
        }
        
        break;
        
      case CHANGE_FAUCET_DESTINATION_ADDRESS:
        draft.inputAddress = action.address;
        
        break;
    }
  });

export default tutorialPageReducer;
