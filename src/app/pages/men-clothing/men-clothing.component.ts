
import { Component, computed, inject, resource, signal } from '@angular/core';
import { ApiService } from '../../services/api.services';
import { ProductCardComponent } from '../../components/product-card/product-card';
import { Meta, Title } from '@angular/platform-browser';
import { ProductCardSkeletonComponent } from '../../components/product-card-skeleton.ts/product-card-skelton';
import { SearchStateService } from '../../services/search-state.service';
import { SearchBarComponent } from "../../components/search/search";
import { Sort } from "../../components/sort.ts/sort/sort";


@Component({
  selector: "app-men-clothing",
  imports: [
    ProductCardComponent,
    ProductCardSkeletonComponent,
    SearchBarComponent,
    Sort,
  ],
  template: `
    <app-search-bar></app-search-bar>
    <app-sort (sortChange)="onSortChange($event)"></app-sort>
    <div class="flex flex-col items-center h-screen">
      <div class="w-full max-w-7xl px-6 pb-34">
        <div class="mt-28 py-4 px-6">
          @if (isLoading()) {
          <div
            class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 mx-auto max-w-7xl gap-6"
          >
            @for (item of [1,2,3,4]; track item) {
            <app-product-card-skeleton></app-product-card-skeleton>
            }
          </div>
          } @else { @if (searchState.isSearching()) {
          <div class="mb-4 text-gray-600 dark:text-gray-300">
            Showing {{ displayedProducts().length }} results for "{{
              searchState.searchTerm()
            }}"
          </div>
          }

          <div
            class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 mx-auto max-w-7xl gap-6"
          >
            @for (product of sortedProducts(); track product.id) {
            <app-product-card [product]="product"></app-product-card>
            } @if (searchState.isSearching() && displayedProducts().length ===
            0) {
            <div
              class="col-span-full text-center py-10 text-gray-500 dark:text-gray-400"
            >
              No products found matching "{{ searchState.searchTerm() }}"
            </div>
            }
          </div>
          }
        </div>
      </div>
    </div>
  `,
})
export class MenClothingComponent {
  constructor(private meta: Meta, private title: Title) {
    this.title.setTitle("Men's Clothings");
    this.meta.updateTag({
      name: "description",
      content:
        "Men's Clothings Page - This is a modern, responsive e-commerce template built Angular and TailwindCSS. It's designed to be a starting point for building full-featured e-commerce applications. The template includes a clean and customizable design, ideal for minimalist online stores.",
    });
    this.meta.updateTag({ property: "og:title", content: "Men's Clothings" });
    this.meta.updateTag({
      property: "og:description",
      content:
        "Men's Clothings Page - This is a modern, responsive e-commerce template built Angular and TailwindCSS. It's designed to be a starting point for building full-featured e-commerce applications. The template includes a clean and customizable design, ideal for minimalist online stores.",
    });
  }

  private readonly productCategory = "men's clothing";
  private readonly apiService = inject(ApiService);
  searchState = inject(SearchStateService);

  // Add a signal for current sort type
  currentSort = signal<string>("");

  productsResource = resource({
    loader: () => this.apiService.getProducts(this.productCategory),
  });

  isLoading = computed(() => this.productsResource.isLoading());

  // Computed property for displayed products (search or all)
  displayedProducts = computed(() => {
    if (this.searchState.isSearching()) {
      return this.searchState.searchResults();
    }
    return this.productsResource.value() || [];
  });

  // Computed property for sorted products
  sortedProducts = computed(() => {
    const products = this.displayedProducts();
    const sortType = this.currentSort();

    if (!sortType) return products;

    return [...products].sort((a, b) => {
      switch (sortType) {
        case "price-asc":
          return a.price - b.price;
        case "price-desc":
          return b.price - a.price;
        case "title-asc":
          return a.title.localeCompare(b.title);
        case "title-desc":
          return b.title.localeCompare(a.title);
        default:
          return 0;
      }
    });
  });

  // Handle sort changes
  onSortChange(sortType: string) {
    this.currentSort.set(sortType);
  }

  ngOnInit() {
    this.searchState.currentCategory.set(this.productCategory);
  }

  ngOnDestroy() {
    this.searchState.currentCategory.set(null);
    this.searchState.searchTerm.set("");
    this.searchState.searchResults.set([]);
    this.searchState.isSearching.set(false);
  }
}