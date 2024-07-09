import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Exercise } from '../exercise.module';
import { TrainingService } from '../training.service';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';

@Component({
   selector: 'app-new-training',
   templateUrl: './new-training.component.html',
   styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit, OnDestroy {
   @Output() startTraining = new EventEmitter<void>();

   //exercises!: Observable<Exercise[]>;
   exercises!: Exercise[];
   isLoading: boolean = false;

   // exercisesSubscription!: Subscription;
   isLoadingSubscription?: Subscription;
   availableExercisesSubscription?: Subscription;

   constructor(
      private trainingService: TrainingService,
      private store: Store<AppState>,
   ) { }

   ngOnInit(): void {

      this.isLoadingSubscription = this.store.select('ui').subscribe(({ isLoading }) => {
         this.isLoading = isLoading;
      });

      this.availableExercisesSubscription = this.store.select('training').subscribe(({ availableExercises }) => {
         console.log('subscription to availableExercises');
         // console.log({availableExercises});
         this.exercises = availableExercises;
         // console.log(this.exercises);
      });


      //   this.exercisesSubscription = this.trainingService.exercisesChanged.subscribe( (exercises) => this.exercises = exercises );

      // Load selecting exercises
      this.trainingService.fetchAvailableExercises();

      //console.log(this.exercises);
   }

   ngOnDestroy(): void {
      this.isLoadingSubscription?.unsubscribe();
      this.availableExercisesSubscription?.unsubscribe();

      // if (this.exercisesSubscription) {
      //    this.exercisesSubscription.unsubscribe();
      // }
   }

   onStartTraining(form: NgForm): void {
      //this.startTraining.emit();
      // console.log('Exercise', form.value.exercise);
      this.trainingService.startExercise(form.value.exercise);
   }
}
