import * as types from './ActionTypes';

// 初始状态
const initialState = {
    status: 'init', // init,doing,done
    isSuccess: false,
}

export default function loginIn(state=initialState , action) {

    switch (action.type) {
        case types.LOGIN_IN_INIT: // 初始状态
            //如果不使用Object.assign，就要返回全部的state
            //也可以写成 ...state
            return   {
                status: 'init',
                isSuccess: false,
            } ;
        case types.LOGIN_IN_DOING: // 正在登录
            return {
                ...state,
                status: 'doing',
            };
        case types.LOGIN_IN_DONE: // 登录完成
            return Object.assign({}, state, {
                status: 'done',
                isSuccess: action.isSuccess,
            })
        default:
            return state;
    }
}
