import axios from 'axios';

import { ActionTypes } from './types';

import { Dispatch } from 'redux';
import { BASE_API_URL } from '../../constants/api';

export const getAuthUserAction = () => {
    return (dispatch: Dispatch) => {
        dispatch({type: ActionTypes.AUTH_USER_LOADING});

        // axios.get(`${BASE_API_URL}/api/`)
    }
}
