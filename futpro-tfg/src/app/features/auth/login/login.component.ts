import {Component} from '@angular/core';
import {AuthService} from "../../../core/services/auth.service";
import {Router} from "@angular/router";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {
  }

  onSubmit(): void {
    this.authService.login(this.email, this.password).subscribe({
      next: () => this.router.navigate(['/']),
      error: err => console.error('Login failed', err)
    });
  }


}
