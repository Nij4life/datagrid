import faker from '../api/faker';
import defaultData from '../data/data';

const SEARCH = 'SEARCH';
const SEARCH_GLOBAL = 'SEARCH_GLOBAL';
const DATA_LOADED = 'DATA_LOADED';
const DATA_LOADED_ERROR = 'DATA_LOADED_ERROR';
export const SORT_ASC = 'SORT_ASC';
export const SORT_DES = 'SORT_DES';
export const SORT_RESET = 'SORT_RESET';


const headers = ['№', 'Name', 'Surname', 'Age', 'Country', 'Birthday', 'In job search'];

const initialState = {
  data: null,
  headers,
  originalData: null,
  defaultData: [...defaultData].map(el => Object.values(el)),
  activeSort: null,
};

export const search = (column, text) => {
  return { type: SEARCH, column, text };
}

export const searchGlobal = (text) => {
  console.log('searchGlobal', text);
  return { type: SEARCH_GLOBAL, text };
}

const dataLoaded = (newData) => {
  return { type: DATA_LOADED, newData };
};

const dataLoadedError = () => {
  return { type: DATA_LOADED_ERROR };
}

export const sort = (sortType, column) => {
  return sortType === SORT_ASC ? { type: SORT_ASC, column } : { type: SORT_DES, column };
}

export const sortReset = (column) => {
  return { type: SORT_RESET, column };
}

export const getDataThunkCreator = () => {
  return (dispatch) => {
    faker(100)
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
        activeSort: { column: action.column, sort: SORT_ASC },
        data: [...state.data].map(el => [...el]).sort((a, b) => {
          if (a[action.column] < b[action.column]) return -1;
          if (a[action.column] > b[action.column]) return 1;
          return 0;
        }),
      };

    case SORT_DES:
      return {
        ...state,
        activeSort: { column: action.column, sort: SORT_DES },
        data: [...state.data].map(el => [...el]).sort((a, b) => {
          if (a[action.column] > b[action.column]) return -1;
          if (a[action.column] < b[action.column]) return 1;
          return 0;
        }),
      };

    case SORT_RESET:
      return {
        ...state,
        activeSort: { column: action.column, sort: SORT_RESET },
        data: [...state.data].map(el => [...el]).sort((a, b) => {
          if (a[action.column] < b[action.column]) return -1;
          if (a[action.column] > b[action.column]) return 1;
          return 0;
        }),
      };

    case SEARCH:
      return {
        ...state,
        data: [...state.data].map(el => [...el]).filter(elem => elem[action.column].includes(action.text)),
      };

    case SEARCH_GLOBAL:
      return {
        ...state,
        data: [...state.data].map(el => [...el]).filter(row =>
          row.some(cell => cell.toString().includes(action.text))
        ),
      };

    default:
      return state;
  }
}

export default reducer;
