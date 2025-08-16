import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    RouterModule
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegistrationComponent implements OnInit {
  registrationForm: FormGroup;
  errorMessage = '';
  successMessage = '';
  loading = true; // hide form until auth check

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.registrationForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    });

    this.registrationForm.valueChanges.subscribe(() => {
      this.errorMessage = '';
      this.successMessage = '';
    });
  }

  ngOnInit(): void {
    // redirect logged-in users immediately
    if (this.authService.getAuthStatus()) {
      this.router.navigate(['/movies']);
    } else {
      this.loading = false; // allow form to render
    }
  }

  onSubmit() {
    if (this.registrationForm.valid) {
      const { username, password, confirmPassword } = this.registrationForm.value;

      if (password !== confirmPassword) {
        this.errorMessage = 'Passwords do not match';
        return;
      }

      const result = this.authService.register(username, password);
      if (!result.success) {
        this.errorMessage = result.message;
      } else {
        this.successMessage = result.message;
        this.router.navigate(['/movies']); // auto-login after registration
      }
    } else {
      this.errorMessage = 'Please fill all required fields';
    }
  }
}
