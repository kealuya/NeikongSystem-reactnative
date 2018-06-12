import * as types from '../redux-action/ActionTypes';

// 初始状态
const initialState = {
    status: types.DISPLAY_LIST_ALLCASE, // init,doing,done
};

export default function displayList(state = initialState , action) {

    switch (action.type) {
        case types.DISPLAY_LIST_ALLCASE:
            return {
                ...state,
                status: types.DISPLAY_LIST_ALLCASE,
            } ;
        case types.DISPLAY_LIST_APPROVECASE:
            return {
                ...state,
                status: types.DISPLAY_LIST_APPROVECASE,
            } ;
        case types.DISPLAY_LIST_NOTCASE:
            return {
                ...state,
                status: types.DISPLAY_LIST_NOTCASE,
            } ;
        default:
            return state;
    }
}
