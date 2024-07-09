import { createReducer, on } from '@ngrx/store';
import * as actions from './training.actions';
import { Exercise } from './exercise.module';

export interface State {
   availableExercises: Exercise[];
   finishedExcercises: Exercise[];
   // activeTraining: Exercise;
   // isTraining: boolean;
   training: Training;
}

export interface Training {
   exercise: Exercise;
   now: boolean;
}

const initialState: State = {
   availableExercises: [],
   finishedExcercises: [],
   // activeTraining: {} as Exercise,
   // isTraining: false,
   training: { exercise: {} as Exercise, now: false },
}

export const trainingReducer = createReducer(
   initialState,
   on(actions.setAvailable,  (state, { availables }) => ({ ...state, availableExercises: availables })),
   on(actions.setFinished,   (state, { finisheds  }) => ({ ...state, finishedExcercises: finisheds })),
   on(actions.startTraining, (state, { exercise   }) => ({ ...state, training: { exercise: exercise, now: true} })),
   on(actions.stopTraining,  (state)                 => ({ ...state, training:  {exercise: {} as Exercise, now: false}  })),
   // on(actions.isTraining,    (state, { goTraining }) => ({ ...state, isTraining: goTraining })),

);
