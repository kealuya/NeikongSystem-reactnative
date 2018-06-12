import * as types from './ActionTypes';

// 初始状态
const initial3333State = {
    status: 'nothing', // init,doing,done
    isOuted: false,
    isSuccess:false,
}

export default function loginOut(state=initial3333State , action) {

    switch (action.type) {
        case types.LOGIN_OUT_DOING:
            return Object.assign({}, state, {
                status: 'doing',
                isOuted: false,
            });
        case types.LOGIN_OUT_DONE:
            return Object.assign({}, state, {
                status: 'down',
                isOuted: true,
            });
        case types.LOGIN_IN_DONE: // 登录完成
            return {
                ...state,
                status: 'done',
                isSuccess: action.isSuccess,
                user: action.user
            }
        default:
            return state;
    }
}
