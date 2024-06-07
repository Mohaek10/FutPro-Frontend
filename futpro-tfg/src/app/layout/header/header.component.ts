import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {User} from "../../shared/models/user.models";
import {AuthService} from "../../core/services/auth.service";
import {AsyncPipe, NgIf} from "@angular/common";
import {FormatoNumeroPipe} from "../../shared/pipes/formato-numero.pipe";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    AsyncPipe,
    NgIf,
    FormatoNumeroPipe
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  usuarioActual: Observable<User | null>;
  verMenuPerfil: boolean = false;
  esAdmin: Observable<boolean>;


  constructor(private authService: AuthService) {
    this.usuarioActual = this.authService.usuarioActual;
    this.esAdmin = this.authService.isAdmin();
  }

  ngOnInit(): void {
    this.initMenuBackDrop();
    this.initIntersectionObserver();
    this.initMobileMenu();
  }

  initMenuBackDrop(): void {
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
  }

  initIntersectionObserver(): void {
    const headerEl = document.querySelector("#landing-header") as HTMLElement;

    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.9,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const {isIntersecting} = entry;
        if (isIntersecting) {
          // @ts-ignore
          headerEl.style.color = entry.target.getAttribute("data-header-color");
        }
      });
    }, observerOptions);

    const sectionElements = document.querySelectorAll(".landing-section");
    sectionElements.forEach((section) => observer.observe(section));
  }

  initMobileMenu(): void {
    const menuButton = document.querySelector("#menu-button") as HTMLElement;
    const mobileMenu = document.querySelector("#mobile-menu") as HTMLElement;

    menuButton.addEventListener("click", () => {
      mobileMenu.classList.toggle("hidden");
    });
  }

  toggleProfileMenu(): void {
    this.verMenuPerfil = !this.verMenuPerfil;
  }

  logout(): void {
    this.authService.logout();
  }

  isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }

  isAdmin() {
    return this.authService.isAdmin();
  }

  checkAdminStatus(): void {
    this.authService.checkAdminStatus().subscribe();
  }
}
