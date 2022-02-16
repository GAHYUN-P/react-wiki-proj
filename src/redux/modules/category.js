import {createAction, handleActions} from "redux-actions";
import {produce} from "immer";
import {axiosInstance} from "../../config";

const SET_CG = "SET_CG";

const setCg = createAction(SET_CG, (name)=> ({name}))


// 초기값 지정 초기값이랑 return이랑 모양을 맞춰줘야함 리덕스에 정보가 들어오기 전에 1차적으로 초기이 적용이 되도록 해준다. 그래야지
// 내가 선언한 접근자로 접근을해도 참조오류가 발생하지 않기 때문
const initialState = {
    list: [],
}




export default handleActions({

    [SET_CG]: (state, action) => produce(state, (draft) => {
        draft
            .list
            .push(action.payload.name)
    }),
}, initialState)

const actionsCreators = {
    setCg
}

export {
    actionsCreators
}