
import { ActionReducerMap } from '@ngrx/store';
import * as ui from './share/ui.reducer';
import * as auth from './auth/auth.reducer';


// export interface State {
//     isLoading: boolean;
// }

// const initialState: State = {
//     isLoading: false
// }

// export const appReducer = createReducer(
//     initialState,
//     on(actions.startLoading, (state) => ({
//         ...state,
//         isLoading: true
//     })),
//     on(actions.stopLoading,  (state) => ({
//         ...state,
//         isLoading: false
//     })),
//   );

  export interface AppState {
    ui: ui.State,
    auth: auth.State
 }
 
 
 
 export const appReducers: ActionReducerMap<AppState> = {
    ui: ui.uiReducer,
    auth: auth.authReducer,
 }

// export function appReducer(state = initialState, action: Action) {
//     switch (action.type) {
//         case 'START_LOADING':
//             return {
//                 isLoading: true
//             };
//         case 'STOP_LOADING':
//             return {
//                 isLoading: false
//             };
//         default:
//             return state;
//     }
//     return state;
// }





