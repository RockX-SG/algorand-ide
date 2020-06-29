/*
 *
 * SmartContractPage actions
 *
 */

 import {
   UPDATE_CODE_VALUE,
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

 export function changeContract(contract) {
   console.log("contract", contract)
   return {
     type: CHANGE_CONTRACT,
     contract
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

 
 
