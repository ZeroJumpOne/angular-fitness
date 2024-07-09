import { createAction, props } from '@ngrx/store';
import { Exercise } from './exercise.module';

export const setAvailable  = createAction('[Training] Set Available', props<{ availables: Exercise[] }>());
export const setFinished   = createAction('[Training] Set Finished', props<{ finisheds: Exercise[] }>());
export const startTraining = createAction('[Training] Start', props<{ exercise: Exercise }>());
export const stopTraining  = createAction('[Training] Stop');
export const setIsTraining = createAction('[Training] Is training?', props<{ training: boolean }>());
