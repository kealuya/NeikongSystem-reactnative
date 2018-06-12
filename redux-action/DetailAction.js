import * as types from './ActionTypes';
import Util from '../util/Util';
import ZCZK_APIS from '../util/URL';

export const displayDetailByYwid = (ywid) => {
    return {
        type: types.DISPLAY_DETAIL_BY_YWID,
        payload:{
            ywid:ywid
        }
    }
}

export const displayStepDetail = (stepid) => {
    return {
        type: types.DISPLAY_STEP_DETAIL,
        payload:{
            stepid:stepid
        }
    }
}


