import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import axios from "axios";
import { axiosInstance } from "../../config";

const SET_COMMENT = "SET_COMMENT";
const ADD_COMMENT = "ADD_COMMENT";

const LOADING = "LOADING";

const setComment = createAction(SET_COMMENT, (post_id, comment_list) => ({
  post_id,
  comment_list,
}));
const addComment = createAction(ADD_COMMENT, (post_id, comment) => ({
  post_id,
  comment,
}));

const loading = createAction(LOADING, (is_loading) => ({ is_loading }));

const initialState = {
  list: [],
  is_loading: false,
};

const addCommentDB = (post_id, comment, writer) => {
  return function (dispatch, getState, { history }) {
    const _post = getState((state) => state.post.list);
    const post = _post.post.list;
    const _comments = Object.values(...post)[9];
    console.log(_comments);
    axiosInstance
      .post(`/comment/${post_id}`, {
        comment_writer: writer,
        comment_desc: comment,
      })
      .then((res) => {
        console.log("성공");
      })
      .catch((err) => {
        console.log("bad");
      });
    // .then((res) => {
    //   let time = new Date();
    //   const _comment = {
    //     comment_writer: writer,
    //     comment_desc: comment,
    //     createdAt: time,
    //   };
    //   dispatch(addComment(_comment));
    // });
  };
};

export default handleActions(
  {
    [SET_COMMENT]: (state, action) =>
      produce(state, (draft) => {
        draft.list[action.payload.post_id] = action.payload.comment_list;
      }),

    [ADD_COMMENT]: (state, action) =>
      produce(state, (draft) => {
        draft.list.push(action.payload);
        console.log(action.payload);
      }),
    [LOADING]: (state, action) =>
      produce(state, (draft) => {
        draft.is_loading = action.payload.is_loading;
      }),
    // [EDIT_POST]: (state, action) =>
    //   produce(state, (draft) => {
    //     let idx = draft.list.findIndex((p) => p.id === action.payload.post_id);

    //     draft.list[idx] = { ...draft.list[idx], ...action.payload.post };
    //   }),
    // [LOADING]: (state, action) =>
    //   produce(state, (draft) => {
    //     draft.is_loading = action.payload.is_loading;
    //   }),
  },
  initialState
);

const actionCreators = {
  setComment,
  addComment,
  addCommentDB,
};

export { actionCreators };
