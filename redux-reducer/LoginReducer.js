import * as types from '../redux-action/ActionTypes';

// 初始状态
const initialState = {
    status: types.LOGIN_IN_INIT, // init,doing,done
    isSuccess: false,
    user:null,
    toastMsg:null
};

export default function loginIn(state = initialState , action) {

    switch (action.type) {
        case types.LOGIN_IN_INIT: // 初始状态
            return {
                ...state,
                status: types.LOGIN_IN_INIT,
                isSuccess: false,
            } ;
        case types.LOGIN_IN_DOING: // 正在登录
            return {
                ...state,
                status: types.LOGIN_IN_DOING,
            };
        case types.LOGIN_IN_DONE: // 登录完成
            return {
                ...state,
                status: types.LOGIN_IN_DONE,
                isSuccess: action.payload.isSuccess,
                user:action.payload.user,
            };
        case types.LOGIN_IN_ERROR:
            return {
                ...state,
                status: types.LOGIN_IN_ERROR,
                toastMsg: action.payload.toastMsg
            };
        default:
            return state;
    }
}
