import * as types from '../redux-action/ActionTypes';

// 初始状态
const initialState = {

};

export default function displayDetail(state = initialState , action) {

    switch (action.type) {
        case types.DISPLAY_DETAIL_BY_YWID:
            return {
                ...state,
                ywid: action.payload.ywid,
                status: types.DISPLAY_DETAIL_BY_YWID,
            };
        case types.DISPLAY_STEP_DETAIL:
            return {
                ...state,
                stepid: action.payload.stepid,
                status: types.DISPLAY_STEP_DETAIL,
            };
        default:
            return state;
    }
}
