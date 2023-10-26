import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { BehaviorSubject, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private afAuth: AngularFireAuth,
    private tstr: ToastrService,
    private router: Router
  ) {}

  loginState: boolean = false;

  logStatus: BehaviorSubject<boolean> = new BehaviorSubject(false);

  // async registerWithEmailAndPassword(email: string, password: string) {
  //   try {
  //     const userCredential = await this.afAuth.createUserWithEmailAndPassword(email, password);
  //     const user = userCredential.user;
  //     console.log('User registered:', user);
  //     return user;
  //   } catch (error) {
  //     console.error('Registration error:', error);
  //     throw error;
  //   }
  // }

  registerWithEmailAndPassword(email: string, password: string) {
    this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then((res) => {
        this.tstr.success('Email Registered Successfully')
        this.router.navigate(['/login'])
      })
      .catch((error) => {
        console.log(error);
        this.tstr.warning(error);
      });
  }

  login(email: string, password: string) {
    this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // console.log(userCredential.user.email);
        // this.getUserEmail();
        this.logStatus.next(true);
        this.router.navigate(['/dashboard']);
        this.loginState = true;
        this.tstr.success('Login Successful');
      })
      .catch((error) => {
        console.error(error);
        this.tstr.warning(error);
      });
  }

  getUserEmail() {
    return this.afAuth.authState.pipe(
      map((user) => (user ? user.email : null))
    );
  }

  // getUserEmail() {
  //   this.afAuth.authState.subscribe((user) => {
  //     localStorage.setItem('user', JSON.stringify(user));
  //   });
  // }

  logOut() {
    this.afAuth
      .signOut()
      .then(() => {
        this.tstr.success('Successfully Logged Out');
        this.loginState = false;
        this.logStatus.next(false);
        this.router.navigate(['/']);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  logState() {
    return this.logStatus.asObservable();
  }
}
