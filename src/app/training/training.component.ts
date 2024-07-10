import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { TrainingService } from './training.service';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';

@Component({
   selector: 'app-training',
   templateUrl: './training.component.html',
   styleUrls: ['./training.component.css']
})

export class TrainingComponent implements OnInit, OnDestroy {

   onGoingTraining: boolean = false;
   //exerciseSubscription: Subscription = Subscription.EMPTY;
   //   exerciseSubscription!: Subscription;
   trainingSubscription?: Subscription;

   constructor(
      private trainingService: TrainingService,
      private store: Store<AppState>) { }

   ngOnInit(): void {
      this.trainingSubscription = this.store.select('training').subscribe(({ training }) => {
         // console.log({training});
         const { now } = training;

         this.onGoingTraining = now;
      })

      // load available exercises.
      this.trainingService.fetchAvailableExercises();


      //  this.exerciseSubscription = this.trainingService.exerciseChanged.subscribe( (exercise) => {

      //    if (exercise.category !== '') {
      //      this.ongoingTraining = true;
      //    } else {
      //      this.ongoingTraining = false;
      //    }
      //  });
   }

   ngOnDestroy(): void {
      this.trainingSubscription?.unsubscribe();
      // this.exerciseSubscription?.unsubscribe();
      // if (this.exerciseSubscription) {
      //   this.exerciseSubscription.unsubscribe();
      // }
   }

   onStart(): void {
      // this.onGoingTraining = true;
   }

   onStopTraining(): void {
      // this.onGoingTraining = false;
   }

}
