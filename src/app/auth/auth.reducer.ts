import { createReducer, on } from '@ngrx/store';
import * as actions from './auth.actions';

export interface State {
    isAuthenticated: boolean;
}

const initialState: State = {
    isAuthenticated: false
}

export const authReducer = createReducer(
    initialState,
    on(actions.setAuth, (state) => ({
        ...state,
        isAuthenticated: true
    })),
    on(actions.setUnAuth,  (state) => ({
        ...state,
        isAuthenticated: false
    })),
  );
