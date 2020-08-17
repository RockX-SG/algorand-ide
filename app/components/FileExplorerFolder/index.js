/**
 *
 * FileExplorerFolder
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import messages from './messages';

import ReactTooltip from "react-tooltip";


let iconArrowDown = <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABmJLR0QA/wD/AP+gvaeTAAAAlklEQVQ4je3QMQtBcRTG4XMH3SgpiVIGZTD49hYGi8ViMBgMyqCU0Sd4LIY/6bouk/z283R6I/79fllEBFoRMfrQ2mdZdokbWMNU9ebI73jkmFXAFqg//RkNLN/AVmgWDoEW1iWwDdql1kUH2wJsh14pLEG7t8PH9ui/hSXoAIcEO2JYCUvQEU44Y/wRlqATTL6C/XvZFaogWFMR+F24AAAAAElFTkSuQmCC" />

let iconArrowRight = <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABmJLR0QA/wD/AP+gvaeTAAAAxUlEQVQ4jdXOMSuFcRQG8N+RusUgkzIoymCwGhRFlCx8FN/FR7FZbrpWqzIog7qTxWB9LCbx3vd1/4tnfc75ncO/TZKrJOtD9xY6uh3cJ9lqBcImxkm2W4GwgUmS3VYgrOEuyV4rEFZxm2S/FQgrX+hpKxCWcZPkshUII1wnWWoFTnFWVR/fi8U/YC84qarnn8qhHz7h4DdsKPiIo6p67RrqCz7gsKqmswb7gBMcV9Vbn8uzwDHOq+q9D9aZJBdJRnND8+YT+t062pP9UmkAAAAASUVORK5CYII=" />

let iconDelete = <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/wD/AP+gvaeTAAAAkUlEQVRIie2VwQ2AIBAE1R40WiKWKw/LGR+SaIzi7SE/90XC7Y7CAU3zSxUQgMHhG4DwVjSzKyqQFB6Td84V9sCSCldgMoRfPaNqeITI4QrEHW6BFIfnIJ+FnyDnDomXsdzOlj+Rvrwr4LYF3kNVl+huQz2H0RyemdMgllZ0Q5Q+lyGeQyRBqH1dp+J6D86vO23cMwceYU71pwAAAABJRU5ErkJggg==" />

let iconDeleteBlack = <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/wD/AP+gvaeTAAAAjklEQVRIie2Vyw2AIBQER3uQaIlarhwsRy+Y4AfCPuTmnEx0dwg+FH4MzIAz5FzIZlmAHfCixIXMHjqSDMAaHtyAqaD8nhnVQE4ilysSc3mJpLo8J/ms/CSeEH+7tozzK/GqpZX3FdKuInuh6Ra9vVDLYSwuT92TJSWjaJYocy5LLIdIkjT/XEPjH87PgwNng1K28QMLlAAAAABJRU5ErkJggg==" />

function FileExplorerFolder(props) {
  const {
    onToggleFolder,
    folderStatus,
    folderType,
    folderName,
    folderIndex,
    files,
    onChangeFile,
    selectedFolderId,
    selectedFileIndex,
    userFiles,
    onDeleteFile,
    mode
  } = props;
  
  let renderedFiles;
  
  // console.log("selectedFolderId", selectedFolderId)
  // console.log("folderIndex", folderIndex)
  // console.log("selectedFileIndex", selectedFileIndex)
  
  if(folderType =="user"){
    renderedFiles = files.map((file, index) =>
      <div key={file.toString()}>
        <div className={(selectedFolderId == 999 && selectedFileIndex == index) ? "entry file indent2 entrySelected" : "entry file indent2"} onClick={() => onChangeFile([mode, file, 999, index])}>
          <div className="file">
            <div className="fileName">
              {file}
            </div>
            <div className="fileDelete" data-tip="Delete file" data-for="fileDelete" onClick={() => onDeleteFile([mode, index])}>
              {(selectedFolderId == 999 && selectedFileIndex == index) ? iconDeleteBlack : iconDelete}
            </div>
            <div className="clear"></div>
          </div>
        </div>
      </div>
    );
  }else if(folderType =="tutorial"){
    renderedFiles = files.map((file, index) =>
      <div key={file.toString()}>
        <div className={(selectedFolderId == folderIndex && selectedFileIndex == index) ? "entry file indent2 entrySelected" : "entry file indent2"} onClick={() => onChangeFile([mode, file, folderIndex, index])}>
          <div className="file">
            <div className="fileName">
              {file}
            </div>
            <div className="clear"></div>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div>
      <ReactTooltip id="fileDelete" place="right" type="light" effect="float"/>
      <div className="entry folder indent1" onClick={() => onToggleFolder([mode, folderType, folderIndex])}>
        {(folderStatus == true) ? iconArrowDown : iconArrowRight} {folderName}
      </div>
      <div className={(folderStatus == true) ? "" : "hide"}>
        {renderedFiles}
      </div>
    </div>
  );
}

FileExplorerFolder.propTypes = {
  files: PropTypes.array
};

export default FileExplorerFolder;
