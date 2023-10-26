import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  email:string
  state$:Observable<boolean>

  constructor(private AuthService: AuthService) {
    this.AuthService.getUserEmail().subscribe((email) => {
      this.email = email;
    });

    this.state$ = this.AuthService.logState();
  }

  ngOnInit(): void {
    // this.email = JSON.parse(localStorage.getItem('user')).email
    // this.logState$=this.AuthService.logState()
  }

  onLogout() {
    // localStorage.removeItem('user')
    this.AuthService.logOut();
  }
}
