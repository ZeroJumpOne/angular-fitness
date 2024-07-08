import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { MaterialModule } from './material.module';

import { AppComponent } from './app.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { AppRoutingModule } from './app-routing.module';
import { HeaderComponent } from './navigation/header/header.component';
import { SideleftComponent } from './navigation/sideleft/sideleft.component';
import { AuthService } from './auth/auth.service';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { TrainingService } from './training/training.service';
import { environment } from 'src/environments/environment';
import { UIService } from './share/ui.service';
import { AuthModule } from './auth/auth.module';
import { StoreModule } from '@ngrx/store';
import { appReducers } from './app.reducer';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    HeaderComponent,
    SideleftComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    AppRoutingModule,
    FlexLayoutModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase, 'fitness'),
    AngularFirestoreModule,
    AuthModule,
    StoreModule.forRoot( appReducers ),
  ],
  providers: [AuthService, TrainingService, UIService],
  bootstrap: [AppComponent],
  entryComponents: []
})
export class AppModule { }
