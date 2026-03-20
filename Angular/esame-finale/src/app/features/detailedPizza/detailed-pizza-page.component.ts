import { Component, ChangeDetectionStrategy, signal, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MenuService } from '../../service/menuservice.service';
import { pizza } from '../../models/pizza_model';

@Component({
  selector: 'app-pizza-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  // REQUISITO ESAME: Ottimizzazione delle performance
  changeDetection: ChangeDetectionStrategy.OnPush, 
  template: `
    <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;700&display=swap" rel="stylesheet">

    <div class="container my-5" *ngIf="pizzaDetail() as p">
      <button routerLink="/menu" class="btn btn-outline-secondary mb-3" style="font-family: 'Playfair Display'">Back</button>
      <div class="text-center mb-5">
        <h2 style="font-family: 'Playfair Display', serif; font-weight: 700; font-size: clamp(2rem, 5vw, 3rem); color: #3A3535; letter-spacing: 1px; text-transform: uppercase;">
          {{ p.name }}
        </h2>
        <p style="font-family: 'Playfair Display', serif; font-size: 1.1rem; color: #6c757d; margin-top: 0.5rem;">
          Discover the authentic taste of Italy
        </p>
      </div>

      <div class="row justify-content-center align-items-center g-5">

        <div class="col-md-5 text-center">
          <img [src]="p.image" [alt]="p.name" class="img-fluid rounded-4 shadow-sm" style="max-height: 380px; object-fit: cover;">
        </div>

        <div class="col-md-5">
          <p style="font-family: 'Playfair Display', serif; font-size: 1.1rem; color: #495057; line-height: 1.6;">
            {{ p.description || 'Una deliziosa pizza preparata con i migliori ingredienti della tradizione italiana.' }}
          </p>

          <h3 style="font-family: 'Playfair Display', serif; color: #28a745; margin-top: 1rem;">
            €{{ p.price.toFixed(2) }}
          </h3>

          <div class="d-flex align-items-center mt-4">
            <button type="button" class="btn btn-outline-secondary" (click)="decrease(p)">
              -
            </button>

            <span class="mx-3 fs-5">{{ getQuantity(p.id) }}</span>

            <button type="button" class="btn btn-outline-secondary" (click)="increase(p)">
              +
            </button>
          </div>
          <button routerLink="/menu" class="btn btn-outline-danger mt-3" (click)="removePizza(p)" style="font-family: 'Playfair Display'">Remove Pizza</button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .rounded-4 { border-radius: 1.5rem !important; }
  `]
})
export class DetailedPizzaPageComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private menuService = inject(MenuService);
  
  // Signal per i dettagli della pizza corrente
  pizzaDetail = signal<pizza | null>(null);

  ngOnInit() {
    // Recuperiamo l'ID dai parametri della rotta [cite: 15, 16]
    const id = Number(this.route.snapshot.paramMap.get('id'));
    
    this.menuService.getPizzas().subscribe(pizzas => {
      const found = pizzas.find(item => item.id === id);
      this.pizzaDetail.set(found || null);
    });
  }

  // Metodo per leggere la quantità dal carrello globale (Signal)
  getQuantity(id: number): number {
    const item = this.menuService.carrello().find(i => i.id === id);
    return item ? item.quantity : 0;
  }

  increase(p: pizza) {
    this.menuService.addPizzaToCart(p);
  }

  decrease(p: pizza) {
    this.menuService.removePizzaFromCart(p.id);
  }

  removePizza(p: pizza) {
    this.menuService.removePizzaFromMenu(p.id);
    this.pizzaDetail.set(null); // Rimuoviamo i dettagli dalla vista
  }
}