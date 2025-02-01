import { Component } from '@angular/core';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  constructor(private authSvc: AuthService) {}

  logout() {
    this.authSvc.logout();
  }
}
