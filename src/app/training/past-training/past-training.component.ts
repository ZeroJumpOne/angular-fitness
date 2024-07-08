import { DataRowOutlet } from '@angular/cdk/table';
import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { filter, Subscription } from 'rxjs';
import { Exercise } from '../exercise.module';
import { TrainingService } from '../training.service';

@Component({
  selector: 'app-past-training',
  templateUrl: './past-training.component.html',
  styleUrls: ['./past-training.component.css']
})
export class PastTrainingComponent implements OnInit, OnDestroy, AfterViewInit {

  displayedColumns = ['date', 'name', 'duration', 'calories', 'state'];
  dsExercises = new MatTableDataSource<Exercise>();
  private exChangedSubscription!: Subscription;

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private trainingServices: TrainingService) { 

  }

  ngOnInit(): void {
    this.exChangedSubscription = this.trainingServices.finishedExercisesChanged.subscribe( (exercises: Exercise[]) => {
        this.dsExercises.data = exercises;
        //console.log('recibo en past-training',exercises);
    });
    this.trainingServices.fetchCompletedOrCancelledExercises();    
    //this.dsExercises.data = this.trainingServices.getCompletedOrCancelledExercises();    
  }

  ngOnDestroy(): void {
    if (this.exChangedSubscription) {
      this.exChangedSubscription.unsubscribe();
    }
  }

  ngAfterViewInit(): void {
    this.dsExercises.sort = this.sort;
    this.dsExercises.paginator = this.paginator;
  }

  doFilter(filterValue: string = ''): void {
    this.dsExercises.filter = filterValue.trim().toLowerCase();
  }

}
