import { Subscription } from 'rxjs';

import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-sideleft',
  templateUrl: './sideleft.component.html',
  styleUrls: ['./sideleft.component.css']
})
export class SideleftComponent implements OnInit, OnDestroy {
  @Output() closeToggle = new EventEmitter<void>();

  isAuth : boolean = false;
  authSubscription: Subscription = Subscription.EMPTY;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.authChange.subscribe( (authStatus) => {
      this.isAuth = authStatus;

      //console.log(authStatus);
    })
  }

  ngOnDestroy(): void {
    this.authSubscription.unsubscribe();
  }

  onCloseToggle(): void {
    this.closeToggle.emit();
  }

  onLogout(): void {
    this.authService.logout();
    this.onCloseToggle();
  }

}
