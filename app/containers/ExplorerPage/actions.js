/*
 *
 * ExplorerPage actions
 *
 */
 
import {
  UPDATE_CODE_VALUE,
  ADD_NEW_FILE,
  TOGGLE_FOLDER,
  CHANGE_CONTRACT,
  CODE_DEPLOY,
  CODE_COMPILE,
  CODE_COMPILE_SUCCESS,
  CODE_COMPILE_ERROR
} from './constants';

export function updateCodeValue(codeValue) {
  return {
    type: UPDATE_CODE_VALUE,
    codeValue
  };
}

export function addNewFile() {
  return {
    type: ADD_NEW_FILE,
  };
}


export function changeContract(response) {
  console.log(response)
  return {
    type: CHANGE_CONTRACT,
    contract: response[0],
    folderIndex: response[1],
    fileIndex: response[2]
  };
}

export function toggleFolder(response) {
  return {
    type: TOGGLE_FOLDER,
    folderType: response[0],
    index: response[1]
  };
}


export function codeCompile() {
  return {
    type: CODE_COMPILE,
  };
}

export function codeCompileSuccess(response) {
 return {
   type: CODE_COMPILE_SUCCESS,
   fileName: response["file_name"],
   address: response["address"]
 };
}

export function codeCompileError(error) {
return {
  type: CODE_COMPILE_ERROR,
  error: error["response_status"],
};
}

export function codeDeploy() {
return {
  type: CODE_DEPLOY,
};
}



