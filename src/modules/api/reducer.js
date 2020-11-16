import camelCase from 'camelcase';
import ENDPOINTS from 'modules/api/endpoints';
import { API_ACTIONS } from './actions';

function initApiState() {
    return Object.keys(ENDPOINTS).reduce((acc, next) => {
        const inner = {
            data: null,
            loading: false,
            error: null
        };

        acc[camelCase(next)] = inner;

        return acc;
    }, {});
}

const INITIAL_STATE = initApiState();

const apiReducer = (state = INITIAL_STATE, action) => {
    if (action.type.startsWith(API_ACTIONS.FETCH_START)) {
        const inner = camelCase(action.type.replace(API_ACTIONS.FETCH_START, ''));

        return {
            ...state,
            [inner]: {
                ...state[inner],
                loading: true,
                error: null
            }
        };
    }

    if (action.type.startsWith(API_ACTIONS.FETCH_SUCCESS)) {
        const inner = camelCase(action.type.replace(API_ACTIONS.FETCH_SUCCESS, ''));

        return {
            ...state,
            [inner]: {
                ...state[inner],
                data: action.payload,
                loading: false,
                error: null
            }
        };
    }

    if (action.type.startsWith(API_ACTIONS.FETCH_FAILURE)) {
        const inner = camelCase(action.type.replace(API_ACTIONS.FETCH_FAILURE, ''));

        return {
            ...state,
            [inner]: {
                ...state[inner],
                loading: false,
                error: action.payload
            }
        };
    }

    return state;
}

export default apiReducer;