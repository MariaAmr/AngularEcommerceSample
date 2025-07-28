import { Routes } from '@angular/router';
import { Error } from './components/error/error';



export const routes: Routes = [
  {
    path: "",
    redirectTo: "home",
    pathMatch: "full",
  },
  {
    path: "home",
    title: "Home",
    loadComponent: () => import("./pages/home/home").then((m) => m.Home),
  },
  {
    path: "men-clothing",
    title: "Men's Clothing",
    loadComponent: () =>
      import("./pages/men-clothing/men-clothing.component").then(
        (m) => m.MenClothingComponent
      ),
  },
  {
    path: "women-clothing",
    title: "Women's Clothing",
    loadComponent: () =>
      import("./pages/women-clothing/women-clothing.component").then(
        (m) => m.WomenClothingComponent
      ),
  },
  {
    path: "jewelry",
    title: "Jewelry",
    loadComponent: () =>
      import("./pages/jewelry/jewelry.component").then(
        (m) => m.JewelryComponent
      ),
  },
  {
    path: "electronics",
    title: "Electronics",
    loadComponent: () =>
      import("./pages/electronics/electronics.component").then(
        (m) => m.ElectronicsComponent
      ),
  },
  {
    path: "shopping-cart",
    title: "Shopping Cart",
    loadComponent: () =>
      import("./pages/shopping-cart/shopping-cart.component").then(
        (m) => m.ShoppingCartComponent
      ),
  },
  {
    path: "favorite-items",
    title: "Favorite Items",
    loadComponent: () =>
      import("./pages/favorite-items/favorite-items.component").then(
        (m) => m.FavoriteItemsComponent
      ),
  },
  {
    path: "products/:id",
    title: "Product Details",
    loadComponent: () =>
      import("./pages/product-detail/product-detail.component").then(
        (m) => m.ProductDetailComponent
      ),
  },
  {
    path: "**",
    title: "Error",
    component: Error,
  },
];
