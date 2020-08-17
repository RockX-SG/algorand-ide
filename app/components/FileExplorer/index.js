/**
 *
 * FileExplorer
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

import ReactTooltip from "react-tooltip";

import FileExplorerStyles from './FileExplorerStyles';

import FileExplorerFolder from '../FileExplorerFolder';


import Popup from "reactjs-popup";

let iconPlus = <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABmJLR0QA/wD/AP+gvaeTAAAAT0lEQVQ4jWNgGAXYwP///wP///8fSE0Dz/7///8sMWqZqGbryDWQEZkDjckaLOo0oPQNLHItjIyM62EcqruQKDCabOhrIAuR6lqobfEwAgAW9hxgMIWLOgAAAABJRU5ErkJggg==" />

let iconArrowDown = <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABmJLR0QA/wD/AP+gvaeTAAAAlklEQVQ4je3QMQtBcRTG4XMH3SgpiVIGZTD49hYGi8ViMBgMyqCU0Sd4LIY/6bouk/z283R6I/79fllEBFoRMfrQ2mdZdokbWMNU9ebI73jkmFXAFqg//RkNLN/AVmgWDoEW1iWwDdql1kUH2wJsh14pLEG7t8PH9ui/hSXoAIcEO2JYCUvQEU44Y/wRlqATTL6C/XvZFaogWFMR+F24AAAAAElFTkSuQmCC" />

let iconArrowRight = <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABmJLR0QA/wD/AP+gvaeTAAAAxUlEQVQ4jdXOMSuFcRQG8N+RusUgkzIoymCwGhRFlCx8FN/FR7FZbrpWqzIog7qTxWB9LCbx3vd1/4tnfc75ncO/TZKrJOtD9xY6uh3cJ9lqBcImxkm2W4GwgUmS3VYgrOEuyV4rEFZxm2S/FQgrX+hpKxCWcZPkshUII1wnWWoFTnFWVR/fi8U/YC84qarnn8qhHz7h4DdsKPiIo6p67RrqCz7gsKqmswb7gBMcV9Vbn8uzwDHOq+q9D9aZJBdJRnND8+YT+t062pP9UmkAAAAASUVORK5CYII=" />

import Input from './Input';

function FileExplorer(props) {
  const {
    filePreset,
    onAddNewFile,
    onToggleFolder,
    explorerPage,
    onChangeFile,
    onChangeNewFileName,
    onDeleteFile,
    newFileName,
    mode
  } = props;
  
  console.log("explorerPage.explorerFileStatus", explorerPage.explorerFileStatus)
  
  const tutorialFolder = filePreset.map((folder, index) =>
    <div key={index}>
      <FileExplorerFolder folderStatus={explorerPage.explorerFileStatus[index]} onToggleFolder={onToggleFolder} folderType="tutorial" folderName={folder["name"]} folderIndex={index} files={folder["files"]} onChangeFile={onChangeFile} selectedFolderId={explorerPage.selectedFolderId} selectedFileIndex={explorerPage.selectedFileIndex} mode={mode} />
    </div>
  );
  
  return (
    <FileExplorerStyles>
      <ReactTooltip id="explorer" place="right" type="light" effect="float"/>
      <div>
        <div className="header">
          <div className="title">
            Files
          </div>
          <div className={(explorerPage.userFiles.length < 5) ? "" : "hide"}>
            <Popup
              trigger={
                <div className="headerAction" data-tip="New File" data-for="explorer">
                  {iconPlus}
                </div>
              }
              modal
              closeOnDocumentClick
              closeOnEscape
            >
            {close => (
              <div className="popupContent">
                <div className="popupContentTitle">
                  Enter your file name:
                </div>
                <div className="popupContentInput">
                  <Input
                    id="newFileName"
                    type="text"
                    placeholder="Please enter your file name (do not include .teal)"
                    value={newFileName}
                    onChange={onChangeNewFileName}
                  />
                </div>
                <div className="popupContentLeft">
                  <button className={(explorerPage.userFiles.length < 5) ? "" : "hide"} onClick={() => onAddNewFile([mode])}>
                    Create File
                  </button>
                </div>
                <div className="popupContentRight">
                  <button className="error" onClick={close}>
                    Cancel
                  </button>
                </div>
              </div>
            )}
            </Popup>
          </div>
          <div className="clear"></div>
        </div>
        <div className="explorerBoundary">
          
          {tutorialFolder}
          
          <FileExplorerFolder folderStatus={explorerPage.userFolderStatus} onToggleFolder={onToggleFolder} folderType="user" folderIndex="0" folderName="Your Folder" files={explorerPage.userFiles} onChangeFile={onChangeFile} selectedFolderId={explorerPage.selectedFolderId} selectedFileIndex={explorerPage.selectedFileIndex} onDeleteFile={onDeleteFile} mode={mode} />
        </div>
      </div>
    </FileExplorerStyles>
  );
}

FileExplorer.propTypes = {
  filePreset: PropTypes.array
};

export default FileExplorer;
