import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email = '';
  password = '';

  constructor(private authService: AuthService, private router: Router) {}

  onLogin() {
    this.authService.login(this.email, this.password).subscribe(() => {
      this.router.navigate(['/home']);
    });
  }
}


// credentials = {
//   email: '',
//   password: ''
// };
// error = '';

// constructor(private authService: AuthService, private router: Router) {}

// login() {
//   this.authService.login(this.credentials).subscribe(
//     () => {
//       this.router.navigateByUrl('/dashboard');  // Redirect to dashboard after successful login
//     },
//     (err: any) => {
//       this.error = err.error.message;  // Display error message
//     }
//   );
// }
