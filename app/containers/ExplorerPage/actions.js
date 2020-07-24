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
