import { Component, computed, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MenuService } from '../../service/menuservice.service';

@Component({
  selector: 'app-cartpage',
  standalone: true,
  imports: [CommonModule, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;700&display=swap" rel="stylesheet">
    <div class="text-center my-5">
      <h2 style="font-family: 'Playfair Display', serif; font-weight: 700; font-size: clamp(2rem, 5vw, 3rem); color: #3A3535; letter-spacing: 1px; text-transform: uppercase;">
        Your Cart
      </h2>
      <p style="font-family: 'Playfair Display', serif; font-size: 1.2rem; color: #495057; margin-top: 0.5rem;">
        Review your selected pizzas and adjust quantities before checkout
      </p>
    </div>

    <div *ngIf="cartSignal().length === 0" class="text-center my-5 p-5 shadow-sm rounded-4 bg-light w-50 mx-auto">
      <p style="font-family: 'Playfair Display', serif; font-size: 1.5rem; color: #6c757d;">
        You cart is currently empty. Browse our menu and add some delicious pizzas to your cart!
      </p>
      <button class="btn btn-outline-secondary mt-3" style="font-family: 'Playfair Display'" routerLink="/menu">
        Go to Menu
      </button>
    </div>

    <div class="row justify-content-center g-4 w-50 flex-column align-content-center mx-auto">
      <div class="col-md-6" *ngFor="let item of cartSignal()">
        <div class="card h-100 shadow-sm border-0 rounded-4 d-flex flex-row align-items-center p-3" style="background-color:#f8f9fa;">
          
          <img [src]="item.pizza.image" alt="{{ item.pizza.name }}" class="rounded-4 me-3" style="height:120px; width:120px; object-fit:cover;">
          
          <div class="flex-grow-1 text-start">
            <h5 style="font-family: 'Playfair Display', serif; color:#3A3535;">{{ item.pizza.name }}</h5>
            <p style="font-family: 'Playfair Display', serif; color:#495057; margin-bottom:0.25rem;">
              €{{ item.pizza.price.toFixed(2) }} x {{ item.quantity }}
            </p>            

            <div class="mt-2">
              <button class="btn btn-sm btn-outline-secondary me-2" (click)="decreaseQuantity(item)" style="font-family: 'Playfair Display'">-</button>
              <button class="btn btn-sm btn-outline-secondary me-2" (click)="increaseQuantity(item)" style="font-family: 'Playfair Display'"  >+</button>
              <button class="btn btn-sm btn-danger" (click)="removeItem(item)" style="font-family: 'Playfair Display'">Remove</button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="text-center mt-4 mb-4" *ngIf="cartSignal().length > 0">
      <h4 style="font-family: 'Playfair Display', serif; color:#28a745;">
        Total: €{{ total().toFixed(2) }}
      </h4>
      
      <div>
        <button type="button" class="btn btn-outline-secondary" (click)="checkout()" routerLink="/menu" data-bs-toggle="modal" style="font-family: 'Playfair Display'" data-bs-target="#staticBackdrop">
          Checkout
        </button>
        <button class="btn btn-outline-danger ms-2" (click)="clearCart()" style="font-family: 'Playfair Display'">Clear Cart</button>
      </div>

      
      <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="staticBackdropLabel" style="font-family: 'Playfair Display'">Thank you for your purchase!</h1>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body" style="font-family: 'Playfair Display'">
              Your order has been placed successfully.
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" style="font-family: 'Playfair Display'" data-bs-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: ``
})

export class CartpageComponent {
  cartSignal = this.menuService.carrello;

  total = computed(() =>
    this.cartSignal().reduce((sum, i) => sum + i.pizza.price * i.quantity, 0)
  );

  constructor(private menuService: MenuService) { }

  increaseQuantity(item: any) {
    this.menuService.addPizzaToCart(item.pizza);
  }

  decreaseQuantity(item: any) {
    this.menuService.removePizzaFromCart(item.id);
  }

  removeItem(item: any) {
    this.menuService.carrello.update(items => items.filter(i => i.id !== item.id));
  }

  checkout() {
    this.menuService.clearCart();
  }

  clearCart() {
    this.menuService.clearCart();
  }
}