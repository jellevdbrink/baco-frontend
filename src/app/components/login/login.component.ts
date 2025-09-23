import { Component, inject } from '@angular/core';
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { FloatLabel } from 'primeng/floatlabel';
import { PasswordModule } from 'primeng/password';
import { InputTextModule } from 'primeng/inputtext';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login',
  imports: [
    CardModule,
    ButtonModule,
    ReactiveFormsModule,
    PasswordModule,
    FloatLabel,
    InputTextModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class Login {
  private fb = inject(NonNullableFormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);
  private messageService = inject(MessageService);

  protected loginForm = this.fb.group({
    username: this.fb.control('', [Validators.required]),
    password: this.fb.control('', [Validators.required]),
  });

  protected login(): void {
    if (this.loginForm.invalid) return;
    const value = this.loginForm.getRawValue();

    this.authService.login(value.username, value.password).subscribe({
      next: (response) => {
        this.router.navigate(['/products']);
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
        this.messageService.add({
          summary: `Error ${error.status}`,
          detail: error.error.non_field_errors[0],
          severity: 'error',
        });
      },
    });
  }
}
