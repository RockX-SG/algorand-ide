/*
 *
 * SmartContractPage actions
 *
 */

 import {
   UPDATE_CODE_VALUE,
   CHANGE_CONTRACT,
   CODE_DEPLOY
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

 export function codeDeploy() {
   return {
     type: CODE_DEPLOY,
   };
 }
