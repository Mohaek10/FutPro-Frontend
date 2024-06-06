import {Component} from '@angular/core';
import {AuthService} from "../../../core/services/auth.service";
import {Router} from "@angular/router";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  username: string = '';
  email: string = '';
  first_name: string = '';
  last_name: string = '';
  phone_number: string = '';
  password: string = '';
  password2: string = '';

  constructor(private authService: AuthService, private router: Router) {
  }

  onSubmit(): void {
    const user = {
      username: this.username,
      email: this.email,
      first_name: this.first_name,
      last_name: this.last_name,
      phone_number: this.phone_number,
      password: this.password,
      password2: this.password2
    };

    this.authService.register(user).subscribe({
      next: () => this.router.navigate(['/']),
      error: err => console.error('Error en el registro', err)
    });
  }
}


