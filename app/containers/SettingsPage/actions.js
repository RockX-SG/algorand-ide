/*
 *
 * SettingsPage actions
 *
 */

import {
  DEFAULT_ACTION,
  CHANGE_SERVER_ADDRESS,
  CHANGE_SERVER_PORT,
  CHANGE_ALGOD_TOKEN,
} from './constants';

export function changeServerAddress(serverAddress) {
  return {
    type: CHANGE_SERVER_ADDRESS,
    serverAddress,
  };
}
export function changeServerPort(serverPort) {
  return {
    type: CHANGE_SERVER_PORT,
    serverPort,
  };
}
export function changeAlgodToken(algodToken) {
  return {
    type: CHANGE_ALGOD_TOKEN,
    algodToken,
  };
}

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}
