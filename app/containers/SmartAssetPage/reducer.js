/*
 *
 * SmartAssetPage reducer
 *
 */
import produce from 'immer';
import {
  CREATE_ASSET,
  CREATE_ASSET_SUCCESS,
  CREATE_ASSET_ERROR,
  CHANGE_NOTE,
  CHANGE_ADDRESS,
  CHANGE_DEFAULT_FROZEN,
  CHANGE_TOTAL_ISSUANCE,
  CHANGE_UNIT_NAME,
  CHANGE_ASSET_NAME,
  CHANGE_ASSET_URL,
  CHANGE_ASSET_METADATA_HASH,
  CHANGE_MANAGER,
  CHANGE_RESERVE,
  CHANGE_FREEZE,
  CHANGE_CLAWBACK
} from './constants';

export const initialState = {
  formSubmitted: false,
  inputNote: undefined,
  inputAddress: "VBW6SN2L5Z3AJTBEXLOZGOP4I2BCFYU34IC4HGKYOB25YQ3ICYOEO275KE",
  inputDefaultFrozen: false,
  inputTotalIssuance: 1000,
  inputUnitName: "TEST",
  inputAssetName: "test",
  inputAssetURL: "http://test.com",
  inputAssetMetadataHash: "16efaa3924a6fd9d3a4824799a4ac65d",
  inputManager: "AJNNFQN7DSR7QEY766V7JDG35OPM53ZSNF7CU264AWOOUGSZBMLMSKCRIU",
  inputReserve: "AJNNFQN7DSR7QEY766V7JDG35OPM53ZSNF7CU264AWOOUGSZBMLMSKCRIU",
  inputFreeze: "AJNNFQN7DSR7QEY766V7JDG35OPM53ZSNF7CU264AWOOUGSZBMLMSKCRIU",
  inputClawback: "AJNNFQN7DSR7QEY766V7JDG35OPM53ZSNF7CU264AWOOUGSZBMLMSKCRIU",
  txID: "-",
  assetID: "-",
};

/* eslint-disable default-case, no-param-reassign */
const smartAssetPageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case CREATE_ASSET:
          
        break;
        
      case CREATE_ASSET_SUCCESS:
        draft.formSubmitted = true;
        draft.txID = action.txID;
        draft.assetID = action.assetID;
        draft.formSubmitted = false;
          
        break;
        
      case CREATE_ASSET_ERROR:
        draft.formSubmitted = false;
          
        break;

      case CHANGE_NOTE:
        draft.inputNote = action.note;

        break;

      case CHANGE_ADDRESS:
        draft.inputAddress = action.address;

        break;

      case CHANGE_DEFAULT_FROZEN:
        draft.inputDefaultFrozen = action.defaultFrozen;

        break;

      case CHANGE_TOTAL_ISSUANCE:
        draft.inputTotalIssuance = action.totalIssuance;

        break;

      case CHANGE_UNIT_NAME:
        draft.inputUnitName = action.unitName;

        break;

      case CHANGE_ASSET_NAME:
        draft.inputAssetName = action.assetName;

        break;

      case CHANGE_ASSET_URL:
        draft.inputAssetURL = action.assetURL;

        break;

      case CHANGE_ASSET_METADATA_HASH:
        draft.inputAssetMetadataHash = action.assetMetadataHash;

        break;

      case CHANGE_MANAGER:
        try{
          draft.inputManager = action.manager["value"];
        }catch(err){
          draft.inputManager = "";
        }
        
        break;

      case CHANGE_RESERVE:
        try{
          draft.inputReserve = action.reserve["value"];
        }catch(err){
          draft.inputReserve = "";
        }

        break;

      case CHANGE_FREEZE:
        try{
          draft.inputFreeze = action.freeze["value"];
        }catch(err){
          draft.inputFreeze = "";
        }

        break;

      case CHANGE_CLAWBACK:
        try{
          draft.inputClawback = action.clawback["value"];
        }catch(err){
          draft.inputClawback = "";
        }

        break;
    }
  });

export default smartAssetPageReducer;
