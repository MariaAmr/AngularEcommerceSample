
import {
  Component,
  computed,
  effect,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ApiService } from "../../services/api.services";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faCartShopping,
  faChevronLeft,
  faChevronRight,
  faHeart,
} from '@fortawesome/free-solid-svg-icons';
import { ShoppingCartLocalStorageService } from '../../services/shopping-cart-local-storage.service';
import { ProductCardComponent } from "../../components/product-card/product-card";
import { ProductCardSkeletonComponent } from "../../components/product-card-skeleton.ts/product-card-skelton";
import { Meta, Title } from '@angular/platform-browser';
import { FavoriteItemsLocalStorageService } from "../../services/favorite-items-local-storage.service";
import { CommonModule } from '@angular/common';
import { Product } from '../../../type';
import { catchError, of } from 'rxjs';

@Component({
  selector: "app-product-detail",
  standalone: true,
  imports: [
    FontAwesomeModule,
    ProductCardComponent,
    ProductCardSkeletonComponent,
    CommonModule,
  ],
  template: ` 
    <div class="flex flex-col items-center h-screen  ">
      <div class="w-full max-w-7xl pb-28 ">
        <div class="min-h-full">
            <div class="mx-auto pt-24 pb-10 px-6 max-w-7xl">
              <div
                class="border-y border-y-base-300 flex gap-x-2 justify-end py-2 mb-8"
              >
                <button
                  (click)="toggleFavoriteItem()"
                  [class]="
                    checkFavoriteItemAlreadyExist()
                      ? 'btn btn-soft btn-primary btn-md'
                      : 'btn btn-soft btn-md'
                  "
                >
                  <fa-icon [icon]="faHeart"></fa-icon>
                </button>
                <div class="flex items-center gap-x-2">
                  <button
                    [disabled]="isFirstItem()"
                    (click)="handlePrevNavigation()"
                    class="btn btn-ghost btn-md"
                  >
                    <fa-icon [icon]="faChevronLeft"></fa-icon>
                  </button>
                  <button
                    [disabled]="isLastItem()"
                    (click)="handleNextNavigation()"
                    class="btn btn-ghost btn-md"
                  >
                    <fa-icon [icon]="faChevronRight"></fa-icon>
                  </button>
                </div>
              </div>
              <div
                class="flex flex-col-reverse lg:flex-row gap-y-10 justify-between gap-x-10"
              >
                <div class="w-full md:w-[70%]">
                  @if (loading()) {
                  <figure>
                    <div class="w-full h-[350px] md:h-[550px] skeleton"></div>
                  </figure>
                  } @else if (product()) {
                  <figure>
                    <img
                      class="w-full h-[350px] md:h-[550px] object-contain"
                      [src]="product()?.image"
                      [alt]="product()?.title || 'Product image'"
                    />
                  </figure>
                  }
                </div>
                <div class="w-full">
                  @if (loading()) {
                  <div class="skeleton w-full h-[40px]"></div>
                  <div class="skeleton w-[100px] mt-3 h-[20px]"></div>
                  <div class="skeleton w-full mt-4 h-[150px]"></div>
                  <div class="skeleton w-full mt-8 h-[50px]"></div>
                  } @else if (product()) {
                  <h2 class="text-2xl font-bold mb-3">
                    {{ product()?.title }}
                  </h2>
                  <h3 class="text-3xl font-bold">
                    $ {{ product()?.price | number : "1.2-2" }}
                  </h3>
                  <p class="leading-6 mt-4">
                    {{ product()?.description }}
                  </p>
                  <div class="badge badge-outline capitalize mt-2">
                    {{ product()?.category }}
                  </div>
                  <button
                    [disabled]="checkItemAlreadyExist()"
                    (click)="addItem()"
                    class="w-full btn btn-primary mt-8"
                  >
                    <fa-icon [icon]="faCartShopping"></fa-icon>
                    Add to Cart
                  </button>
                  }
                </div>
              </div>
            </div>
            <div class="mx-auto pt-28 pb-10 px-6 max-w-7xl">
              <div class="mt-10">
                <h3 class="text-2xl font-bold mb-8">Other similar products</h3>
                @if (loadingSimilar()) {
                <div
                  class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 mx-auto max-w-7xl gap-6"
                >
                  @for (item of [1,2,3,4]; track item) {
                  <app-product-card-skeleton />
                  }
                </div>
                } @else {
                <div
                  class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 mx-auto max-w-7xl gap-6"
                >
                  @for (similarProduct of similarProducts(); track similarProduct.id)
                  {
                  <app-product-card [product]="similarProduct" />
                  }
                </div>
                }
              </div>
            </div>
          </div>
      </div>
    </div>`,
  styles: ``,
})
export class ProductDetailComponent implements OnInit {
  // Icons
  faCartShopping = faCartShopping;
  faChevronRight = faChevronRight;
  faHeart = faHeart;
  faChevronLeft = faChevronLeft;

  // Services
  private readonly apiService = inject(ApiService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly shoppingCartService = inject(
    ShoppingCartLocalStorageService
  );
  private readonly favoriteService = inject(FavoriteItemsLocalStorageService);

  // State
  productId = signal<string>("");
  product = signal<Product | null>(null);
  similarProducts = signal<Product[]>([]);
  loading = signal(true);
  loadingSimilar = signal(true);
  error = signal<string | null>(null);

  // Computed values
  isFirstItem = computed(() => Number(this.productId()) === 1);
  isLastItem = computed(() => Number(this.productId()) === 20);

  constructor(private meta: Meta, private title: Title) {
    this.setMetadata();
  }

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const id = params.get("id");
      if (id) {
        this.productId.set(id);
        this.loadProduct(id);
      }
    });
  }

  private setMetadata() {
    this.title.setTitle("Product Details");
    this.meta.updateTag({
      name: "description",
      content: "Product Details Page - Modern e-commerce template",
    });
    // ... other meta tags ...
  }

  private async loadProduct(id: string) {
    this.loading.set(true);
    this.error.set(null);

    try {
      const product = await this.apiService.getProductById(id);
      this.product.set(product);
      if (product?.category) {
        this.loadSimilarProducts(product.category);
      }
    } catch (err) {
      this.error.set("Failed to load product");
      console.error(err);
    } finally {
      this.loading.set(false);
    }
  }

  private async loadSimilarProducts(category: string) {
    this.loadingSimilar.set(true);
    try {
      const products = await this.apiService.getProductsWithLimit(4, category);
      this.similarProducts.set(products);
    } catch (err) {
      console.error("Failed to load similar products", err);
    } finally {
      this.loadingSimilar.set(false);
    }
  }

  // Navigation methods
  handlePrevNavigation() {
    if (this.isFirstItem()) return;
    const newId = Number(this.productId()) - 1;
    this.navigateToProduct(newId.toString());
  }

  handleNextNavigation() {
    if (this.isLastItem()) return;
    const newId = Number(this.productId()) + 1;
    this.navigateToProduct(newId.toString());
  }

  private navigateToProduct(id: string) {
    this.router.navigate(["/products", id]);
  }

  // Cart methods
  checkItemAlreadyExist(): boolean {
    const product = this.product();
    return product
      ? this.shoppingCartService.checkItemAlreadyExist(product.id)
      : false;
  }

  addItem() {
    const product = this.product();
    if (product) {
      this.shoppingCartService.addItem({ ...product, quantity: 1 });
    }
  }

  // Favorite methods
  checkFavoriteItemAlreadyExist(): boolean {
    const product = this.product();
    return product
      ? this.favoriteService.checkItemAlreadyExist(product.id)
      : false;
  }

  toggleFavoriteItem() {
    const product = this.product();
    if (!product) return;

    if (this.checkFavoriteItemAlreadyExist()) {
      this.favoriteService.removeItem(product);
    } else {
      this.favoriteService.addItem(product);
    }
  }
}