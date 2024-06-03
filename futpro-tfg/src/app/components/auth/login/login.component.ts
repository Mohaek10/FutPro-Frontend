// src/app/auth/login/login.component.ts
import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../auth.service';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Account} from "../../../models/account.model";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {
  }

  onSubmit() {
    this.authService.login(this.email, this.password).subscribe(
      response => {
        this.router.navigate(['/']);
      },
      error => {
        console.error('Login failed', error);
      }
    );
  }
}
