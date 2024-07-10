import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TrainingService } from '../training.service';

import { StopTrainingComponent } from './stop-training.component';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { Exercise } from '../exercise.module';

@Component({
   selector: 'app-current-training',
   templateUrl: './current-training.component.html',
   styleUrls: ['./current-training.component.css']
})
export class CurrentTrainingComponent implements OnInit {

   progress: number = 0;
   timer: any = 0;
   goingTraining: Exercise = {} as Exercise;
   isTraining: boolean = false;

   constructor(
      private dialog: MatDialog, private trainingService: TrainingService,
      private store: Store<AppState>,
   ) { }

   ngOnInit(): void {
      console.log('currentTraining');
      this.store.select('training').subscribe(({ training }) => {
         const { exercise, now } = training;
         this.goingTraining = exercise;
         this.isTraining = now;
      });

      this.startOrResumeTimer();
   }

   public startOrResumeTimer(): void {
      if(!this.isTraining) return; /* Si no esta en entrenamiento, no continua */

      //console.log(step);
      const step = (this.goingTraining.duration / 100) * 1000;

      this.timer = setInterval(() => {
         this.progress = this.progress + 1;

         if (this.progress >= 100) {
            this.trainingService.completeExercise(this.goingTraining);
            clearInterval(this.timer);
         }
      }, step);
   }

   onStop(): void {
      clearInterval(this.timer);

      const dialogRef = this.dialog.open(StopTrainingComponent, { data: { progress: this.progress } });

      dialogRef.afterClosed().subscribe((result) => {

         if (result) {
            //this.trainingExit.emit();
            this.trainingService.cancelExercise(this.progress, this.goingTraining);
         } else {
            this.startOrResumeTimer();
         }

         //console.log(result);
      });


   }

}
