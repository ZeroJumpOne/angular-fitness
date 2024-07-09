import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import * as ui from './share/ui.reducer';
import * as auth from './auth/auth.reducer';
import * as training from './training/training.reducer';


// export interface State {
//     isLoading: boolean;
// }

// const initialState: State = {
//     isLoading: false
// }


export interface AppState {
   ui: ui.State,
   auth: auth.State,
   training: training.State,
}



export const appReducers: ActionReducerMap<AppState> = {
   ui: ui.uiReducer,
   auth: auth.authReducer,
   training: training.trainingReducer,
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





