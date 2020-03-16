import faker from '../api/faker';
import defaultData from '../data/data';
import { TYPE_NUMBER, TYPE_STRING } from '../utils/constants';

const DATA_LOADED = 'DATA_LOADED';
const DATA_LOADED_ERROR = 'DATA_LOADED_ERROR';
export const SORT_ASC = 'SORT_ASC';
export const SORT_DES = 'SORT_DES';

const headers = ['№', 'Name', 'Surname', 'Age', 'Country', 'Gender', 'Working'];

const initialState = {
  data: null,
  headers,
  originalData: null,
  defaultData: [...defaultData].map(el => Object.values(el)),
  activeSort: null,
};

const dataLoaded = (newData) => {
  return { type: DATA_LOADED, newData };
};

const dataLoadedError = () => {
  return { type: DATA_LOADED_ERROR };
}

export const sort = (sortType, column) => {
  return sortType === SORT_ASC ? { type: SORT_ASC, column } : { type: SORT_DES, column };
}

export const getDataThunkCreator = () => {
  return (dispatch) => {
    faker(10)
      .then(newData => {
        dispatch(dataLoaded(newData));
      })
      .catch(() => dispatch(dataLoadedError()));
  }
}


const reducer = (state = initialState, action) => {
  switch (action.type) {
    case DATA_LOADED:
      return { ...state, data: [...action.newData], originalData: [...action.newData].map(el => [...el]) };

    case DATA_LOADED_ERROR:
      return { ...state, data: state.defaultData };

    case SORT_ASC:
      return {
        ...state,
        activeSort: {column: action.column, sort: SORT_ASC },
        data: [...state.data].map(el => [...el]).sort((a, b) => {
          if (a[action.column] < b[action.column]) return -1;
          if (a[action.column] > b[action.column]) return 1;
          return 0;
        })
      };

    case SORT_DES:
      return {
        ...state,
        activeSort: {column: action.column, sort: SORT_DES },
        data: [...state.data].map(el => [...el]).sort((a, b) => {
          if (a[action.column] > b[action.column]) return -1;
          if (a[action.column] < b[action.column]) return 1;
          return 0;
        })
      };

    default:
      return state;
  }
}

export default reducer;
