import { NgModule } from '@angular/core';

import { TrainingComponent } from './training.component';
import { CurrentTrainingComponent } from './current-training/current-training.component';
import { NewTrainingComponent } from './new-training/new-training.component';
import { PastTrainingComponent } from './past-training/past-training.component';
import { StopTrainingComponent } from './current-training/stop-training.component';
import { SharedModule } from '../share/shared.module';
import { TrainingRouterModule } from './training-routing.module';

@NgModule({
    declarations: [
        TrainingComponent,
        CurrentTrainingComponent,
        NewTrainingComponent,
        PastTrainingComponent,
        StopTrainingComponent
    ],
    imports: [
        SharedModule,
        TrainingRouterModule
    ],
    exports: [        
    ],
    entryComponents: [StopTrainingComponent]
})

export class TrainingModule {

}