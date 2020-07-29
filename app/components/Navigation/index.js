/**
 *
 * Navigation
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

import Select from 'react-select'
import {CopyToClipboard} from 'react-copy-to-clipboard';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

import {
  Link,
} from 'react-router-dom';

import Nav from './Nav';
import NavLogo from './NavLogo';
import NavMenu from './NavMenu';
import NavNetwork from './NavNetwork';
import NavInfo from './NavInfo';
import NavArrow from './NavArrow';

import NavAddressDropdown from './NavAddressDropdown';


let iconUser = <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABmJLR0QA/wD/AP+gvaeTAAACi0lEQVRYhe2Xv08UQRTHP5rDBvA0xgRB7BATGxSs8Rc2EOV6/Qts+WG0MTk0ojFGgx3qn6DRSk80lsRalMRGj9iQIwTk0OI4i/kOu64zy+xZ0PBNJrM73/fevJ15780s7GCbsSujfDcwDAwAHUAn0PI/DuQC5fqASeBsoPw8sAh8AuZi/Y+sDjYBU8AGUAcqwDRwEbMazR6995KPt5tZJ98PvJPyGlAE9gbqPk5Mfifr5E3AjJQXMFuQBVcTDnwA9mQxMCXF70C7gx+Sgz+BVT0PxvjT0r8PlPX8MHTyPsyerwEnHPwE/+6vbUXJHCTa816gCtSAkyEO2KUvOrghcb+AEeCQ2qjG6vy9Eha3xJW2mrybKNpdAWeDcsTBjYmbcXB5YEl8V5oD1yQ07eFXxbc5uDZxKx7dp+JH44O7E0Ln1L/yGKmpd1VQa2vDo2ttDqQ5cET9Z4+Rj+ovO7gr6mc9unOJOZxYwSxTq4e/QBSEY5gUbQfGgd/iznt0W0nfoiAHAO7hT8O7KXpBDsxL6KiHL2AOGZ8Di5JxwWbYlzQHShK65OAGMUFYB54D/ZjDqBlT+V6Iq+GuBQXxr9McsLn8JDF+AFjGkUYJjEtmWTpxPMNfQzbhK0Q3iL58K7yU7PXYWHAhAngrwYnY2KzG+gMcOCPZeDreJmD5LXoxxaRKdHhUZCDk+mWjvaL3PmAdExs9IQ4APJKRMubu1yg6iI7jB1kUc0RbsQCcamDyHuAb0SkYev/cxL6YE1XMkZoP0Mtj9nxdum9kqyHkMDcZm/9LmHQaBo5hYqJFzwVxNtprmGXP/OUuHMecZr4KmGwlAm8/WX9Muoh+TDqBwxovq5UwFfFrRrs72D78Abag1G/Ij8c2AAAAAElFTkSuQmCC"/>

let iconSelected = <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABmJLR0QA/wD/AP+gvaeTAAAB8klEQVRYhe3WvW4TQRAH8B81iaCgAEzEl8F5FKQ4oSXwBEAoEHkGKho6gniAyCQIENAiUSEeAEEKKIAaCAUyxjLFjjljEd/eOV3yl7a43Zn/zM7tfLCPvY4DFeXncBELOBXf8Akf8RxP8HmX/PuLBtbQw6Bk9dHByd0yvoTtIO9iHZfQwsFYLSzHWTdkt7E4rfEb0o0G0q1OZ+icwYYiGit1jS8FwW/crKF/K3T7akSioQh7HeOjTgzwHceqKD5QhH1abAbXWq7CnBS6rrx/XoazwdWTIluKFcnj9ZoG70ihH0UnOK/lELwI4eWaxgf46d86cCX2n+WQbIVws6Lx24pa0R47a8XZuxyiHyE8M7Z/Di/9/z9OMi64BsFdimH6zY7tP1bc4vjI/mjYL+zAOauojqV4H8Lnx/YP4XWcbUmRKLv5EPMh9zbHgUmP8DDexPlX5TcfotIjvG5yGo46kWOcIg2v5jhwQioaXamx7OTEq0zjTRULEdyXPN6YIJM7zDwKrnu5xkmvfJgN41WtClaD4xuOVlVeVLTjOk6sKtrxQg19pL4wHEg2pcZShqYi7H3pUU+FttTPh/newWUpt2dizUup9hC/FGGvffNxHMFdeUNpT+r9WQNI1bG8IY1qbWlWGB3LP0hj+VN8qci7jz2MP3VzpM1vL0KzAAAAAElFTkSuQmCC"/>

function Navigation(props) {
  const {
    onToggleSelectedAccount,
    addressArray,
    addressShortenArray,
    mnemonicArray,
    balanceArray,
    address,
    addressShorten,
    balance,
    onChangeNetwork,
    dropdownStatus,
    onShowDropdown,
    onHideDropdown,
    onSelectAccount
  } = props;
  
  console.log("addressArray", addressArray)
  console.log("addressShortenArray", addressShortenArray)
  

  const options = [
    { value: 'testnet', label: 'Test Net' },
    { value: 'mainnet', label: 'Main Net' },
    { value: 'custom', label: 'Custom Network' },
  ]
  
  const addressDropdown = addressArray.map((addr, index) =>
    <div className="dropdownEntry" key={addr.toString()} onClick={() => onSelectAccount(addr)}>
      <div className="dropdownEntryIcon">
        <div className={(addr == address) ? "" : "hide"}>
          {iconSelected}
        </div>
      </div>
      <div className="dropdownEntryInfo">
        <div className="dropdownEntryAddress">
          {addressShortenArray[index]}
        </div>
        <div className="dropdownEntryBalance">
          <span>{balanceArray[index]}</span> ALGO
        </div>
      </div>
      <div className="clear"></div>
    </div>
  )

  return (
    <div>
      <Nav>
        <div className="navLeft">
          <Link to="/">
            <NavLogo>
              <div className="svgLogo">
                <svg className="flex-grow" viewBox="0 0 1172 300" xmlns="http://www.w3.org/2000/svg"><g ><path d="M291.84 59.14v179.63h-36.65V59.14zM441.26 117.71v121.44c0 37.7-29.32 60.85-65.25 60.85-34.66 0-60.47-21.51-63-51.87l36.53.22c1.51 12.9 12.83 18.47 27.77 18.47 14.14 0 27.29-7.55 27.29-27.29V224.1c-9.36 6.07-21.25 9.61-34.66 9.61-33.4 0-60.21-27.07-60.21-58.19 0-36.18 26.81-60.47 60.21-60.47 13.41 0 25.3 3.54 34.66 9.62v-6.58l36.66-.38zm-36.66 71.47v-29.59c-7.44-10.83-17.76-14.44-28.09-14.44-18 0-30.49 12-30.49 30.31 0 13.48 12.48 28.15 30.49 28.15 10.33 0 20.65-3.61 28.09-14.43zM587.3 176.76c0 37.4-27.66 64-64.8 64-37.39 0-65-26.63-65-64 0-37.14 27.66-64.29 65-64.29 37.14 0 64.8 27.15 64.8 64.29zm-35.37 0c0-17.62-11.58-31.85-29.43-31.85-18.1 0-29.68 14.23-29.68 31.85 0 18.09 11.58 31.6 29.68 31.6 17.85 0 29.43-13.51 29.43-31.6zM639.46 170.61v68.16h-36V118.09h36v16.09L683 116.06v36.32zM822.2 117.9v120.69l-36 .18v-6.83a63.52 63.52 0 0 1-34.67 9.87c-33.39 0-60.21-28.34-60.21-63.25 0-35.17 26.82-63.51 60.21-63.51a63.52 63.52 0 0 1 34.67 9.87v-6.83l36-.19zm-36 79v-37c-7.6-10.78-18.13-13.72-28.67-13.72-18.37 0-31.11 14.7-31.11 32.34 0 17.4 12.74 32.1 31.11 32.1 10.58.03 21.11-2.91 28.71-13.69l-.04-.03zM969.87 173.24v65.53h-35.32v-61.33c0-19.73-9.87-30.11-27.32-30.11-9.11 0-19.23 5.32-27.83 15.44v76h-36.12V118.09h36.12v9.11a54.18 54.18 0 0 1 34.91-12.15c32.13 0 55.56 22.77 55.56 58.19zM1147.81 62.67h-7v16.76h-4.12V62.67h-7v-3.81h18.09zM1171.87 79.43h-4.12V67.94l-5.35 8.47h-2.48l-5.42-8.57.06 11.62h-4.11v-20.6h2.9l7.81 12.46 7.81-12.46h2.9zM238.49 238.69h-37.37l-24.27-90.29-52.18 90.29H82.95L163.6 98.94l-12.98-48.53L41.87 238.73H.13L137.95 0h36.54l16 59.31h37.7l-25.74 44.76zM1115.67 59.14v179.63H1079v-6.83a63.49 63.49 0 0 1-34.66 9.87c-33.39 0-60.21-28.34-60.21-63.51 0-34.91 26.82-63.25 60.21-63.25a63.49 63.49 0 0 1 34.66 9.87V59.14h36.67zM1079 197.07v-37.28c-7.65-10.86-18.26-13.82-28.88-13.82-18.51 0-31.35 14.81-31.35 32.34 0 17.77 12.84 32.58 31.35 32.58 10.63 0 21.24-2.96 28.88-13.82z"></path></g></svg>
              </div>
              <div className="logoText">
              
              </div>
            </NavLogo>
          </Link>
          <NavMenu>
          
          </NavMenu>
        </div>
        <div className="navRight">
          <NavNetwork onMouseEnter={() => onHideDropdown()}>
            <div className="networkTitle">
              Network
            </div>
            <div className="selectComponent">
              <Select
                defaultValue={options[0]}
                options={options}
                onChange={onChangeNetwork}
              />
            </div>
          </NavNetwork>
          <div className="navRightUser" onMouseEnter={() => onShowDropdown()}>
            <NavInfo>
              <CopyToClipboard text={address}>
                <div className="address">
                  {addressShorten}
                </div>
              </CopyToClipboard>
              <div className="balance">
                <span>{balance}</span> ALGO
              </div>
            </NavInfo>
            <NavArrow>
              {iconUser}
            </NavArrow>
          </div>
        </div>
      </Nav>
      <NavAddressDropdown className={(dropdownStatus == true) ? "" : "hide"} onMouseLeave={() => onHideDropdown()}>
        {addressDropdown}
      </NavAddressDropdown>
    </div>
  );
}

Navigation.propTypes = {};

export default Navigation;
