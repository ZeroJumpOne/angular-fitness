import { Subscription } from 'rxjs';

import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Output() openToggle = new EventEmitter<void>();

  isAuth: boolean = false;
  authSubscription: Subscription = Subscription.EMPTY;

  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
    this.authService.authChange.subscribe( (authStatus) => {
       //console.log(authStatus);
      this.isAuth = authStatus;
    });
  }

  ngOnDestroy(): void {
    this.authSubscription.unsubscribe();
  }

  onOpenToggle() {
    this.openToggle.emit();
  }

  onLogout() : void {
    this.authService.logout();
  }
}
