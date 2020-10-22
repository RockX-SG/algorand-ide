import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the walletPage state domain
 */

const selectWalletPageDomain = state => state.walletPage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by WalletPage
 */

const makeSelectWalletPage = () =>
  createSelector(
    selectWalletPageDomain,
    substate => substate,
  );

const makeSelectMnemonicPrimary = () =>
  createSelector(
    selectWalletPageDomain,
    substate => substate.mnemonicPrimary,
  );

const makeSelectAddressPrimary = () =>
  createSelector(
    selectWalletPageDomain,
    substate => substate.addressPrimary,
  );

const makeSelectAddressShortenPrimary = () =>
  createSelector(
    selectWalletPageDomain,
    substate => substate.addressShortenPrimary,
  );

const makeSelectBalancePrimary = () =>
  createSelector(
    selectWalletPageDomain,
    substate => substate.balancePrimary,
  );

const makeSelectMnemonicSecondary = () =>
  createSelector(
    selectWalletPageDomain,
    substate => substate.mnemonicSecondary,
  );

const makeSelectAddressSecondary = () =>
  createSelector(
    selectWalletPageDomain,
    substate => substate.addressSecondary,
  );

const makeSelectAddressShortenSecondary = () =>
  createSelector(
    selectWalletPageDomain,
    substate => substate.addressShortenSecondary,
  );

const makeSelectBalanceSecondary = () =>
  createSelector(
    selectWalletPageDomain,
    substate => substate.balanceSecondary,
  );

const makeSelectMnemonicTertiary = () =>
  createSelector(
    selectWalletPageDomain,
    substate => substate.mnemonicTertiary,
  );

const makeSelectAddressTertiary = () =>
  createSelector(
    selectWalletPageDomain,
    substate => substate.addressTertiary,
  );

const makeSelectAddressShortenTertiary = () =>
  createSelector(
    selectWalletPageDomain,
    substate => substate.addressShortenTertiary,
  );

const makeSelectBalanceTertiary = () =>
  createSelector(
    selectWalletPageDomain,
    substate => substate.balanceTertiary,
  );

const makeSelectMnemonicQuarternary = () =>
  createSelector(
    selectWalletPageDomain,
    substate => substate.mnemonicQuarternary,
  );

const makeSelectAddressQuarternary = () =>
  createSelector(
    selectWalletPageDomain,
    substate => substate.addressQuarternary,
  );

const makeSelectAddressShortenQuarternary = () =>
  createSelector(
    selectWalletPageDomain,
    substate => substate.addressShortenQuarternary,
  );

const makeSelectBalanceQuarternary = () =>
  createSelector(
    selectWalletPageDomain,
    substate => substate.balanceQuarternary,
  );

const makeSelectMnemonicQuinary = () =>
  createSelector(
    selectWalletPageDomain,
    substate => substate.mnemonicQuinary,
  );

const makeSelectAddressQuinary = () =>
  createSelector(
    selectWalletPageDomain,
    substate => substate.addressQuinary,
  );

const makeSelectAddressShortenQuinary = () =>
  createSelector(
    selectWalletPageDomain,
    substate => substate.addressShortenQuinary,
  );

const makeSelectBalanceQuinary = () =>
  createSelector(
    selectWalletPageDomain,
    substate => substate.balanceQuinary,
  );

const makeSelectWalletAddressList = () =>
  createSelector(
    selectWalletPageDomain,
    substate => substate.addressList,
  );

const makeSelectWalletExplorer = () =>
  createSelector(
    selectWalletPageDomain,
    substate => substate.explorer,
  );
  
  

// const makeSelectWalletArray = () =>
//   createSelector(
//     selectWalletPageDomain,
//     substate => substate.balanceSecondary,
//   );
// 
// const makeSelectWalletFullArray = () =>
//   createSelector(
//     selectWalletPageDomain,
//     substate => substate.balanceSecondary,
//   );

export {
  selectWalletPageDomain,
  makeSelectWalletPage,
  makeSelectMnemonicPrimary,
  makeSelectAddressPrimary,
  makeSelectAddressShortenPrimary,
  makeSelectBalancePrimary,
  makeSelectMnemonicSecondary,
  makeSelectAddressSecondary,
  makeSelectAddressShortenSecondary,
  makeSelectBalanceSecondary,
  makeSelectMnemonicTertiary,
  makeSelectAddressTertiary,
  makeSelectAddressShortenTertiary,
  makeSelectBalanceTertiary,
  makeSelectMnemonicQuarternary,
  makeSelectAddressQuarternary,
  makeSelectAddressShortenQuarternary,
  makeSelectBalanceQuarternary,
  makeSelectMnemonicQuinary,
  makeSelectAddressQuinary,
  makeSelectAddressShortenQuinary,
  makeSelectBalanceQuinary,
  makeSelectWalletAddressList,
  makeSelectWalletExplorer
};
