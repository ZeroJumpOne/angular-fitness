import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {

  title = 'fitness-tracker';
  openSidenav = false;

  constructor(private authServices: AuthService) {

  }

  ngOnInit(): void {
    this.authServices.initAuthListener();
  }

  ngOnDestroy(): void {

  }

  onToogle(): void {


  }
}
