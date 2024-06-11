import {Component} from '@angular/core';
import {FooterComponent} from "../../layout/footer/footer.component";

@Component({
  selector: 'app-notfound',
  standalone: true,
  imports: [
    FooterComponent
  ],
  templateUrl: './notfound.component.html',
  styleUrl: './notfound.component.css'
})
export class NotfoundComponent {

}
