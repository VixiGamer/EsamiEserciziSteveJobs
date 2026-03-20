import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { pizza } from '../../models/pizza_model';
import { MenuService } from '../../service/menuservice.service';
import { PizzaCardComponent } from "../../components/pizza-card/pizza-card.component";

@Component({
  selector: 'app-menupage',
  standalone: true,
  imports: [CommonModule, RouterLink, PizzaCardComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;700&display=swap" rel="stylesheet">
    
    <div class="text-center my-5">
      <h2 style="font-family: 'Playfair Display', serif; font-weight: 700; font-size: clamp(2rem, 5vw, 3rem); color: #3A3535; letter-spacing: 1px; text-transform: uppercase;">
        Our Menu
      </h2>
      <p style="font-family: 'Playfair Display', serif; font-size: 1.2rem; color: #495057; margin-top: 0.5rem;">
        Discover our delicious pizzas, handcrafted with love and fresh ingredients
      </p>
    </div>

    <div *ngIf="pizzas().length === 0" class="text-center my-5 p-5 shadow-sm rounded-4 bg-light w-50 mx-auto">
      <p style="font-family: 'Playfair Display', serif; font-size: 1.5rem; color: #6c757d;">
        The menu is currently unavailable. Please check back later or explore our home page!
      </p>
      <div class="d-flex justify-content-center gap-3">
        <button class="btn btn-outline-secondary mt-3" style="font-family: 'Playfair Display'" routerLink="/home">
          Go to Home
        </button>
        <button class="btn btn-outline-secondary mt-3" style="font-family: 'Playfair Display'" (click)="loadPizzas()">
          Reload the Menu
        </button>
      </div>
    </div>

    <div class="row justify-content-center mt-5 mb-5">
      <div class="col-md-4" *ngFor="let p of pizzas()">
        <app-pizza-card 
          [pizza]="p" 
          [quantity]="getQuantity(p.id)"
          (onIncrease)="increaseQuantity($event)"
          (onDecrease)="decreaseQuantity($event)"
          (onRemove)="removePizza($event)">
        </app-pizza-card>
      </div>
    </div>
  `,
  styles: ``
})
export class MenupageComponent {
  pizzas = this.menuService.menu;

  constructor(private menuService: MenuService) {
    this.menuService.fetchPizzas();
  }

  loadPizzas() {
    this.menuService.getPizzas().subscribe((data: pizza[]) => {
      this.pizzas.set(data);
    });
  }

  getQuantity(id: number) {
    const item = this.menuService.carrello().find(i => i.id === id);
    return item ? item.quantity : 0;
  }

  increaseQuantity(p: pizza) {
    this.menuService.addPizzaToCart(p);
  }

  decreaseQuantity(p: pizza) {
    this.menuService.removePizzaFromCart(p.id);
  }

  removePizza(p: pizza) {
    this.menuService.removePizzaFromMenu(p.id);
  }
}

