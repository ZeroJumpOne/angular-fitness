import { DataRowOutlet } from '@angular/cdk/table';
import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { filter, Subscription } from 'rxjs';
import { Exercise } from '../exercise.module';
import { TrainingService } from '../training.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';


@Component({
   selector: 'app-past-training',
   templateUrl: './past-training.component.html',
   styleUrls: ['./past-training.component.css']
})
export class PastTrainingComponent implements OnInit, OnDestroy, AfterViewInit {

   displayedColumns = ['date', 'name', 'duration', 'calories', 'state'];
   dsExercises = new MatTableDataSource<Exercise>();

   private finishedExercisesSubscription?: Subscription;

   @ViewChild(MatSort) sort!: MatSort;
   @ViewChild(MatPaginator) paginator!: MatPaginator;

   constructor(
      private trainingServices: TrainingService,
      private store: Store<AppState>,
   ) { }

   ngOnInit(): void {
      this.store.select('training').subscribe(({ finishedExcercises }) => {
         this.dsExercises.data = finishedExcercises;
      });


      // this.exChangedSubscription = this.trainingServices.finishedExercisesChanged.subscribe((exercises: Exercise[]) => {
      //    this.dsExercises.data = exercises;
      // });
      this.trainingServices.fetchCompletedOrCancelledExercises();
   }

   ngOnDestroy(): void {
      this.finishedExercisesSubscription?.unsubscribe();
   }

   ngAfterViewInit(): void {
      this.dsExercises.sort = this.sort;
      this.dsExercises.paginator = this.paginator;
   }

   doFilter(filterValue: string = ''): void {
      this.dsExercises.filter = filterValue.trim().toLowerCase();
   }

}
