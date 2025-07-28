import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { MenClothingComponent } from './pages/men-clothing/men-clothing.component';
import { WomenClothingComponent } from './pages/women-clothing/women-clothing.component';
import { JewelryComponent } from './pages/jewelry/jewelry.component';
import { ElectronicsComponent } from './pages/electronics/electronics.component';
import { ShoppingCartComponent } from './pages/shopping-cart/shopping-cart.component';
import { FavoriteItemsComponent } from './pages/favorite-items/favorite-items.component';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';

export const routes: Routes = [
  { path: "", title: "Home", redirectTo: "home", pathMatch: "prefix" },
  { path: "home", title: "Home", component: Home },
  {
    path: "men-clothing",
    title: `Men's Clothings`,
    component: MenClothingComponent,
  },
    {path: 'products/:id',
    title: 'Product Details',
    component: ProductDetailComponent
  },
  {
    path: "women-clothing",
    title: `Women's Clothings`,
    component: WomenClothingComponent,
  },
  { path: "jewelry", title: "Jewelry", component: JewelryComponent },
  {
    path: "electronics",
    title: "Electronics",
    component: ElectronicsComponent,
  },
  {
    path: "shopping-cart",
    title: "Shopping Cart",
    component: ShoppingCartComponent,
  },
  {
    path: "favorite-items",
    title: "Favorite Items",
    component: FavoriteItemsComponent,
  },
];
