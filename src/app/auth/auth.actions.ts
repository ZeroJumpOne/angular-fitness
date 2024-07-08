import { createAction } from '@ngrx/store';

export const setAuth   = createAction('[Auth] Set Authenticated');
export const setUnAuth = createAction('[Auth] Set Unauthenticared');
