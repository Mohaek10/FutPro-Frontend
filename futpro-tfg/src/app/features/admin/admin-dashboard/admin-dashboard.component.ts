import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {MatButton} from "@angular/material/button";
import {FooterComponent} from "../../../layout/footer/footer.component";

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [
    MatButton,
    FooterComponent
  ],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent {
  constructor(private router: Router) {
  }

  navigateTo(section: string): void {
    this.router.navigate([`/admin/${section}`]);
  }
}
