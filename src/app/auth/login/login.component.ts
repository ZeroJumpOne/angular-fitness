import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms'
import { Subscription, Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { AuthService } from '../auth.service';
import { UIService } from 'src/app/share/ui.service';
import { AppState } from 'src/app/app.reducer';

@Component({
   selector: 'app-login',
   templateUrl: './login.component.html',
   styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
   loginForm!: FormGroup;
   loading: boolean = false;
   private loadingSubs!: Subscription;

   constructor(private authService: AuthService,
      private uiService: UIService,
      private store: Store<AppState>) { }

   ngOnInit(): void {
      this.loadingSubs = this.store.select('ui').subscribe(({ isLoading }) => {
         //console.log(isLoading);
         this.loading = isLoading;
      })
      //this.isLoading$ = this.store.map( state => state.ui.isLoading );
      //this.loadingSubs = this.uiService.loadingStateChange.subscribe( (loading) => this.isLoading = loading );
      this.loginForm = new FormGroup({
         email: new FormControl('', { validators: [Validators.required, Validators.email] }),
         password: new FormControl('', { validators: [Validators.required, Validators.minLength(6)] }),
      });
   }

   ngOnDestroy(): void {
      this.loadingSubs?.unsubscribe();
      /*if (this.loadingSubs){
        this.loadingSubs.unsubscribe();
      }*/
   }

   onSubmit(form: NgForm): void {
      const {email, password } = form.value;

      this.authService.login({
         email: email,
         password: password

      });
      //console.log(form);
   }

}
