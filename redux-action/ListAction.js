import * as types from './ActionTypes';
import Util from '../util/Util';
import ZCZK_APIS from '../util/URL';


export function displayAllCase() {
    return {
        type: types.DISPLAY_LIST_ALLCASE,
    }
}

export function displayApproveCase() {
    return {
        type: types.DISPLAY_LIST_APPROVECASE,
    }
}

export function displayNotCase() {
    return {
        type: types.DISPLAY_LIST_NOTCASE,
    }
}

export function displayLoading() {
    return {
        type: types.DISPLAY_LIST_DOADING,
    }
}


