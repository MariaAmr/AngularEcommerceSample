// navbar.ts
import { Component, inject } from "@angular/core";
import { RouterLink, RouterLinkActive } from "@angular/router";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import {
  faCartShopping,
  faBars,
  faHeart,
  faXmark,
  faMoon,
  faSun,
} from "@fortawesome/free-solid-svg-icons";
import { ShoppingCartLocalStorageService } from "../../services/shopping-cart-local-storage.service";
import { FavoriteItemsLocalStorageService } from "../../services/favorite-items-local-storage.service";
import { CommonModule } from "@angular/common";
import { ThemeService } from "../../services/theme.service";
import { AsyncPipe } from "@angular/common";

@Component({
  selector: "app-navbar",
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive,
    FontAwesomeModule,
    AsyncPipe,
  ],
  templateUrl: "./navbar.html",
  styleUrl: "./navbar.css",
})
export class Navbar {
  private cartService = inject(ShoppingCartLocalStorageService);
  private favoriteService = inject(FavoriteItemsLocalStorageService);
  themeService = inject(ThemeService);

  // Icons
  faCartShopping = faCartShopping;
  faBars = faBars;
  faHeart = faHeart;
  faXmark = faXmark;
  faMoon = faMoon;
  faSun = faSun;

  // Signals
  cartItemQuantity = this.cartService.cartItemQuantity;
  favoriteItemsCount = this.favoriteService.favoriteItemsCount;

  // Mobile menu state
  isMobileMenuOpen = false;

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }
}
