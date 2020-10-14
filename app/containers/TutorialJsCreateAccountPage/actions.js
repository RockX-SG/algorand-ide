/*
 *
 * TutorialJsCreateAccountPage actions
 *
 */

import { 
  CHANGE_FAUCET_DESTINATION_ADDRESS
} from './constants';

export function changeFaucetDestinationAddress(address) {
  console.log("address", address);
  return {
    type: CHANGE_FAUCET_DESTINATION_ADDRESS,
    address
  };
}
