/*
 *
 * ExplorerPage reducer
 *
 */
import produce from 'immer';
import { 
  JS_UPDATE_CODE_VALUE,
  JS_ADD_NEW_FILE,
  JS_TOGGLE_FOLDER,
  JS_CHANGE_FILE,
  JS_DELETE_FILE,
  
  TEAL_UPDATE_CODE_VALUE,
  TEAL_ADD_NEW_FILE,
  TEAL_TOGGLE_FOLDER,
  TEAL_CHANGE_FILE,
  TEAL_DELETE_FILE,
  
  CHANGE_NEW_FILE_NAME,
  
  CODE_DEPLOY,
  CODE_COMPILE_SUCCESS,
  CODE_COMPILE_ERROR,
} from './constants';


import templateContract1 from './teal/templateContract1.js';
import templateContract2 from './teal/templateContract2.js';
import templateContract3 from './teal/templateContract3.js';
import templateContract4 from './teal/templateContract4.js';

import fileCreateAccount from './js/create-account.js';
import fileCreateAsset from './js/create-asset.js';
import fileChangeManagerAsset from './js/change-manager-asset.js';
import fileOptInAsset from './js/opt-in-asset.js';
import fileTransferAsset from './js/transfer-asset.js';
import fileLimitOrderContract from './js/limit-order-contract.js';
import fileHashTimeLockContract from './js/hash-time-lock-contract.js';

export const initialState = {
  newFileName: "",
  teal: {
    codeValue: "",
    codeCompileStatus: "",
    codeCompileFileName: "-",
    codeCompileAddress: "-",
    explorerFilePreset: [
      {
        "id": 1,
        "name": "folder 1",
        "status": true,
        "files": ["file1.teal", "file2.teal"]
      },
      {
        "id": 2,
        "name": "folder 2",
        "status": true,
        "files": ["file1.teal", "file2.teal", "file3.teal"]
      },
      {
        "id": 3,
        "name": "folder 3",
        "status": true,
        "files": ["file1.teal", "file2.teal", "file3.teal", "file4.teal"]
      },
      {
        "id": 4,
        "name": "folder 4",
        "status": true,
        "files": ["file1.teal"]
      },
    ],
    explorerFileStatus: [
      true,
      false,
      true,
      false,
    ],
    userFiles: ["default.teal"],
    userFilesContent: [""],
    userFolderStatus: true,
    selectedFolderId: 999, //-1 for null
    selectedFileIndex: 0, //0 for null
    bashResponse: [
      "this is an example code response this is an example code response this is an example code response this is an example code response this is an example code response",
      "this is an example code response",
      "123",
    ],
  },
  javascript: {
    codeValue: "",
    explorerFilePreset: [
      {
        "id": 1,
        "name": "Non-Contract Scripts",
        "status": true,
        "files": ["create-account.js", "create-asset.js", "transfer-asset.js", "change-manager-asset.js", "opt-in-asset.js"]
      },
      {
        "id": 2,
        "name": "Contract Scripts",
        "status": true,
        "files": ["limit-order-contract.js", "hash-time-lock-contract.js"]
      },
    ],
    explorerFileStatus: [
      true,
      true,
    ],
    userFiles: ["default.js"],
    userFilesContent: [""],
    userFolderStatus: true,
    selectedFolderId: 999, //-1 for null
    selectedFileIndex: 0, //0 for null
    bashResponse: [
      "this is an example code response this is an example code response this is an example code response this is an example code response this is an example code response",
      "this is an example code response",
      "123",
    ],
  }
};

/* eslint-disable default-case, no-param-reassign */
const explorerPageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case JS_UPDATE_CODE_VALUE:
        draft.javascript.codeValue = action.codeValue;
        draft.javascript.userFilesContent[action.fileIndex] = action.codeValue;
        
        break;
        
      case JS_DELETE_FILE:
        draft.javascript.userFiles.splice(action.fileIndex, 1);
        draft.javascript.userFilesContent.splice(action.fileIndex, 1);
        
        
        break;
        
        
        
      case JS_ADD_NEW_FILE:
        // draft.codeValue = action.codeValue;
        // add to userFiles
        
        
        draft.javascript.userFiles.push(draft.newFileName + ".js");
        draft.javascript.userFilesContent.push("");
        draft.newFileName = "";
        
        break;
        
      case JS_TOGGLE_FOLDER:
        // draft.codeValue = action.codeValue;
        // change array state
        if(action.folderType == "user"){
          draft.javascript.userFolderStatus = !draft.javascript.userFolderStatus;
        }else if(action.folderType == "tutorial"){
          console.log("action.index", action.index)
          console.log("draft.teal.explorerFileStatus[action.index]", draft.javascript.explorerFileStatus[action.index])
          draft.javascript.explorerFileStatus[action.index] = !draft.javascript.explorerFileStatus[action.index];
          // draft.explorerFilePreset = !draft.userFolderStatus;
        }
        
        break;

      case JS_CHANGE_FILE:
        console.log("action.contract", action.contract)
        console.log("action.fileIndex", action.fileIndex)
        console.log("draft.javascript.userFilesContent", draft.javascript.userFilesContent)
        
        if(action.contract == "create-account.js"){
          draft.javascript.codeValue = fileCreateAccount;
        }else if(action.contract == "create-asset.js"){
          draft.javascript.codeValue = fileCreateAsset;
        }else if(action.contract == "transfer-asset.js"){
          draft.javascript.codeValue = fileTransferAsset;
        }else if(action.contract == "opt-in-asset.js"){
          draft.javascript.codeValue = fileOptInAsset;
        }else if(action.contract == "change-manager-asset.js"){
          draft.javascript.codeValue = fileChangeManagerAsset;
        }else if(action.contract == "limit-order-contract.js"){
          draft.javascript.codeValue = fileLimitOrderContract;
        }else if(action.contract == "hash-time-lock-contract.js"){
          draft.javascript.codeValue = fileHashTimeLockContract;
        }else{
          draft.javascript.codeValue = draft.javascript.userFilesContent[action.fileIndex];
        }
        
        
        draft.javascript.selectedFolderId = action.folderIndex;
        draft.javascript.selectedFileIndex = action.fileIndex;
        
        break;
        
        
        
        
        
      case TEAL_UPDATE_CODE_VALUE:
        draft.teal.codeValue = action.codeValue;
        draft.teal.userFilesContent[action.fileIndex] = action.codeValue;
        
        break;
        
      case TEAL_DELETE_FILE:
        draft.teal.userFiles.splice(action.fileIndex, 1);
        draft.teal.userFilesContent.splice(action.fileIndex, 1);
        
        break;
        
        
        
      case TEAL_ADD_NEW_FILE:
        // draft.codeValue = action.codeValue;
        // add to userFiles
        draft.teal.userFiles.push(draft.newFileName + ".teal");
        draft.teal.userFilesContent.push("");
        draft.newFileName = "";
        
        break;
        
      case TEAL_TOGGLE_FOLDER:
        // draft.codeValue = action.codeValue;
        // change array state
        if(action.folderType == "user"){
          draft.teal.userFolderStatus = !draft.teal.userFolderStatus;
        }else if(action.folderType == "tutorial"){
          console.log("action.index", action.index)
          console.log("draft.teal.explorerFileStatus[action.index]", draft.teal.explorerFileStatus[action.index])
          draft.teal.explorerFileStatus[action.index] = !draft.teal.explorerFileStatus[action.index];
          // draft.explorerFilePreset = !draft.userFolderStatus;
        }
        
        break;

      case TEAL_CHANGE_FILE:
        console.log("action.contract", action.contract)
        console.log("action.fileIndex", action.fileIndex)
        console.log("draft.javascript.userFilesContent", draft.javascript.userFilesContent)
        
        if(action.contract == "file1.teal"){
          draft.teal.codeValue = templateContract1;
        }else if(action.contract == "file2.teal"){
          draft.teal.codeValue = templateContract2;
        }else if(action.contract == "file3.teal"){
          draft.teal.codeValue = templateContract3;
        }else if(action.contract == "file4.teal"){
          draft.teal.codeValue = templateContract4;
        }else{
          draft.teal.codeValue = draft.teal.userFilesContent[action.fileIndex];
        }
        
        draft.teal.selectedFolderId = action.folderIndex;
        draft.teal.selectedFileIndex = action.fileIndex;
        
        break;
        
        
        
        
      case CHANGE_NEW_FILE_NAME:
        draft.newFileName = action.filename;
        
        break;
        
        
      case CODE_COMPILE_SUCCESS:
        draft.teal.codeCompileFileName = action.fileName;
        draft.teal.codeCompileAddress = action.address;
        draft.teal.codeCompileStatus = "true";
        draft.teal.bashResponse.unshift(action.address);

        break;
        
      case CODE_COMPILE_ERROR:
        draft.teal.codeCompileFileName = "";
        draft.teal.codeCompileAddress = "";
        draft.teal.codeCompileStatus = "false";

        break;
        
    }
  });

export default explorerPageReducer;
