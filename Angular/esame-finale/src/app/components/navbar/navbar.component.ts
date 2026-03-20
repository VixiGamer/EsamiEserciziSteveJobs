import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;700&display=swap" rel="stylesheet">

    <nav class="navbar navbar-expand-lg shadow-sm px-3"
         style="background-color: #f8f9fa; font-family: 'Playfair Display', serif;">

      <div class="container-fluid">

        <!-- Logo + Links -->
        <div class="d-flex align-items-center gap-4">

          <!-- Logo -->
          <a class="navbar-brand d-flex align-items-center fw-bold m-0"
             routerLink="/home"
             style="color:#3A3535; font-size: 1.4rem;">
            <img src="../../../assets/images/MyPizza_logo.jpg"
                 alt="Logo"
                 width="38"
                 height="38"
                 class="me-2 rounded-3 shadow-sm">
            MyPizza
          </a>

          <!-- Links -->
          <ul class="navbar-nav flex-row gap-3">

            <li class="nav-item">
              <a class="nav-link"
                 routerLink="/home"
                 routerLinkActive="active-link">
                 Home
              </a>
            </li>

            <li class="nav-item">
              <a class="nav-link"
                 routerLink="/menu"
                 routerLinkActive="active-link">
                 Menu
              </a>
            </li>

            <li class="nav-item">
              <a class="nav-link"
                 routerLink="/cart"
                 routerLinkActive="active-link">
                 Carrello
              </a>
            </li>

          </ul>

        </div>

      </div>
    </nav>
  `,
  styles: ``
})
export class NavbarComponent {}