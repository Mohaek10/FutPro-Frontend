import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatFormField, MatInput, MatLabel} from "@angular/material/input";
import {MatSnackBar} from "@angular/material/snack-bar";
import {User} from "../../../shared/models/user.models";
import {UserService} from "../../../core/services/user.service";
import {MatButton} from "@angular/material/button";
import {NgIf} from "@angular/common";
import {MatError} from "@angular/material/form-field";
import {NoWhitespaceValidator} from "../../auth/register/register.component";

@Component({
  selector: 'app-ver-perfil',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatInput,
    MatLabel,
    MatFormField,
    MatButton,
    NgIf,
    MatLabel,
    MatError
  ],
  templateUrl: './ver-perfil.component.html',
  styleUrl: './ver-perfil.component.css'
})
export class VerPerfilComponent implements OnInit {
  profileForm: FormGroup;
  user: User | null = null;


  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private snackBar: MatSnackBar
  ) {
    this.profileForm = this.fb.group({
      email: [{value: '', disabled: true}],
      first_name: ['', [Validators.required, Validators.minLength(3), NoWhitespaceValidator()]],
      last_name: ['', [Validators.required, Validators.minLength(3), NoWhitespaceValidator()]],
      phone_number: ['', [Validators.required, Validators.pattern(/^[0-9]{9}$/)]],
      username: [{value: '', disabled: true}],
      futcoins: [{value: '', disabled: true}],
      date_joined: [{value: '', disabled: true}],
      last_login: [{value: '', disabled: true}],
    });
  }

  ngOnInit(): void {
    this.userService.getUserProfile().subscribe({
      next: (user: User) => {
        this.profileForm.patchValue(user);
        this.user = user;
      },
      error: (err) => {
        this.snackBar.open('Error al cargar el perfil del usuario.', 'Cerrar', {duration: 5000});
      }
    });
  }

  onSubmit(): void {
    if (this.profileForm.valid) {
      const updatedData = {
        first_name: this.profileForm.get('first_name')?.value,
        last_name: this.profileForm.get('last_name')?.value,
        phone_number: this.profileForm.get('phone_number')?.value,
      };
      this.userService.updateUserProfile(updatedData).subscribe({
        next: (user: User) => {
          this.snackBar.open('Perfil actualizado exitosamente.', 'Cerrar', {duration: 5000});
        },
        error: (err) => {
          this.snackBar.open('Error al actualizar el perfil.', 'Cerrar', {duration: 5000});
        }
      });
    }
  }

}
