import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms'
import { TitleStrategy } from '@angular/router';
import { UIService } from 'src/app/share/ui.service';
import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';

@Component({
   selector: 'app-signup',
   templateUrl: './signup.component.html',
   styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, OnDestroy {

   loading: boolean = false;
   private loadingSubscription!: Subscription;
   public maxDate = new Date();

   constructor(private authService: AuthService,
      private uiService: UIService,
      private store: Store<AppState>) {
   }

   ngOnInit(): void {
      //this.loadingSubscription = this.uiService.loadingStateChange.subscribe( (loading) => this.isloading = loading );
      this.loadingSubscription = this.store.select('ui').subscribe(({ isLoading }) => {
         this.loading = isLoading;
      });


      this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
      //console.log(this.maxDate);
      //console.log('ngInit signup');
   }

   ngOnDestroy(): void {
      this.loadingSubscription?.unsubscribe();
      // if (this.loadingSubscription) {
      //   this.loadingSubscription.unsubscribe();
      // }
   }

   onSubmit(form: NgForm): void {
      const { email, password } = form.value;
      //console.log(form);

      this.authService.registerUser({
         email: email,
         password: password
      });

   }

}
