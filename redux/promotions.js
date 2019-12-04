import * as ActionTypes from "./ActionTypes";

export const promotions = (
  state = {
    isLoading: true,
    errMessage: null,
    promotions: []
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.ADD_PROMOS:
      return {
        ...state,
        isLoading: false,
        errMessage: null,
        promotions: action.payload
      };

    case ActionTypes.PROMOS_LOADING: {
      return { ...state, isLoading: true, errMessage: null, promotions: [] };
    }

    case ActionTypes.PROMOS_FAILED: {
      return {
        ...state,
        isLoading: false,
        errMessage: action.payload,
        promotions: []
      };
    }

    default:
      return state;
  }
};
