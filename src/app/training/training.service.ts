import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Subject, map, Subscription } from 'rxjs';

import { Exercise } from "./exercise.module";
import * as actions from '../app.actions';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';

@Injectable()
export class TrainingService {

    exerciseChanged = new Subject<Exercise>();
    exercisesChanged = new Subject<Exercise[]>();
    finishedExercisesChanged = new Subject<Exercise[]>();

    /*availableExercises: Exercise[] = [
        { id: '1', category: 'crunches',    name: 'Crunches',    duration: 30,  calories: 8},
        { id: '2', category: 'touch-toes',  name: 'Touch Toes',  duration: 180, calories: 15},
        { id: '3', category: 'side-lunges', name: 'Side Lunges', duration: 120, calories: 18},
        { id: '4', category: 'burpees',     name: 'Burpees',     duration: 60,  calories: 8},
    ];*/
    availableExercises: Exercise[] = [];
    //availableExercises!: Observable<Exercise[]>;

    private EMPTY : Exercise = { id: '0', category: '',    name: '',    duration: 0,  calories: 0};
    private runningExercise: any;
    private fbSubscriptions: Subscription[] = [];


    constructor(private fdb: AngularFirestore,
                private store: Store<AppState>) {

    }

    fetchAvailableExercises(): void {
        //return this.availableExercises.slice();

        this.store.dispatch( actions.startLoading() );
        
        this.fbSubscriptions.push(

        this.fdb.collection<Exercise>('availableExercises')
        .snapshotChanges()
        .pipe(
            map( doc => doc.map( a => {
                return {
                    id: a.payload.doc.id,
                    category: a.payload.doc.data().category,
                    name: a.payload.doc.data().name,
                    duration: a.payload.doc.data().duration,
                    calories: a.payload.doc.data().calories,
                }
            }))
        )
        .subscribe( (exercises: Exercise[]) => {

            this.store.dispatch( actions.stopLoading() );

            this.availableExercises = exercises;
            this.exercisesChanged.next([...this.availableExercises]);

            //console.log(this.availableExercises);
        },
        error => {
            this.store.dispatch( actions.stopLoading() );

        })

        );
    }

    startExercise(id: string) : void {
        //console.log(id);
        this.runningExercise = this.availableExercises.find( (ex) => ex.id === id );

        this.exerciseChanged.next({...this.runningExercise});
    }

    completeExercise(): void {
        //console.log('complete training');

        //this.exercises.push({ ...this.runningExercise, date: new Date(), state: 'completed' });
        this.add({ ...this.runningExercise, date: new Date(), state: 'completed' });

        this.runningExercise = this.EMPTY;
        this.exerciseChanged.next(this.EMPTY);
    }

    cancelExercise(progress : number): void {
        /*this.exercises.push({ ...this.runningExercise, 
                              duration: this.runningExercise.duration * (progress / 100), 
                              calories: this.runningExercise.calories * (progress / 100), 
                              date: new Date(), 
                              state: 'cancelled' });*/

        this.add({ ...this.runningExercise,
            duration: this.runningExercise.duration * (progress / 100), 
            calories: this.runningExercise.calories * (progress / 100), 
            date: new Date(),
            state: 'cancelled' });

        this.runningExercise = this.EMPTY;
        this.exerciseChanged.next(this.EMPTY);
    }

    getRunninExercise(): Exercise {
        return { ...this.runningExercise };
    }

    fetchCompletedOrCancelledExercises() {
        //return this.exercises;
        this.fbSubscriptions.push(

        this.fdb.collection<Exercise>('finishedExercises')
        .valueChanges()
        .subscribe( (exercises: Exercise[]) => {
            this.finishedExercisesChanged.next(exercises);
        })

        );
    }

    private add(exercise: Exercise): void {
        this.fdb.collection('finishedExercises').add(exercise);

    }

    cancelSubscriptions(): void {
        this.fbSubscriptions.forEach( (item) => item.unsubscribe() );
    }

}