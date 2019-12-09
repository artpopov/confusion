import * as ActionTypes from "./ActionTypes";

export const comments = (
  state = {
    errMessage: null,
    comments: []
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.ADD_COMMENTS: {
      console.log(action.payload);
      return { errMessage: null, comments: state.comments.concat(action.payload) };
    }

    case ActionTypes.COMMENTS_FAILED:
      return { ...state, errMessage: action.payload, comments: [] };

    default:
      return state;
  }
};
