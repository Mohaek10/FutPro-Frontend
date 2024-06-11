import {AfterViewInit, Component, OnInit} from '@angular/core';
import {HeaderComponent} from "../../layout/header/header.component";
import {FooterComponent} from "../../layout/footer/footer.component";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [HeaderComponent, FooterComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit, AfterViewInit {

  constructor() {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    const video: HTMLVideoElement = document.getElementById('background-video') as HTMLVideoElement;
    if (video) {
      video.muted = true;
      video.play().catch(error => {
        console.error('Error al reproducir el video:', error);
      });
    }
  }
}
