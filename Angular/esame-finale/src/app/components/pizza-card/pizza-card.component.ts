import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { pizza } from '../../models/pizza_model';

@Component({
  selector: 'app-pizza-card',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="row justify-content-around mt-5 mb-5 g-4 w-75 mx-auto">
      <div>
        <div class="card h-100 shadow-sm border-0 rounded-4" style="background-color:#f8f9fa;">
          
          <img [src]="pizza.image" class="card-img-top rounded-top-4" alt="{{pizza.name}}" style="height:200px; object-fit:cover;" [routerLink]="['/pizze', pizza.id]">
          
          <div class="card-body text-center">
            <h4 class="card-title fw-bold" style="font-family: 'Playfair Display', serif; color:#3A3535;" [routerLink]="['/pizze', pizza.id]">
              {{ pizza.name }}
            </h4>
            <p class="card-text" style="font-family: 'Playfair Display', serif; color:#495057;" [routerLink]="['/pizze', pizza.id]">
              {{ pizza.description }}
            </p>
            <p class="card-text fw-bold" style="font-family: 'Playfair Display', serif; color:#28a745;" [routerLink]="['/pizze', pizza.id]">
              €{{ pizza.price }}
            </p>

            <!-- Quantity Controls -->
            <div class="d-flex justify-content-center gap-4 align-items-center mt-2">
              <button class="btn btn-sm text-light" style="font-weight: bold; background-color: #dc3545;"
                      (click)="onDecrease.emit(pizza)">-</button>
              <span style="font-family: 'Playfair Display'">{{ quantity }}</span>
              <button class="btn btn-sm text-light" style="font-weight: bold; background-color: #28a745;"
                      (click)="onIncrease.emit(pizza)">+</button>
            </div>
            <button class="btn btn-sm btn-outline-danger mt-3" (click)="onRemove.emit(pizza)" style="font-family: 'Playfair Display'">Remove Pizza</button>
          </div>
        </div>
      </div>
    </div>
    
  `,
  styles: ``
})
export class PizzaCardComponent {
  @Input({ required: true }) pizza!: pizza;
  @Input() quantity: number = 0;

  @Output() onIncrease = new EventEmitter<pizza>();
  @Output() onDecrease = new EventEmitter<pizza>();
  @Output() onRemove = new EventEmitter<pizza>();
}
