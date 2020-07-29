/*
 *
 * SettingsPage reducer
 *
 */
import produce from 'immer';

import {
  DEFAULT_ACTION,
  CHANGE_SERVER_ADDRESS,
  CHANGE_SERVER_PORT,
  CHANGE_ALGOD_TOKEN,
} from './constants';

export const initialState = {
  serverAddress: 'http://127.0.0.1',
  serverPort: '5555',
  algodToken: '',
  enablePureStake: false,
};

/* eslint-disable default-case, no-param-reassign */
const settingsPageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case DEFAULT_ACTION:
        break;

      case CHANGE_SERVER_ADDRESS:
        draft.serverAddress = action.serverAddress;
        break;

      case CHANGE_SERVER_PORT:
        draft.serverPort = action.serverPort;
        break;

      case CHANGE_ALGOD_TOKEN:
        draft.algodToken = action.algodToken;
        break;
    }
  });

export default settingsPageReducer;
