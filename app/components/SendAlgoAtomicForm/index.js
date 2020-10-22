/**
 *
 * SendAlgoAtomicForm
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

import { Field, reduxForm } from 'redux-form';

import CreatableSelect from 'react-select/creatable';

import Captcha from '../../components/Captcha';

const recaptchaRef = React.createRef();

import Input from './Input';

import RoutePath from '../../components/RoutePath';
import RouteSign from '../../components/RouteSign';

let iconInfo = <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/wD/AP+gvaeTAAAA50lEQVRIid2UTQ6CMBSEv2jgehJQuZKIxyCu9R66lqi49AK4Fhe0hpCWPn5WTDJJ8zKdafvawtzhAzFwBHLgo5ir2lZpBiECCqBy8AmEfYyXwEFg3GYKLCQBQ8w1E5d5NMJcM7CZ+9Tn2TVZo0vzwtL4WLA6SUAFbLSw2RTr1gzGLqxMxbtgZVLmpoBSMLG9ExtLLRTd2wH4mgLeEwb8vZoB1wkDLqaA04QBZ1PRAx6Mb3JBxw8bOiZLaHwDTaQjzHcuc6j7sh9gntDz2ge4e1IpjfNYbPCoP64MuFG/0FKNM2CtNDPGD2oP1wWSIKFFAAAAAElFTkSuQmCC"/>

let iconAdd = <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABmJLR0QA/wD/AP+gvaeTAAAB8ElEQVRYhe2XzS5DURDHf6RsNMq2lJWUWPhoPYF0WzyTj60QS+IRSKwoEg/BQixoG1YkiHZVtZg5uTfNdTv3anXTf3IyN+f85yNzJjPnQh89xkBEfhZYBwrABJDR/QpQBUrAKXDfqQAd8sAV0DSuSyDXCcdDwAHwrYZfgUOgiGRjRFcWWAOOlNNUnX0gEdf5OHCtxr6ATWDUoDcKbAE1vGyMRXU+hJfyKnIFUbEAPKqNG2A4ivKBKpaBdAznDmmkQJvAnlUpj9zfF7D0B+cOy8h1NPS7LVzqNw1cV/XtsK28UjtiFq/aLQVnDSAFvCl3xn8w2ELcUHkCfBgMW/GONCiQRvZrAKsqzzro3MHZLIQFMK3ytgsB3KmcCiN9IveUDDiztuHf6iKp+5/+zdYMWAoqLpyv77AAXlQGNZ+BgGU5c3A2n8MCKKucCzDwVzibZf9mawCuURS7EMCayosw0r83oiBcKnGrgwHsKO/cwCWHVGoN4/BogzxQR4bRolVpH4m4grz94mICbxzvRlFM4F1FFViJ4XwReMKbgpGfZmO+IGrISE0Z9FLInddV94IYTzKHBPKSaaixN+AYmWizSHtN6veGnrlqbyBpj/0o9WMemWbWOVDCWMBRf0xm8H5MMsCk7ld0uR+Th4h2++gdfgA+Fpm3vsNCRAAAAABJRU5ErkJggg=="/>

function SendAlgoAtomicForm(props) {
  const { 
    handleSubmit, 
    pristine, 
    reset, 
    submitting, 
    walletPage,
    addressArray,
    transactionPage,
    address,
    balance,
    addressOption,
    onRecaptchaChange,
    captchaData,
    onChangeAssetId,
    onChangeAtomicAmount,
    onChangeAtomicSenderAddress,
    onChangeAtomicReceiverAddress,
    onChangeAtomicAssetType,
    onChangeAtomicAssetId,
    onConfirmAtomicRoute,
    onSignRoute,
    onSendAtomicTransfer,
    onAddRoute
  } = props;
  
  
  return (
    <div>
      <div className="sectionStep">
        Step 1
      </div>
      <div className={(transactionPage.atomicStep == 1) ? "sectionStepContent" : "sectionStepContent disabled"}>
        <div className="sectionGroup">
          <div className="section">
            <div className="sectionTitle">
              <div className="sectionTitleSend">
                Create Transaction Routes:
              </div>
              <div className="info sectionTitleSendInfo" data-tip="Sending Address is limited to available wallets during to transaction signing limitation" data-for="transaction">
                {iconInfo}
              </div>
              <div className={(transactionPage.routeSenders.length == 10) ? "hide" : ""}>
                <div className="addRoute" data-tip="Add more route" data-for="transaction" onClick={() => onAddRoute()}>
                  {iconAdd}
                </div>
              </div>
              <div className="clear"></div>
            </div>
            <div className="route">
              <RoutePath routeSenders={transactionPage.routeSenders} addressOption={addressOption} walletPage={walletPage} onChangeAtomicAmount={onChangeAtomicAmount} onChangeAtomicSenderAddress={onChangeAtomicSenderAddress} onChangeAtomicReceiverAddress={onChangeAtomicReceiverAddress} 
              onChangeAtomicAssetType={onChangeAtomicAssetType} 
              onChangeAtomicAssetId={onChangeAtomicAssetId}  />
            </div>
            <div>
              <button onClick={() => onConfirmAtomicRoute()}>
                Confirm Atomic Transfer
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="sectionStep">
        Step 2
      </div>
      <div className={(transactionPage.atomicStep == 2) ? "sectionStepContent" : "sectionStepContent disabled"}>
        <div className="sectionGroup">
          <div className="section hide">
            <div className="sectionTitle">
              Transaction Routes Group Id:
            </div>
            <div className="routeId">
              -
            </div>
          </div>
          <div className="section">
            <div className="sectionTitle">
              Sign Transactions:
            </div>
            <RouteSign walletPage={walletPage} addressArray={addressArray} transactionPage={transactionPage} onSignRoute={onSignRoute} />
          </div>
        </div>
      </div>
      <div className="section">
        <div className="hide">
          <Captcha recaptchaRef={recaptchaRef} onRecaptchaChange={onRecaptchaChange} />
        </div>
        <button onClick={() => onSendAtomicTransfer()}>
          Send
        </button>
      </div>
    </div>
  );
};
// <div>
//   <Field name='captcharesponse' recaptchaRef={recaptchaRef} component={Captcha}/>
// </div>

// export default reduxForm({
//   form: 'sendAlgoAtomic', // a unique identifier for this form
// })(SendAlgoAtomicForm);

SendAlgoAtomicForm.propTypes = {
};

export default SendAlgoAtomicForm;


