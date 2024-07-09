import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Subject, map, Subscription } from 'rxjs';

import { Exercise } from "./exercise.module";
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';

import * as actions from '../app.actions';
import * as actionsTraining from './training.actions';

@Injectable()
export class TrainingService {

   // exerciseChanged = new Subject<Exercise>();
   // exercisesChanged = new Subject<Exercise[]>();
   // finishedExercisesChanged = new Subject<Exercise[]>();

   /*availableExercises: Exercise[] = [
       { id: '1', category: 'crunches',    name: 'Crunches',    duration: 30,  calories: 8},
       { id: '2', category: 'touch-toes',  name: 'Touch Toes',  duration: 180, calories: 15},
       { id: '3', category: 'side-lunges', name: 'Side Lunges', duration: 120, calories: 18},
       { id: '4', category: 'burpees',     name: 'Burpees',     duration: 60,  calories: 8},
   ];*/
   // availableExercises: Exercise[] = [];
   //availableExercises!: Observable<Exercise[]>;

   // private EMPTY: Exercise = { id: '0', category: '', name: '', duration: 0, calories: 0 };
   // private runningExercise: any;
   private fbSubscriptions: Subscription[] = [];


   constructor(
      private fdb: AngularFirestore,
      private store: Store<AppState>) {

   }

   fetchAvailableExercises(): void {
      console.log('fetchAvailableExcercises');

      this.store.dispatch(actions.startLoading());

      this.fbSubscriptions.push(

         this.fdb.collection<Exercise>('availableExercises')
            .snapshotChanges()
            .pipe(
               map(docArray => docArray.map(a => {
                  const { category, name, duration, calories } = a.payload.doc.data();
                  return {
                     id: a.payload.doc.id,
                     category: category,
                     name: name,
                     duration: duration,
                     calories: calories,
                  }
               }))
            )
            .subscribe((exercises: Exercise[]) => {

               console.log({ exercises });


               this.store.dispatch(actions.stopLoading());

               this.store.dispatch(actionsTraining.setAvailable({ availables: exercises }));

               // this.availableExercises = exercises;
               // this.exercisesChanged.next([...this.availableExercises]);

               //console.log(this.availableExercises);
            },
               error => {
                  this.store.dispatch(actions.stopLoading());

               })

      );
   }

   startExercise(exercise: Exercise): void {
      //console.log(id);
      this.store.dispatch(actionsTraining.startTraining({ exercise: exercise }));


      // this.runningExercise = this.availableExercises.find((ex) => ex.id === id);

      // this.exerciseChanged.next({ ...this.runningExercise });
   }

   completeExercise(): void {
      // this.store.select('training').subscribe(({ activeTraining }) => {
      //    // console.log({ exercise: activeTraining });

      //    this.add({
      //       ...activeTraining,
      //       date: new Date(),
      //       state: 'completed'
      //    });

      //    this.store.dispatch(actionsTraining.stopTraining());
      // });


      // this.runningExercise = this.EMPTY;
      // this.exerciseChanged.next(this.EMPTY);
   }

   cancelExercise(progress: number): void {
      // this.store.select('training').subscribe(({ activeTraining }) => {
      //    this.add({
      //       ...activeTraining,
      //       duration: activeTraining.duration * (progress / 100),
      //       calories: activeTraining.calories * (progress / 100),
      //       date: new Date(),
      //       state: 'cancelled',
      //    });

      //    this.store.dispatch(actionsTraining.stopTraining());
      // });

      // this.runningExercise = this.EMPTY;
      // this.exerciseChanged.next(this.EMPTY);
   }

   // getRunninExercise(): Exercise {
   //    return { ...this.runningExercise };
   // }

   public fetchCompletedOrCancelledExercises() {
      //return this.exercises;
      this.fbSubscriptions.push(

         this.fdb.collection<Exercise>('finishedExercises')
            .valueChanges()
            .subscribe((exercises: Exercise[]) => {
               // this.finishedExercisesChanged.next(exercises);
               this.store.dispatch(actionsTraining.setFinished({ finisheds: exercises }))
            })

      );
   }

   private async add(exercise: Exercise) {
      await this.fdb.collection('finishedExercises').add(exercise);
   }

   cancelSubscriptions(): void {
      this.fbSubscriptions.forEach((item) => item.unsubscribe());
   }

}
