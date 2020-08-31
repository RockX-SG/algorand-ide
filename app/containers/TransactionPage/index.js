/**
 *
 * TransactionPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import {
  makeSelectTransactionPage
} from './selectors';

import reducer from './reducer';
import saga from './saga';
import messages from './messages';

import {
  addRoute,
  confirmAssetId,
  changeAssetId,
  changeSendAmount,
  changeSendAsaAmount,
  sendAsaTransaction,
  optInAsa,
  changeAtomicAmount,
  changeAtomicSenderAddress,
  changeAtomicReceiverAddress,
  confirmAtomicRoute,
  signRoute,
  sendAtomicTransfer
} from './actions';

import {
  loading,
  sendTransaction,
  changeAddress,
  changeAmount,
  recaptchaChange
} from '../WalletPage/actions';

import Select from 'react-select';
import CreatableSelect from 'react-select/creatable';
import ReactTooltip from "react-tooltip";

import {
  makeSelectWalletPage,
} from '../WalletPage/selectors';

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import './react-tabs.css';

import Input from './Input';
import Transaction from './Transaction';

import SendAlgoForm from '../../components/SendAlgoForm';
import SendAlgoAsaForm from '../../components/SendAlgoAsaForm';
import SendAlgoAtomicForm from '../../components/SendAlgoAtomicForm';
import OptInAsaForm from '../../components/OptInAsaForm';
// import SendAlgoForm from './SendAlgoForm';

export function TransactionPage({
  onSendTransaction,
  onSendAsaTransaction,
  onChangeAddress,
  onChangeSendAmount,
  onChangeSendAsaAmount,
  onChangeAssetId,
  onConfirmAssetId,
  walletPage,
  transactionPage,
  onConfirmAtomicRoute,
  onAddRoute,
  onRecaptchaChange,
  onOptInAsa,
  onChangeAtomicAmount,
  onChangeAtomicSenderAddress,
  onChangeAtomicReceiverAddress,
  onSignRoute,
  onSendAtomicTransfer
}) {
  useInjectReducer({ key: 'transactionPage', reducer });
  useInjectSaga({ key: 'transactionPage', saga });
  
  
  
  let addressOption = [];
  
  addressOption = walletPage.addressArray.map(populateOptions);
  
  function populateOptions(addr) {
    // if(walletPage.address !== addr){
      return {value: addr, label: addr};
    // }else{
    //   return {};
    // }
  }
  
  console.log("addressOption", addressOption)

  return (
    <Transaction>
      <div className="pageName">
        Transaction Creator
      </div>
      <Tabs>
        <TabList>
          <Tab>Send ALGO</Tab>
          <Tab>Transfer ASA</Tab>
          <Tab>Atomic Transfer</Tab>
          <Tab>ASA Opt-In</Tab>
        </TabList>

        <TabPanel>
          <ReactTooltip id="transaction" place="right" type="dark" effect="float"/>
            
          <SendAlgoForm onSubmit={onSendTransaction} transactionPage={transactionPage} walletPage={walletPage} address={walletPage.address} balance={walletPage.balance} addressOption={addressOption} onChangeAddress={onChangeAddress} onChangeSendAmount={onChangeSendAmount} captchaData={walletPage.captchaData} onRecaptchaChange={onRecaptchaChange} />
          
          <div className="assetResponse">
            <div className={(walletPage.userSendTxHash == "-") ? "disabled" : ""}>
              <div className="assetResponseSection">
                <div className="assetResponseTitle">
                  Transaction ID:
                </div>
                <div className="assetResponseOutput">
                  <a href={"https://testnet.algoexplorer.io/tx/"+walletPage.userSendTxHash} target="_blank">
                    {walletPage.userSendTxHash}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </TabPanel>
        <TabPanel>
          <ReactTooltip id="transaction" place="right" type="dark" effect="float"/>
            
          <SendAlgoAsaForm onSubmit={onSendAsaTransaction} transactionPage={transactionPage} walletPage={walletPage} address={walletPage.address} addressOption={addressOption} onChangeAddress={onChangeAddress} onChangeSendAsaAmount={onChangeSendAsaAmount} onChangeAssetId={onChangeAssetId} onConfirmAssetId={onConfirmAssetId} captchaData={walletPage.captchaData} onRecaptchaChange={onRecaptchaChange} />
          
          <div className="assetResponse">
            <div className={(transactionPage.sendAsaTxHash == "-") ? "disabled" : ""}>
              <div className="assetResponseSection">
                <div className="assetResponseTitle">
                  Transaction ID:
                </div>
                <div className="assetResponseOutput">
                  <a href={"https://testnet.algoexplorer.io/tx/"+transactionPage.sendAsaTxHash} target="_blank">
                    {transactionPage.sendAsaTxHash}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </TabPanel>
        <TabPanel>
          <ReactTooltip id="transaction" place="right" type="dark" effect="float"/>
            
          <SendAlgoAtomicForm onSubmit={onSendTransaction} transactionPage={transactionPage} walletPage={walletPage} addressArray={walletPage.addressArray} address={walletPage.address} balance={walletPage.balance} addressOption={addressOption} onChangeAtomicAmount={onChangeAtomicAmount} onChangeAtomicSenderAddress={onChangeAtomicSenderAddress} onChangeAtomicReceiverAddress={onChangeAtomicReceiverAddress} captchaData={walletPage.captchaData} onRecaptchaChange={onRecaptchaChange} onConfirmAtomicRoute={onConfirmAtomicRoute} onSignRoute={onSignRoute} onSendAtomicTransfer={onSendAtomicTransfer} />
          
          <div className="assetResponse">
            <div className={(transactionPage.sendAtomicTxHash == "-") ? "disabled" : ""}>
              <div className="assetResponseSection">
                <div className="assetResponseTitle">
                  Transaction ID:
                </div>
                <div className="assetResponseOutput">
                  <a href={"https://testnet.algoexplorer.io/tx/"+transactionPage.sendAtomicTxHash} target="_blank">
                    {transactionPage.sendAtomicTxHash}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </TabPanel>
        <TabPanel>
          <ReactTooltip id="transaction" place="right" type="dark" effect="float"/>
            
          <OptInAsaForm onSubmit={onOptInAsa} transactionPage={transactionPage} walletPage={walletPage} address={walletPage.address} addressOption={addressOption} onChangeAddress={onChangeAddress} onChangeSendAsaAmount={onChangeSendAsaAmount} onChangeAssetId={onChangeAssetId} onConfirmAssetId={onConfirmAssetId} captchaData={walletPage.captchaData} onRecaptchaChange={onRecaptchaChange} />
          
          <div className="assetResponse">
            <div className={(transactionPage.optInTxHash == "-") ? "disabled" : ""}>
              <div className="assetResponseSection">
                <div className="assetResponseTitle">
                  Transaction ID:
                </div>
                <div className="assetResponseOutput">
                  <a href={"https://testnet.algoexplorer.io/tx/"+transactionPage.optInTxHash} target="_blank">
                    {transactionPage.optInTxHash}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </TabPanel>
      </Tabs>
    </Transaction>
  );
}

TransactionPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  transactionPage: makeSelectTransactionPage(),
  walletPage: makeSelectWalletPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    onChangeAddress: evt => dispatch(changeAddress(evt.value)),
    onChangeSendAmount: evt => dispatch(changeSendAmount(evt.target.value)),
    onChangeSendAsaAmount: evt => dispatch(changeSendAsaAmount(evt.target.value)),
    
    onChangeAtomicAmount: evt => dispatch(changeAtomicAmount(evt)),
    onChangeAtomicSenderAddress: evt => dispatch(changeAtomicSenderAddress(evt)),
    onChangeAtomicReceiverAddress: evt => dispatch(changeAtomicReceiverAddress(evt)),
    
    onSignRoute: evt => dispatch(signRoute(evt)),
    onSendAtomicTransfer: evt => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(loading());
      dispatch(sendAtomicTransfer(evt));
    },
    
    onChangeAssetId: evt => dispatch(changeAssetId(evt.target.value)),
    onConfirmAssetId: evt => dispatch(confirmAssetId()),
    onSendTransaction: evt => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(loading());
      dispatch(sendTransaction(evt));
    },
    onSendAsaTransaction: evt => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(loading());
      dispatch(sendAsaTransaction(evt));
    },
    onOptInAsa: evt => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(loading());
      dispatch(optInAsa(evt));
    },
    onConfirmAtomicRoute: evt => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(confirmAtomicRoute(evt));
    },
    onAddRoute: evt => dispatch(addRoute()),
    onRecaptchaChange: evt => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(recaptchaChange(evt));
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(TransactionPage);
