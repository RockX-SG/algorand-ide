/*
 *
 * SmartAssetPage actions
 *
 */

import {
  CREATE_ASSET,
  CREATE_ASSET_SUCCESS,
  CREATE_ASSET_ERROR,
  CHANGE_NOTE,
  CHANGE_ADDRESS,
  CHANGE_DEFAULT_FROZEN,
  CHANGE_TOTAL_ISSUANCE,
  CHANGE_UNIT_NAME,
  CHANGE_ASSET_NAME,
  CHANGE_ASSET_URL,
  CHANGE_ASSET_METADATA_HASH,
  CHANGE_MANAGER,
  CHANGE_RESERVE,
  CHANGE_FREEZE,
  CHANGE_CLAWBACK
} from './constants';

export function createAsset() {
  return {
    type: CREATE_ASSET,
  };
}

export function createAssetSuccess() {
  return {
    type: CREATE_ASSET_SUCCESS,
  };
}

export function createAssetError() {
  return {
    type: CREATE_ASSET_ERROR,
  };
}

export function changeNote(note) {
  return {
    type: CHANGE_NOTE,
    note
  };
}

export function changeAddress(address) {
  console.log("address", address)
  return {
    type: CHANGE_ADDRESS,
    address
  };
}

export function changeDefaultFrozen(defaultFrozen) {
  return {
    type: CHANGE_DEFAULT_FROZEN,
    defaultFrozen
  };
}

export function changeTotalIssuance(totalIssuance) {
  return {
    type: CHANGE_TOTAL_ISSUANCE,
    totalIssuance
  };
}

export function changeUnitName(unitName) {
  return {
    type: CHANGE_UNIT_NAME,
    unitName
  };
}

export function changeAssetName(assetName) {
  return {
    type: CHANGE_ASSET_NAME,
    assetName
  };
}

export function changeAssetURL(assetURL) {
  return {
    type: CHANGE_ASSET_URL,
    assetURL
  };
}

export function changeAssetMetadataHash(assetMetadataHash) {
  return {
    type: CHANGE_ASSET_METADATA_HASH,
    assetMetadataHash
  };
}

export function changeManager(manager) {
  console.log("manager", manager)
  return {
    type: CHANGE_MANAGER,
    manager
  };
}

export function changeReserve(reserve) {
  console.log("reserve", reserve)
  return {
    type: CHANGE_RESERVE,
    reserve
  };
}

export function changeFreeze(freeze) {
  console.log("freeze", freeze)
  return {
    type: CHANGE_FREEZE,
    freeze
  };
}

export function changeClawback(clawback) {
  console.log("clawback", clawback)
  return {
    type: CHANGE_CLAWBACK,
    clawback
  };
}
