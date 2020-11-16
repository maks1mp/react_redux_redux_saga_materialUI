import {takeEvery, put, all} from 'redux-saga/effects';
import api from 'modules/api/api';
import {apiActions, API_ACTIONS} from 'modules/api/actions';

export function* onApiLoad({payload, type}) {
    const actionType = type.replace(API_ACTIONS.FETCH_START, '').toLowerCase();

    try {
        const response = yield api.fetch(actionType, payload);

        yield put(apiActions.fetchSuccess(actionType, response));
    } catch(e) {
        yield put(apiActions.fetchFailure(actionType, e));
    }
}

export function* watchApiLoad() {
    yield takeEvery(action => action.type.startsWith(API_ACTIONS.FETCH_START), onApiLoad);
}

export default function* apiRootSaga() {
    yield all([
        watchApiLoad()
    ]);
}