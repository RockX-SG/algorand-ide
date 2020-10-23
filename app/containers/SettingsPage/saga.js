import { take, call, put, select, takeLatest, takeEvery } from 'redux-saga/effects';

import {
  CHANGE_SERVER_ADDRESS,
  CHANGE_SERVER_PORT,
  CHANGE_ALGOD_TOKEN,
} from 'containers/SettingsPage/constants';

// Individual exports for testing
export default function* settingsPageSaga() {
  // See example in containers/HomePage/saga.js
  // yield takeLatest(CHANGE_SERVER_ADDRESS, restoreServerAddress);
  // yield takeLatest(CHANGE_SERVER_PORT, restoreServerPort);
  // yield takeLatest(CHANGE_ALGOD_TOKEN, restoreAlgodToken);
  
}

// export function* restoreServerAddress(data) {
//   console.log("data", data)
//   localStorage.setItem('serverAddress', data["serverAddress"]);
// }
// 
// export function* restoreServerPort(data) {
//   console.log("data", data)
//   localStorage.setItem('serverPort', data["serverPort"]);
// }
// 
// export function* restoreAlgodToken(data) {
//   console.log("data", data)
//   localStorage.setItem('algodToken', data["algodToken"]);
// }