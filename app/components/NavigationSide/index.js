/**
 *
 * NavigationSide
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

import {
  Link,
} from 'react-router-dom';

import ReactTooltip from "react-tooltip";

import NavSide from './NavSide';

let iconFile = <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABmJLR0QA/wD/AP+gvaeTAAABHUlEQVRYhe2WO67CMBBFD5+aLk9PVBRUsAhYBy0dS2ANULIUalgEH7EFEBt4jSm40QsQSLAHTMGVLGcmk/GJPaMEvvpgOY+xAX5jAjhgBzQtAXyATSB8AbaZOeg4fAF+gBUGO+ELgBVESA3kdUeuKgUJi2Ly4p9aq14yeRndA30IVjUE8FIoQML5DfexALqa1+8CaACDjN3RnFb5QDEmum7DGjCXbyzfTPZIPqeY2oM83gBT2UegLd9Svh7Q4lwLDphYAwx1/afFUqULJrJ7inF6phAgpAgTjYOGuYqOoC97ofstXngEcFuEI13PdP/lRQiXbZjtgFR5bWgKkNWS/w4IyeP94HUHvB3AJE/0r2GZ/wGLXbir6DvwVXSdAE1hmNFACkdhAAAAAElFTkSuQmCC"/>

let iconWallet = <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABmJLR0QA/wD/AP+gvaeTAAABAklEQVRYhe3WP0oDQRTH8Q8iabyAtUUuYGUEK8HGG6SwEzxBagsT6xzAA4i9RVpLb2AVMDbp/FOIoBaOuKzCjpNZRZkfPAaGee/7m8fs7FBUlFddHOAMc0yx0yZwFX2cBNjLFzHNCVzBNo5xiecabI5T7GOtMp+sZaxjgAkea8CHMD8I65Zq+ckGdnEeAFXgEy5wiC10Uoo3ac/n1i4aM4xiDV9lhldjGGPgffcbMYsj1fPRiUYtfHK/U7d+an9cxcC/NTDEPY5SknN8BXehxm1T3bY6MPbWgXFKcrkHioFfN3ATxl5GzmYYo/6GI+29B6Iupk4wMcsIvg7wVp5wRX9br+9BmG1oTKyuAAAAAElFTkSuQmCC"/>

let iconTransaction = <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABmJLR0QA/wD/AP+gvaeTAAAByklEQVRYhe2Wu04CQRSGP02gESysfAbQSKNob2Fla4WVraWxZEsskFtlbe8L0ElnZ8AHUHwCIAEiisWcCcNkFthlMdH4Jycs/56Z8+3lHIB//XF5UWySBkpAC+hJtMRLzyk+XqZwHKgBI9nIFSOgKrmu4qEB4kBdNugDZeAA2JDIAhVgIDl1A8Is7oqFVJPkN2B3Rt4e0JbcalQAadSt7RvFt4BrK0yIgaxJOSACqyQLS4Z3wuwrqYp3a3ieI28hvcjCfcO7soo/WWuy4jct3wsD0JHNEoZ3bwF8AefG+aT4naDF1nwAkhI98U6BbTneAS6BZyBjAHSALrAZBGDd4bXlM2V4eeBOimuNjGM9kF6DFPeTfgkrhnfB9CP4BM6M87pti/I9RwRtOEC1mNaxFLhBDSWtDDBkug0flgGASVu1LQhbGeBdcstz9gwEEGMyigcCdIjqjARwhLrtQyajOBYlAKjZXmX2j9EH6sp18YZxrrEsgFYaNeGaqDbrynGR6U6xAR6jAohKTgDXHLDl+fg51Nu+co2Bgo8f5JaGfgR6oQ2xMoBZfyYKjrylABZ5B0z1A+ZHIk2e9/GDRigAu/iPAnhhFv3r1+gbCb3fEuKrVkwAAAAASUVORK5CYII="/>

let iconAsset = <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABmJLR0QA/wD/AP+gvaeTAAACLklEQVRYhe2Wy04UQRSGPwlyExLG4IawRYZHYMJoeALYYeKCGJUH0AThBeTyLoCy45KIhs2AO4IMuCOOCzZMeADHRf+Vqu7pqukeTGQxf9KpOn2uVXXqnIIOOvjPeJBRrgDMAbNAERjT/98aRzX+As6BHeATcHPXAPuBFaAONHJ+N8Ay0Neu81HgxDG4C7wBJoBH+or6t5dw/tOZH2N3KJfzKxmoAtMZdMrAhXQugHmHvsoTRD925V+A4RyBF4BD6X4HRoCvoitkPI4VKZwHnJvt9QVhVv5eNqqiP2RZgUm4tG3vBtadANb1L4nn4t8Cg7L1hygxC6EAXmETLg0bNGf7hkd2X/yXCXohFMC2hF57+NfiTwElza89sm/F3xK9IHozFIA5uwkPvyZ+KWREKEr2VPQ49lZ5cSuhIQ9/Fbv1NdE9HtkhydVFD2Dzou0AeuTU7EQD+PgvA2h1BC5MDtQ8/OQRPCXlCLoSSj80lj1GTRKWsI3soUf2mcZLJ2CAM488YK/hnoe/RvM1XPPIHhC/hoYOXsMCUbFoOCtw0U08EVdJL0QzxAtRGVuIWpb2ZWxD8VWtUCl+jO2G74iX5qVWziFqGMdSOAwE4XP+TbonwBPgiJzNCOLt+JKotrfCDHblVeCFQ+dqx24QFex27wOLwCTRuQ5qvohNsLQHSaUd5wZ9RC3UJGbeJ9kS0BtykPVROkz0IJ0lWvWYdN1HaQP7KP2sr95kqYMO7hv+AuJj1Zx/Qzl2AAAAAElFTkSuQmCC"/>

let iconTutorial = <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABmJLR0QA/wD/AP+gvaeTAAAA/klEQVRYhe3VwU3DQBCF4S+IA9SQcCOiDW5QAVRABVANHURWuBC6gAbgmCuRIFcO4ZC1INFa2Np4QWJ/aSTraTXzdmZsUyj8dwYRbZWz5l7Pxf4UK5HuNnVghArLEFOMe7O2xQkWvhzXscAwIW+0AzHuwsH7UHCIWdAmOQwsw8Hvtz0K2tuuDcR2oD4Ue0WzMA0mZtbLOMJD0KqEvK1HMMar+BIe5zDAev4TvIeoEot3NtAHnZZwOz7wiAubyznAJW77cNoUTzjDeXiu9dOWeVsbiGnziKE5rrCfw8ABrvGCZ9zgsE3SXRlIodPfMBs/za2JlG5sfOp/vQOFQuET7aBmWGsXbO4AAAAASUVORK5CYII="/>

let iconSetting = <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABmJLR0QA/wD/AP+gvaeTAAACnUlEQVRYhe2Xy08UQRDGfyagB5eHMSwb1j0ZWCMHH+xZEqNX8cGf4iOeJFn1ajQcJVy4a+JJFk28qxgI+IgaAyQcjBI2Iqd1PFRVemxnZ3sWEi58SWdna6rrq/mqeroH9rHHOJDRvwxcBi4CRaCk9lVgDagBT4FPu5WgoQK8AKLAMQeM7AZxJzAJ/NHAP4DHwCVEjcM6ysAYMKU+kc55BHS0S34EeKnBtoAq0B0wrxu4C/zGqdGblbwTJ/kaUoKsOAV80xivgINZJk/qxBVgoA1ywwDSoBHwMHRSBanfFnAm4X4eKcc88AuoA2+BCeBYgv9ZpBwNvW4Jk76acG9cCZt1/zxwKGHePb1fa0VexnW733DjuNXwBBgFjgNf1PYeKKivn0QP8FP9BtMSuKVOU549j3vyG2orKKlPXkCUKHkxpr35iaip05hnr+KevBW52e94Ma6ofTYtgY/qNOTZ36l9FFFjuQV5BLzxYlh5P6QlYDJ3NbHnmiQQJ/+qv5tejC6110MS8Bvwu9qP6n+/BPHroZ0kYCU4GbP1Aeu4Ehh8yU2N8+ygBNaEV/V/HlhU24ImE0cBKccyrheeqf+E52tN+DwtgZvqNKMBl1LIDXkdALfVfwNXLoMtw+tpCZhMm7hGSyLvA84pSQ6R3Z68wf/LOPhFBLJ9Wl2bkS/EfOJjI4Ec4D4B8htGcK/cCynk68jqqAOvkZr7soNsbtuIMqdDEgA5ydh2XEwgX6R5T8RRxG3HD0LJQY5RVooVRAkjXwL6A2JUYuSztHE06+XffoiQxmxF3oPUfDtGnvlIZuhATjIN3OqYAa4Bw8gbMwecQNb5NK7bG4jsbR9K4xjGLbOQUSPw9JP1w2QQ92FSwh3BVnXYh8nnjHH3sXf4Czv9/2l3ASPpAAAAAElFTkSuQmCC"/>

function NavigationSide(props) {
  const {
    currentPage,
    onSelectPage
  } = props;
  
  return (
    <NavSide>
      <ReactTooltip id="navSide" place="right" type="dark" effect="float"/>
      <Link to="/explorer">
        <div className={(currentPage == "explorer") ? "navSideEntry navSideEntrySelected" : "navSideEntry"} data-tip="File Explorer" data-for="navSide" onClick={() => onSelectPage("explorer")}>
          {iconFile}
        </div>
      </Link>
      <Link to="/wallet">
        <div className={(currentPage == "wallet") ? "navSideEntry navSideEntrySelected" : "navSideEntry"} data-tip="Wallet" data-for="navSide" onClick={() => onSelectPage("wallet")}>
          {iconWallet}
        </div>
      </Link>
      <Link to="/transaction">
        <div className={(currentPage == "transaction") ? "navSideEntry navSideEntrySelected" : "navSideEntry"} data-tip="Transaction Creator" data-for="navSide" onClick={() => onSelectPage("transaction")}>
          {iconTransaction}
        </div>
      </Link>
      <Link to="/asset">
        <div className={(currentPage == "asset") ? "navSideEntry navSideEntrySelected" : "navSideEntry"} data-tip="Asset Creator" data-for="navSide" onClick={() => onSelectPage("asset")}>
          {iconAsset}
        </div>
      </Link>
      <Link to="/tutorials">
        <div className={(currentPage == "tutorial") ? "navSideEntry navSideEntrySelected" : "navSideEntry"} data-tip="Tutorials" data-for="navSide" onClick={() => onSelectPage("tutorial")}>
          {iconTutorial}
        </div>
      </Link>
      <Link to="/settings">
        <div className={(currentPage == "setting") ? "navSideEntry navSideEntrySelected" : "navSideEntry"} data-tip="Settings" data-for="navSide" onClick={() => onSelectPage("setting")}>
          {iconSetting}
        </div>
      </Link>
      
    </NavSide>
  );
}

NavigationSide.propTypes = {};

export default NavigationSide;
