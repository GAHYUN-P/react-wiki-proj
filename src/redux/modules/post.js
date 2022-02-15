import {createAction, handleActions} from "redux-actions";
import {produce} from "immer";
import {axiosInstance} from "../../config";

const ADD_POST = "ADD_POST";
const EDIT_POST = "EDIT_POST";

const addPost = createAction(ADD_POST, (post) => ({post}))
const editPost = createAction(EDIT_POST, (post, post_Id) => ({post, post_Id}))



// 초기값 지정 초기값이랑 return이랑 모양을 맞춰줘야함 리덕스에 정보가 들어오기 전에 1차적으로 초기이 적용이 되도록 해준다. 그래야지
// 내가 선언한 접근자로 접근을해도 참조오류가 발생하지 않기 때문
const initialState = {
    list: [],
}

const add_Post = (item) => {
    return function (dispatch, getState, {history}) {
        const _post = {
            title: item.title,
            writer: item.writer,
            category: item.category,
            password: item.password,
            desc: item.desc,
        }

        console.log(_post)

        axiosInstance
            .post("/post", _post,)
            .then((res) => {
                console.log(res)
                dispatch(addPost(res))
                window.location.href = "/"
            })
            .catch((err) => console.log(err))
        
        dispatch(addPost(_post))

    }

}

const edit_Post = (post, post_Id) =>{
    return function(dispatch, getState, {history}){
        axiosInstance.put(`/api/modify/${post_Id}`, post,)
                .then((res) =>{
                    console.log(res)
                    dispatch(editPost(res ,post_Id))
                })
                .catch((err)=> console.log(err))
    }
}



export default handleActions({

    [ADD_POST]: (state, action) => produce(state, (draft) => {
        console.log(action.payload.post)
        draft
            .list
            .push(action.payload.post)
    }),

    [EDIT_POST] : (state, action) => produce(state, (draft) => {
        let idx = draft.list.findIndex((p) => p.postId === action.payload.post_Id)
        draft.list[idx] = {...draft.list[idx], ...action.payload.post}
      }), 

}, initialState)

const actionsCreators = {
    add_Post,
    edit_Post,
}

export {
    actionsCreators
}