import { Component, computed, inject, resource, signal } from '@angular/core';
import { ApiService } from "../../services/api.services";
import { ProductCardComponent } from "../../components/product-card/product-card";
import { ProductCardSkeletonComponent } from "../../components/product-card-skeleton.ts/product-card-skelton";
import { Meta, Title } from '@angular/platform-browser';
import { SearchStateService } from '../../services/search-state.service';
import { CommonModule } from '@angular/common';
import { SearchBarComponent } from "../../components/search/search";
import { Sort } from "../../components/sort.ts/sort/sort";


@Component({
  selector: "app-electronics",
  standalone: true,
  imports: [
    CommonModule,
    ProductCardComponent,
    ProductCardSkeletonComponent,
    SearchBarComponent,
    Sort,
  ],
  template: `
    <app-search-bar></app-search-bar>
    <app-sort (sortChange)="onSortChange($event)"></app-sort>
    <div class="flex flex-col items-center h-screen">
      <div class="w-full max-w-7xl pb-28">
        <div class="mt-28 pb-10 px-6">
          @if (isLoading()) {
          <div
            class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 mx-auto max-w-7xl gap-6"
          >
            @for (item of [1,2,3,4]; track item) {
            <app-product-card-skeleton />
            }
          </div>
          } @else { @if (searchState.isSearching()) { @if
          (searchState.searchResults().length > 0) {
          <div class="mb-4 text-gray-600 dark:text-gray-300">
            Showing {{ sortedSearchResults().length }} results for "{{
              searchState.searchTerm()
            }}"
          </div>
          <div
            class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 mx-auto max-w-7xl gap-6"
          >
            @for (product of sortedSearchResults(); track product.id) {
            <app-product-card [product]="product" />
            }
          </div>
          } @else {
          <div class="text-center py-20">
            <p class="text-lg text-gray-500 dark:text-gray-400">
              No electronics found for "{{ searchState.searchTerm() }}"
            </p>
          </div>
          } } @else {
          <div
            class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 mx-auto max-w-7xl gap-6"
          >
            @for (product of sortedElectronicsProducts(); track product.id) {
            <app-product-card [product]="product" />
            }
          </div>
          } }
        </div>
      </div>
    </div>
  `,
})
export class ElectronicsComponent {
  private readonly productCategory = "electronics";
  private readonly apiService = inject(ApiService);
  searchState = inject(SearchStateService);

  // Signal to track current sort type
  currentSort = signal<string>("");

  // Load electronics products
  electronicsResource = resource({
    loader: () => this.apiService.getProducts(this.productCategory),
  });

  // Computed properties
  isLoading = computed(
    () =>
      this.electronicsResource.isLoading() ||
      (this.searchState.isSearching() &&
        !this.searchState.searchResults().length)
  );

  electronicsProducts = computed(() => {
    return this.electronicsResource.value() || [];
  });

  // Sorted products computation
  sortedElectronicsProducts = computed(() => {
    const products = this.electronicsProducts();
    return this.sortProducts(products, this.currentSort());
  });

  // Sorted search results computation
  sortedSearchResults = computed(() => {
    const results = this.searchState.searchResults();
    return this.sortProducts(results, this.currentSort());
  });

  constructor(private meta: Meta, private title: Title) {
    this.setMetadata();
    this.searchState.currentCategory.set(this.productCategory);
  }

  // Handle sort changes
  onSortChange(sortType: string) {
    this.currentSort.set(sortType);
  }

  // Sort products based on type
  private sortProducts(products: any[], sortType: string): any[] {
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
  }

  private setMetadata() {
    this.title.setTitle("Electronics");
    this.meta.updateTag({
      name: "description",
      content: "Electronics - Modern e-commerce template",
    });
    this.meta.updateTag({ property: "og:title", content: "Electronics" });
    this.meta.updateTag({
      property: "og:description",
      content: "Electronics - Modern e-commerce template",
    });
  }

  ngOnDestroy() {
    this.searchState.currentCategory.set(null);
    this.searchState.searchTerm.set("");
    this.searchState.searchResults.set([]);
    this.searchState.isSearching.set(false);
  }
}