import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store'

import { AuthData } from "./auth-data.model";
import { User } from "./user.model";
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth'
import { TrainingService } from '../training/training.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UIService } from '../share/ui.service';
import * as actions from '../app.actions';
import { AppState } from '../app.reducer';
import * as actionsAuth from './auth.actions';

@Injectable()
export class AuthService {
   authChange = new Subject<boolean>();
   private isAuthenticated: boolean = false;

   private empty = {
      id: 0,
      email: 'noreply@zerojumpone.mx'
   }

   private user: User = this.empty;

   constructor(
      private router: Router,
      private fbAuth: AngularFireAuth,
      private trainingServices: TrainingService,
      private snackbar: MatSnackBar,
      private uiServices: UIService,
      private store: Store<AppState>) {

   }

   initAuthListener(): void {
      console.log('initAuthListener');

      this.fbAuth.authState.subscribe((user) => {
         /* Salir de programa y no se ejecuta las siguientes lineas de código */
         if (!user) {
            this.user = this.empty;
            this.trainingServices.cancelSubscriptions();
            this.store.dispatch(actionsAuth.setUnAuth());
            this.router.navigate(['/login']);
            //this.authChange.next(false);
            //this.isAuthenticated = false;
            return;
         };

         // this.isAuthenticated = true;
         // this.authChange.next(true);
         this.store.dispatch(actionsAuth.setAuth());
         this.router.navigate(['/training']);
      });
   }

   registerUser(authData: AuthData): void {
      //this.uiServices.loadingStateChange.next(true);
      this.store.dispatch(actions.startLoading());

      this.fbAuth.createUserWithEmailAndPassword(authData.email, authData.password)
         .then((result) => {
            //this.uiServices.loadingStateChange.next(false);
            //this.store.dispatch({ type: 'STOP_LOADING' });
            this.store.dispatch(actions.stopLoading());

            //console.log(result);
            //this.authSuccessfully();
         })
         .catch((error) => {
            //this.store.dispatch({ type: 'STOP_LOADING' });
            this.store.dispatch(actions.stopLoading());
            //this.uiServices.loadingStateChange.next(false);
            this.uiServices.showSnackbar(error.message, '', 3000);
            //console.log(error.message);
         })

      /*this.user = {
          id: Math.round(Math.random() * 10000),
          email: authData.email
      };*/

   }

   login(authData: AuthData): void {
      //this.uiServices.loadingStateChange.next(true);
      //this.store.dispatch({ type: 'START_LOADING' });
      const { email, password } = authData;


      this.store.dispatch(actions.startLoading());

      //   console.log('auth data:', authData);

      this.fbAuth.signInWithEmailAndPassword(email, password)
         .then((result) => {
            //this.uiServices.loadingStateChange.next(false);
            //this.store.dispatch({ type: 'STOP_LOADING' });
            this.store.dispatch(actions.stopLoading());
            //console.log(result);
            this.authSuccessfully();
         })
         .catch((error) => {
            //this.uiServices.loadingStateChange.next(false);
            //this.store.dispatch({ type: 'STOP_LOADING' });
            this.store.dispatch(actions.stopLoading());
            this.uiServices.showSnackbar(error.message, '', 3000);
            //console.log(error);
         });

      /*this.user = {
          id: Math.round(Math.random() * 10000),
          email: authData.email
      };

      this.authChange.next(true);
      this.router.navigate(['/training']);*/
   }

   logout(): void {
      this.fbAuth.signOut();
      /*this.trainingServices.cancelSubscriptions();

      this.user = this.empty;

      this.authChange.next(false);
      this.router.navigate(['/login']);

      this.isAuthenticated = false;*/
   }

   /*getUser(): User {
       return { ...this.user };
   }*/

   isAuth() {
      //return this.user.id !== 0;
      return this.isAuthenticated;
   }

   authSuccessfully(): void {
      this.isAuthenticated = true;

      this.authChange.next(true);
      this.router.navigate(['/training']);
   }

}
