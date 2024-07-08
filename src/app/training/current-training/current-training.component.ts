import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TrainingService } from '../training.service';

import { StopTrainingComponent } from './stop-training.component';

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.css']
})
export class CurrentTrainingComponent implements OnInit {

  progress : number = 0;
  timer : any;

  constructor(private dialog : MatDialog, private trainingService: TrainingService) {

  }

  ngOnInit(): void {
    this.startOrResumeTimer();
  }

  startOrResumeTimer() : void {
    const step = (this.trainingService.getRunninExercise().duration / 100) * 1000;
    //console.log(step);

    this.timer = setInterval(() => {
      this.progress = this.progress + 1;

      if (this.progress >= 100) {
        this.trainingService.completeExercise();

        clearInterval(this.timer);
      }

      //console.log(this.progress);
    }, step);
  }

  onStop() : void {
    clearInterval(this.timer);
    const dialogRef = this.dialog.open(StopTrainingComponent, { data: { progress: this.progress } });

    dialogRef.afterClosed().subscribe( (result) => {
      if (result) {
        //this.trainingExit.emit();
        this.trainingService.cancelExercise(this.progress);
      } else {
        this.startOrResumeTimer();
      }

      //console.log(result);
    });


  }

}
