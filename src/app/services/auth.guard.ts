import { CanActivateFn, Router, RouterLink, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';


export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const authService = inject(AuthService);
  const toastr = inject(ToastrService)
  const router = inject(Router)
  const loginState = authService.loginState
  if (loginState){
    console.log('access granted');
    return true
  }else{
    toastr.warning("You Don't Have Access")
    router.navigate(['/login'])
    return false
  }
};

// @Injectable({
//   providedIn: 'root',
// })
// export class authGuard {
//   loginState: boolean = false;

//   constructor(private authsrvs: AuthService,
//               private router : Router) {
//     this.loginState = this.authsrvs.loginState;
//   }

//   canActivate() {
//    if (this.loginState){
//     console.log('access granted');
//         return true
//       }else{
//         console.log('access denied');
//         this.router.navigate(['/login'])
//         return false
//       }
      
      
// }

// }


