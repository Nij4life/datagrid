import faker from '../api/faker';
import defaultData from '../data/data';
import { TYPE_NUMBER, TYPE_STRING } from '../utils/constants';

const DATA_LOADED = 'DATA_LOADED';
const DATA_LOADED_ERROR = 'DATA_LOADED_ERROR';
export const SORT_ASC = 'SORT_ASC';
export const SORT_DES = 'SORT_DES';

const initialState = {
  data: null,
  originalData: null,
  defaultData: [...defaultData].map(el => Object.values(el)),
};

// ACTION CREATER !

const dataLoaded = (newData) => {
  return { type: DATA_LOADED, newData };
};

const dataLoadedError = () => {
  return { type: DATA_LOADED_ERROR };
}

export const sort = (sortType, index, dataType) => {
  if (dataType === TYPE_NUMBER) {
    return SortNumber(sortType, index);

  } else if (dataType === TYPE_STRING) {
    return SortString(sortType, index);
  }
}

const SortNumber = (sortType, index) => {
  return sortType === SORT_ASC ? { type: SORT_ASC, index } : { type: SORT_DES, index };
}

const SortString = (sortType, index) => {
  return sortType === SORT_ASC ? { type: SORT_ASC, index } : { type: SORT_DES, index };
}

// THUNK CREATER !
export const getDataThunkCreator = () => {
  return (dispatch) => {
    faker(10)
      .then(newData => {
        dispatch(dataLoaded(newData));
      })
      .catch(() => dispatch(dataLoadedError()));
  }
}

// ПЕРЕДЕЛАТЬ С COMBINE_REDUCER!
const reducer = (state = initialState, action) => {
  console.log(action);
  switch (action.type) {
    case DATA_LOADED:
      return { data: [...action.newData], originalData: [...action.newData].map(el => [...el]) };

    case DATA_LOADED_ERROR:
      return { data: state.defaultData };

    case SORT_ASC:
      return {
        data: [...state.data].map(el => [...el]).sort((a, b) => {
          if (a[action.index] < b[action.index]) return -1;
          if (a[action.index] > b[action.index]) return 1;
          return 0;
        })
      };

    case SORT_DES:
      return {
        data: [...state.data].map(el => [...el]).sort((a, b) => {
          if (a[action.index] > b[action.index]) return -1;
          if (a[action.index] < b[action.index]) return 1;
          return 0;
        })
      };

    default:
      return state;
  }
}

export default reducer;
