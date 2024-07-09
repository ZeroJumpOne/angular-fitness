import { createReducer, on } from '@ngrx/store';
import * as actions from './training.actions';
import { Exercise } from './exercise.module';

export interface State {
   availableExercises: Exercise[];
   finishedExcercises: Exercise[];
   activeTraining: Exercise;
   training: boolean;
}

const initialState: State = {
   availableExercises: [],
   finishedExcercises: [],
   activeTraining: {} as Exercise,
   training: false,
}

export const trainingReducer = createReducer(
   initialState,
   on(actions.setAvailable,  (state, { availables }) => ({ ...state, availableExercises: availables })),
   on(actions.setFinished,   (state, { finisheds  }) => ({ ...state, finishedExcercises: finisheds })),
   on(actions.startTraining, (state, { exercise   }) => ({ ...state, activeTraining: exercise })),
   on(actions.stopTraining,  (state)                 => ({ ...state, activeTraining: {} as Exercise })),
   on(actions.setIsTraining, (state, { training   }) => ({ ...state, training: state.activeTraining !== null})),

);
