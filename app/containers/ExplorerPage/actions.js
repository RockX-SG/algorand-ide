/*
 *
 * ExplorerPage actions
 *
 */
 
import {
  JS_UPDATE_CODE_VALUE,
  JS_ADD_NEW_FILE,
  JS_TOGGLE_FOLDER,
  JS_CHANGE_FILE,
  JS_DELETE_FILE,
  
  JS_EXECUTE_CODE,
  JS_EXECUTE_CODE_SUCCESS,
  JS_EXECUTE_CODE_ERROR,
  
  TEAL_UPDATE_CODE_VALUE,
  TEAL_ADD_NEW_FILE,
  TEAL_TOGGLE_FOLDER,
  TEAL_CHANGE_FILE,
  TEAL_DELETE_FILE,
  
  CHANGE_NEW_FILE_NAME,
  
  TEAL_ADD_TO_BASH,
  TEAL_GET_CONTRACT_BALANCE,
  
  TEAL_CODE_DEPLOY,
  TEAL_CODE_DEPLOY_SUCCESS,
  TEAL_CODE_DEPLOY_ERROR,
  
  CODE_COMPILE,
  CODE_COMPILE_SUCCESS,
  CODE_COMPILE_ERROR,
} from './constants';

import { toast } from "react-toastify";

export function updateCodeValue(response) {
  if(response[0] == "js"){
    return {
      type: JS_UPDATE_CODE_VALUE,
      fileIndex: response[1],
      codeValue: response[2]
    };
  }else if(response[0] == "teal"){
    return {
      type: TEAL_UPDATE_CODE_VALUE,
      fileIndex: response[1],
      codeValue: response[2]
    };
  }
}

export function addNewFile(response) {
  if(response[0] == "js"){
    return {
      type: JS_ADD_NEW_FILE
    };
  }else if(response[0] == "teal"){
    return {
      type: TEAL_ADD_NEW_FILE,
    };
  }
}

export function changeFile(response) {
  console.log("changeFile", response)
  
  if(response[0] == "js"){
    return {
      type: JS_CHANGE_FILE,
      contract: response[1],
      folderIndex: response[2],
      fileIndex: response[3]
    };
  }else if(response[0] == "teal"){
    return {
      type: TEAL_CHANGE_FILE,
      contract: response[1], //response[1],
      folderIndex: response[2],
      fileIndex: response[3]
    };
  }
}

export function toggleFolder(response) {
  console.log(response)
  
  if(response[0] == "js"){
    return {
      type: JS_TOGGLE_FOLDER,
      folderType: response[1],
      index: response[2]
    };
  }else if(response[0] == "teal"){
    return {
      type: TEAL_TOGGLE_FOLDER,
      folderType: response[1],
      index: response[2]
    };
  }
}


export function changeNewFileName(filename) {
  console.log("filename", filename)
  
  return {
    type: CHANGE_NEW_FILE_NAME,
    filename: filename
  };
}



export function deleteFile(response) {
  // folder index always 999 since only user file can be deleted
  if(response[0] == "js"){
    return {
      type: JS_DELETE_FILE,
      fileIndex: response[1]
    };
  }else if(response[0] == "teal"){
    return {
      type: TEAL_DELETE_FILE,
      fileIndex: response[1]
    };
  }
}


///////////////////


export function jsCodeExecute() {
  console.log("jsCodeExecute");
  return {
    type: JS_EXECUTE_CODE,
  };
}

export function jsCodeExecuteSuccess(response) {
 console.log("response", response);
 return {
   type: JS_EXECUTE_CODE_SUCCESS,
   response: response
 };
}

export function jsCodeExecuteError(error) {
  return {
    type: JS_EXECUTE_CODE_ERROR,
    error: error["response_status"],
  };
}

///////////////////



export function tealAddToBash(response) {
  console.log("tealAddToBash");
  return {
    type: TEAL_ADD_TO_BASH,
    response
  };
}


export function tealGetContractBalance(balance) {
  return {
    type: TEAL_GET_CONTRACT_BALANCE,
    balance
  };
}



export function codeCompile() {
  console.log("codeCompile");
  return {
    type: CODE_COMPILE,
  };
}

export function codeCompileSuccess(response) {
 return {
   type: CODE_COMPILE_SUCCESS,
   fileName: response["file_name"],
   address: response["address"],
   contractBase64: response["contractBase64"],
 };
}

export function codeCompileError(error) {
  return {
    type: CODE_COMPILE_ERROR,
    error: error["response_status"],
  };
}

export function tealCodeDeploy() {
  console.log("tealCodeDeploy");
  return {
    type: TEAL_CODE_DEPLOY,
  };
}

export function tealCodeDeploySuccess(txHash) {
 return {
   type: TEAL_CODE_DEPLOY_SUCCESS,
   txHash
 };
}

export function tealCodeDeployError(error) {
  toast.error('Your TEAL code has errors. Please edit it and try to deploy again.', {
    position: "bottom-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  });
  
  return {
    type: TEAL_CODE_DEPLOY_ERROR,
    // error: error["response_status"],
  };
}
