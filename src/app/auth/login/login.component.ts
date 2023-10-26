import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  state: boolean = false;
  email;

  constructor(private loginAuth: AuthService, private toastr: ToastrService) {
    this.state = this.loginAuth.loginState;

    this.loginAuth.getUserEmail().subscribe((value) => {
      this.email = value;
    });
  }

  onLogin(data) {
    this.loginAuth.login(data.email, data.password);
    this.email = data.email;
  }

  onLogout() {
    this.state = false
    this.loginAuth.logOut();
  }
}
