// import produce from 'immer';
import explorerPageReducer from '../reducer';
// import { someAction } from '../actions';

/* eslint-disable default-case, no-param-reassign */
describe('explorerPageReducer', () => {
  let state;
  beforeEach(() => {
    state = {
      codeValue: "",
      codeCompileStatus: "",
      codeCompileFileName: "-",
      codeCompileAddress: "-",
      explorerFilePreset: [
        {
          "id": 1,
          "name": "folder 1",
          "status": true,
          "files": ["file 1", "file 2"]
        },
        {
          "id": 2,
          "name": "folder 2",
          "status": true,
          "files": ["file 1", "file 2", "file 3"]
        },
        {
          "id": 3,
          "name": "folder 3",
          "status": true,
          "files": ["file 1", "file 2", "file 3", "file 4"]
        },
        {
          "id": 4,
          "name": "folder 4",
          "status": true,
          "files": ["file 1"]
        },
      ],
      explorerFileStatus: [
        true,
        false,
        true,
        false,
      ],
      userFiles: ["default.teal"],
      userFolderStatus: true,
      selectedFolderId: -1, //-1 for null
      selectedFileIndex: 0, //0 for null
      bashResponse: [
        "this is an example code response this is an example code response this is an example code response this is an example code response this is an example code response",
        "this is an example code response",
        "123",
      ],
    };
  });

  it('returns the initial state', () => {
    const expectedResult = state;
    expect(explorerPageReducer(undefined, {})).toEqual(expectedResult);
  });

  /**
   * Example state change comparison
   *
   * it('should handle the someAction action correctly', () => {
   *   const expectedResult = produce(state, draft => {
   *     draft.loading = true;
   *     draft.error = false;
   *     draft.userData.nested = false;
   *   });
   *
   *   expect(appReducer(state, someAction())).toEqual(expectedResult);
   * });
   */
});
