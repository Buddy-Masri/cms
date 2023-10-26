import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  email: string = '';
  password: string = '';

  loginButton;

  constructor(private auth: AuthService) {}

  async registerUser(form) {
    this.email = form.value.email;
    this.password = form.value.password;
    if (this.email) {
      this.email.trim() === '' || this.password.trim() === '';
    } else {
      return;
    }
    this.auth.registerWithEmailAndPassword(this.email, this.password);
    form.reset();
  }
}
