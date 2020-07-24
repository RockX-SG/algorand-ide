/*
 *
 * ExplorerPage reducer
 *
 */
import produce from 'immer';
import { 
  UPDATE_CODE_VALUE,
  ADD_NEW_FILE,
  TOGGLE_FOLDER,
  CHANGE_CONTRACT,
  CODE_DEPLOY,
  CODE_COMPILE_SUCCESS,
  CODE_COMPILE_ERROR
} from './constants';


import templateContract1 from './templateContract1.js';
import templateContract2 from './templateContract2.js';
import templateContract3 from './templateContract3.js';
import templateContract4 from './templateContract4.js';

export const initialState = {
  codeValue: "",
  codeCompileStatus: "",
  codeCompileFileName: "-",
  codeCompileAddress: "-",
  explorerFilePreset: [
    {
      "id": 1,
      "name": "folder 1",
      "status": true,
      "files": ["file 1", "file 2"]
    },
    {
      "id": 2,
      "name": "folder 2",
      "status": true,
      "files": ["file 1", "file 2", "file 3"]
    },
    {
      "id": 3,
      "name": "folder 3",
      "status": true,
      "files": ["file 1", "file 2", "file 3", "file 4"]
    },
    {
      "id": 4,
      "name": "folder 4",
      "status": true,
      "files": ["file 1"]
    },
  ],
  explorerFileStatus: [
    true,
    false,
    true,
    false,
  ],
  userFiles: ["default.teal"],
  userFolderStatus: true,
  selectedFolderId: -1, //-1 for null
  selectedFileIndex: 0, //0 for null
  bashResponse: [
    "this is an example code response this is an example code response this is an example code response this is an example code response this is an example code response",
    "this is an example code response",
    "123",
  ],
};

/* eslint-disable default-case, no-param-reassign */
const explorerPageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case UPDATE_CODE_VALUE:
        draft.codeValue = action.codeValue;
        
        break;
        
      case ADD_NEW_FILE:
        // draft.codeValue = action.codeValue;
        // add to userFiles
        draft.userFiles.push("untitled.teal");
        
        break;
        
      case TOGGLE_FOLDER:
        // draft.codeValue = action.codeValue;
        // change array state
        if(action.folderType == "user"){
          draft.userFolderStatus = !draft.userFolderStatus;
        }else if(action.folderType == "tutorial"){
          console.log("action.index", action.index)
          console.log("draft.explorerFileStatus[action.index]", draft.explorerFileStatus[action.index])
          draft.explorerFileStatus[action.index] = !draft.explorerFileStatus[action.index];
          // draft.explorerFilePreset = !draft.userFolderStatus;
        }
        
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
        
        draft.selectedFolderId = action.folderIndex;
        draft.selectedFileIndex = action.fileIndex;
        
        break;
        
      case CODE_COMPILE_SUCCESS:
        draft.codeCompileFileName = action.fileName;
        draft.codeCompileAddress = action.address;
        draft.codeCompileStatus = "true";
        draft.bashResponse.unshift(action.address);

        break;
        
      case CODE_COMPILE_ERROR:
        draft.codeCompileFileName = "";
        draft.codeCompileAddress = "";
        draft.codeCompileStatus = "false";

        break;
        
    }
  });

export default explorerPageReducer;
