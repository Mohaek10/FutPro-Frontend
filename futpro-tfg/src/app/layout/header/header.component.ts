import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
    const listItem = document.querySelectorAll("#landing-header li");
    const menuBackDrop = document.querySelector("#menu-backdrop") as HTMLElement;

    listItem.forEach((item) => {
      item.addEventListener("mouseenter", () => {
        const {left, top, width, height} = item.getBoundingClientRect();

        menuBackDrop.style.setProperty("--left", `${left}px`);
        menuBackDrop.style.setProperty("--top", `${top}px`);
        menuBackDrop.style.setProperty("--width", `${width}px`);
        menuBackDrop.style.setProperty("--height", `${height}px`);

        menuBackDrop.style.opacity = "1";
        menuBackDrop.style.visibility = "visible";
      });

      item.addEventListener("mouseleave", () => {
        menuBackDrop.style.opacity = "0";
        menuBackDrop.style.visibility = "hidden";
      });
    });

    const headerEl = document.querySelector("#landing-header") as HTMLElement;

    const observerOptions = {
      root: null,
      rootMargin: "0px", // en cuanto se vea el elemento
      threshold: 0.9, // porcentaje de visibilidad
    };

// Verifica si el elemento esta en el viewport o no
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const {isIntersecting} = entry;
        if (isIntersecting) {
          const color = entry.target.getAttribute("data-header-color");
          // @ts-ignore
          headerEl.style.color = color;
        }
      });
    }, observerOptions);

    const sectionElements = document.querySelectorAll(".landing-section");
    sectionElements.forEach((section) => observer.observe(section));
  }
}
