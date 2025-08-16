import { CommonModule } from "@angular/common";
import { AuthService } from "../services/auth.service";
import { RouterModule } from "@angular/router";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { FormsModule } from "@angular/forms";
import { Component } from "@angular/core";
import { MatMenuModule } from "@angular/material/menu";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    FormsModule,
    MatMenuModule
  ],
   templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  styles: [`
    .mat-mdc-form-field-subscript-wrapper, .mat-mdc-form-field-bottom-align::before{
    height: 0 !important;
    line-height: 0 !important;
  }
  `],
})
export class HeaderComponent {
  searchTerm: string = '';

  constructor(public authService: AuthService) { }

  logout() {
    this.authService.logout();
  }

  onSearch() {
    if (this.searchTerm.trim()) {
      // Replace this with your search logic or navigation
      console.log('Search for:', this.searchTerm);
    }
  }
}
