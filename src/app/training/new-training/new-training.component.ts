import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Exercise } from '../exercise.module';
import { TrainingService } from '../training.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit, OnDestroy {
    @Output() startTraining = new EventEmitter<void>();
  
    //exercises!: Observable<Exercise[]>;
    exercises!: Exercise[];
    exercisesSubscription!: Subscription;
  
    constructor(private trainingService: TrainingService) {
        
    }

    ngOnInit(): void {
        this.exercisesSubscription = this.trainingService.exercisesChanged.subscribe( (exercises) => this.exercises = exercises );
        this.trainingService.fetchAvailableExercises();
      
        //console.log(this.exercises);
    }

    ngOnDestroy(): void {
        if (this.exercisesSubscription){
            this.exercisesSubscription.unsubscribe();
        }        
    }
  
    onStartTraining(form: NgForm) : void {
        //this.startTraining.emit();
        this.trainingService.startExercise(form.value.exercise);
        //console.log(form);
    }
}
