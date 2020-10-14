/*
 *
 * TutorialPage actions
 *
 */

import { 
  JS_EXECUTE_CODE_TUTORIAL,
  JS_EXECUTE_CODE_TUTORIAL_SUCCESS,
  JS_EXECUTE_CODE_TUTORIAL_ERROR,
  CHANGE_FAUCET_DESTINATION_ADDRESS,
  FAUCET_SEND,
} from './constants';

///////////////////


export function jsCodeExecuteTutorial(data) {
 console.log("jsCodeExecuteTutorial", data);
  return {
    type: JS_EXECUTE_CODE_TUTORIAL,
    code: data[2],
    tutorial: data[0],
    step: data[1],
    parameters: data[3],
  };
}

export function jsCodeExecuteTutorialSuccess(tutorial, step, response) {
 console.log("tutorial", tutorial);
 console.log("step", step);
 console.log("response", response);
 return {
   type: JS_EXECUTE_CODE_TUTORIAL_SUCCESS,
   tutorial,
   step,
   response
 };
}

export function jsCodeExecuteTutorialError(error) {
  return {
    type: JS_EXECUTE_CODE_TUTORIAL_ERROR,
    error: error["response_status"],
  };
}

///////////////////

export function changeFaucetDestinationAddress(address) {
  console.log("address", address);
  return {
    type: CHANGE_FAUCET_DESTINATION_ADDRESS,
    address
  };
}


export function faucetSend(data) {
  return {
    type: FAUCET_SEND,
    tutorial: data[0],
    step: data[1],
  };
}
