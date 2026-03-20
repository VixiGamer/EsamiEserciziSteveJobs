import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { pizza } from '../models/pizza_model';
import { Observable } from 'rxjs';

interface CartItem {
  id: number;
  pizza: pizza;
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  carrello = signal<CartItem[]>([]);
  menu = signal<pizza[]>([]);

  constructor(private http: HttpClient) {}

  getPizzas(): Observable<pizza[]> {
    return this.http.get<pizza[]>(
      'https://my-json-server.typicode.com/zoelounge/menupizza/cards'
    );
  }

  fetchPizzas() {
    if (this.menu().length === 0) {
      this.http.get<pizza[]>('https://my-json-server.typicode.com/zoelounge/menupizza/cards')
        .subscribe(data => this.menu.set(data));
    }
  }

  addPizzaToCart(p: pizza) {
    this.carrello.update(items => {
      const existing = items.find(i => i.id === p.id);
      if (existing) {
        return items.map(item =>
          item.id === p.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...items, { id: p.id, pizza: p, quantity: 1 }];
    });
  }

  removePizzaFromCart(id: number) {
    this.carrello.update(items => {
      const existing = items.find(i => i.id === id);
      if (!existing) return items;

      if (existing.quantity > 1) {
        return items.map(item =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        );
      }
      return items.filter(item => item.id !== id);
    });
  }

  removePizzaFromMenu(id: number) {
    this.menu.update(items => items.filter(item => item.id !== id));
  }

  clearCart() {
    this.carrello.set([]);
  }
}