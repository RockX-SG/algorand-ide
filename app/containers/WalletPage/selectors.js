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
  makeSelectBalanceSecondary
};
