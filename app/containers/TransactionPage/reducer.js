/*
 *
 * TransactionPage reducer
 *
 */
import produce from 'immer';
import { 
  ADD_ROUTE
} from './constants';

export const initialState = {
  atomicStep: 1,
  routeSenders: [
    {},
    {}
  ],
  routeReceivers: [
    {},
    {}
  ],
  routeAmount: [
    {},
    {}
  ],
};

/* eslint-disable default-case, no-param-reassign */
const transactionPageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case ADD_ROUTE:
        if(draft.routeSenders.length < 10){
          draft.routeSenders.push({})
        }
      
        break;
    }
  });

export default transactionPageReducer;
