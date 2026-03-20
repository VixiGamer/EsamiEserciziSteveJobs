import { Routes } from '@angular/router';
import { HomepageComponent } from './features/home/homepage.component';
import { MenupageComponent } from './features/menu/menupage.component';
import { CartpageComponent } from './features/cart/cartpage.component';
import { DetailedPizzaPageComponent } from './features/detailedPizza/detailed-pizza-page.component';

export const routes: Routes = [
    { path: '', component: HomepageComponent },
    { path: 'home', component: HomepageComponent },
    { path: 'menu', component: MenupageComponent },
    { path: 'cart', component: CartpageComponent },
    { path: 'pizze/:id', component: DetailedPizzaPageComponent }
];
