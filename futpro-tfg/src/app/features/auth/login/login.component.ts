import {Component} from '@angular/core';
import {AuthService} from "../../../core/services/auth.service";
import {Router} from "@angular/router";
import {FormsModule} from "@angular/forms";
import Swal from 'sweetalert2'
import {FooterComponent} from "../../../layout/footer/footer.component";


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    FooterComponent
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
      next: () => {
        Swal.fire('Bienvenido', 'Has iniciado sesión correctamente', 'success');
        this.router.navigate(['/']);
      },
      error: err => {
        Swal.fire('Error',
          'Correo o contraseña incorrectos',
          'error');
        console.error(err);
      }
    });
  }


}
