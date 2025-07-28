import { Component, computed, inject, input } from "@angular/core";
import { Product } from "../../../type";
import {
  faEye,
  faHeart,
  faCartShopping,
  faStar,
  faStar as fasStar,  // Aliased as fasStar
  faStarHalfAlt,
} from "@fortawesome/free-solid-svg-icons";
import { faStar as farStar } from '@fortawesome/free-regular-svg-icons'; // Regular (empty) sta // Regular (empty) star
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { ShoppingCartLocalStorageService } from "../../services/shopping-cart-local-storage.service";
import { Router } from "@angular/router";
import { FavoriteItemsLocalStorageService } from "../../services/favorite-items-local-storage.service";
import { CommonModule } from "@angular/common"; // Import CommonModule for pipes and directives

@Component({
  selector: "app-product-card",
  standalone: true,
  imports: [
    FontAwesomeModule,
    CommonModule, // This provides NumberPipe (number), NgIf, and other common directives
  ],
  templateUrl: "./product-card.html",
})
export class ProductCardComponent {
  Math = Math;
  // Icons
  fasStar = fasStar; // Solid star (filled)
  faStarHalfAlt = faStarHalfAlt; // Half star
  farStar = farStar; // Regular star (outline)
  faHeart = faHeart;
  faEye = faEye;
  faCartShopping = faCartShopping;

  // Services
  private readonly shoppingCartService = inject(
    ShoppingCartLocalStorageService
  );
  private readonly favoriteService = inject(FavoriteItemsLocalStorageService);
  private readonly router = inject(Router);

  // Input
  product = input<Product>();

  // Computed
  cartItems = computed(() => this.shoppingCartService.cartItems());

  // Helper function for star ratings
  // Add this to your ProductCardComponent class
  getStarsArray(
    rating: number
  ): { type: "full" | "half" | "empty"; value: number }[] {
    const stars: { type: "full" | "half" | "empty"; value: number }[] = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push({ type: "full", value: i });
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push({ type: "half", value: i });
      } else {
        stars.push({ type: "empty", value: i });
      }
    }

    return stars;
  }
  addItem() {
    if (!this.product()) return;

    this.shoppingCartService.addItem({
      ...this.product()!,
      quantity: 1,
    });
  }

  checkItemAlreadyExist(): boolean {
    return this.product()
      ? this.shoppingCartService.checkItemAlreadyExist(this.product()!.id)
      : false;
  }

  checkFavoriteItemAlreadyExist(): boolean {
    return this.product()
      ? this.favoriteService.checkItemAlreadyExist(this.product()!.id)
      : false;
  }

  toggleFavoriteItem() {
    if (!this.product()) return;

    if (this.checkFavoriteItemAlreadyExist()) {
      this.favoriteService.removeItem(this.product()!);
    } else {
      this.favoriteService.addItem(this.product()!);
    }
  }

  onClickNavigate() {
    if (this.product()?.id) {
      this.router.navigate(["/products", this.product()?.id]);
    }
  }
  handleImageError(event: Event) {
    const img = event.target as HTMLImageElement;
    img.src = "assets/placeholder-product.png";
  }
}
