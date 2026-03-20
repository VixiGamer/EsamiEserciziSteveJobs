import { Component } from '@angular/core';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [],
  template: `
    <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;700&display=swap" rel="stylesheet">
    <div class="rounded-4" style="background-color: antiquewhite;">
      <div class="position-relative text-center">
        <!-- Immagine di sfondo -->
        <img src="../../../assets/images/pizzeria-popolare.jpg" class="img-fluid w-100" style="max-height:600px; object-fit:cover;" alt="">

        <!-- Overlay scuro -->
        <div class="position-absolute top-0 start-0 w-100 h-100" style="background-color: rgba(0,0,0,0.4);"></div>

        <!-- Testo centrato -->
        <div class="position-absolute top-50 start-50 translate-middle text-white px-3">
          <h1 style="font-family: 'Playfair Display', serif; font-size: clamp(2.5rem, 8vw, 5rem); font-weight:700; margin-bottom: 0.5rem;">
            Welcome to MyPizza
          </h1>
          <h3 style="font-family: 'Playfair Display', serif; font-weight:500; font-size: clamp(1.2rem, 3vw, 2rem);">
            The best pizza in town
          </h3>
        </div>
      </div>

      <div class="row justify-content-around mt-5 mb-5 g-4 w-75 mx-auto">
        <div class="col-md-4">
          <div class="card h-100 shadow-sm border-0 rounded-4" style="background-color:#f8f9fa;">
            <div class="card-body text-center">
              <h4 class="card-title fw-bold" style="font-family: 'Playfair Display', serif; color:#3A3535;">Fresh, High-Quality Ingredients</h4>
              <p class="card-text" style="font-family: 'Playfair Display', serif; color:#495057;">
                All our pizzas are made with the freshest ingredients, carefully selected from the best local suppliers, ensuring an authentic and delicious taste in every bite.
              </p>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="card h-100 shadow-sm border-0 rounded-4" style="background-color:#f8f9fa;">
            <div class="card-body text-center">
              <h4 class="card-title fw-bold" style="font-family: 'Playfair Display', serif; color:#3A3535;">Traditional and Innovative Recipes</h4>
              <p class="card-text" style="font-family: 'Playfair Display', serif; color:#495057;">
                At MyPizza, you'll find both classic Neapolitan recipes and unique, innovative creations, perfect for those who love to explore new flavors without giving up tradition.
              </p>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="card h-100 shadow-sm border-0 rounded-4" style="background-color:#f8f9fa;">
            <div class="card-body text-center">
              <h4 class="card-title fw-bold" style="font-family: 'Playfair Display', serif; color:#3A3535;">Fast and Welcoming Experience</h4>
              <p class="card-text" style="font-family: 'Playfair Display', serif; color:#495057;">
                We offer quick service in a warm, inviting environment—ideal for a lunch break, family dinner, or night out with friends—always with smiles and attentive customer care.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div class="text-center my-5 p-4 bg-light rounded-4 shadow-sm">
        <h2 class="mb-3" style="font-family: 'Playfair Display', serif; font-weight:700; color:#3A3535;">
          Our Story
        </h2>
        <p class="mx-auto" style="max-width: 700px; font-family: 'Playfair Display', serif; font-size: 1.1rem; color:#495057;">
          MyPizza was born from a love for authentic Italian pizza and a passion for sharing it with the community. What started as a small family-run pizzeria has grown into a local favorite, combining traditional recipes with fresh ingredients and creative flavors. Every pizza is handcrafted with care, and every visit is an opportunity to enjoy great food, warm hospitality, and a welcoming atmosphere.
        </p>
      </div>
    </div>
    <h5 class="text-center mt-4 mb-5" style="font-family: 'Playfair Display', serif; color:#3A3535;">By Viggo Ponturo Nygaard</h5>
  `,
  styles: ``
})
export class HomepageComponent {

}
