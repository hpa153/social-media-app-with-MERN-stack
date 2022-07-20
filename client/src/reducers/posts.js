import { FETCH_ALL, FETCH_BY_SEARCH, CREATE, UPDATE, LIKE, DELETE } from '../constants/actionTypes';

export default (state = [], action) => {
  switch(action.type) {
    case FETCH_ALL:
      return {
        ...state,
        posts: action.payload.data,
        currentPage: action.payload.currentPage,
        totalPages: action.payload.totalPages,
      };
    case FETCH_BY_SEARCH:
      return {
        ...state,
        posts: action.payload,
      };
    case CREATE:
      return {...state, posts: action.payload };
    case UPDATE:
    case LIKE:
      return state.map((post) => post._id === action.payload._id ? action.payload : post);
    case DELETE:
      return state.filter((post) => post._id !== action.payload._id);
    default:
      return state;
  }
}
