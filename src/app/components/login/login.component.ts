import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  imports: [ButtonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor(private authSvc: AuthService) {}

  loginWithGoogle() {
    this.authSvc.login();
  }
}
