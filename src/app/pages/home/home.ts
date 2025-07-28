import { Component, inject, resource, computed, effect, signal } from "@angular/core";
import { ProductCardComponent } from "../../components/product-card/product-card";
import { ProductCardSkeletonComponent } from "../../components/product-card-skeleton.ts/product-card-skelton";
import { ApiService } from "../../services/api.services";
import { Meta, Title } from "@angular/platform-browser";
import { SearchStateService } from "../../services/search-state.service";
import { CommonModule } from "@angular/common";
import { SearchBarComponent } from "../../components/search/search";
import { Sort } from "../../components/sort.ts/sort/sort";
import { Product } from "../../../type";

@Component({
  selector: "app-home",
  standalone: true,
  imports: [
    CommonModule,
    ProductCardComponent,
    ProductCardSkeletonComponent,
    SearchBarComponent,
    Sort,
  ],
  templateUrl: "./home.html",
  styleUrl: "./home.css",
})
export class Home {
  private readonly apiService = inject(ApiService);
  searchState = inject(SearchStateService);
  sortType = signal<string>("");

  // Original products loading
  productsResource = resource({
    loader: () => this.apiService.getProducts(),
  });

  // Computed properties
  isLoading = computed(
    () =>
      this.productsResource.isLoading() ||
      (this.searchState.isSearching() &&
        !this.searchState.searchResults().length)
  );

  // Products to display (either search results or all products)
  productsToDisplay = computed(() => {
      let products = this.searchState.isSearching()
        ? this.searchState.searchResults()
        : this.productsResource.value() || [];

      return this.sortProducts(products, this.sortType());
  });

  errorEffect = effect(() => {
    const error = this.productsResource.error() as Error;
    if (error) {
      console.log(error);
    }
  });

  constructor(private meta: Meta, private title: Title) {
    this.setMetadata();
  }

  private setMetadata() {
    this.title.setTitle("Home");
    this.meta.updateTag({
      name: "description",
      content: "Home Page - Modern e-commerce template",
    });
    this.meta.updateTag({ property: "og:title", content: "Home" });
    this.meta.updateTag({
      property: "og:description",
      content: "Home Page - Modern e-commerce template",
    });
  }

  // Add sort handler
  onSortChange(sortType: string) {
    this.sortType.set(sortType);
  }

  // Add sort function
  private sortProducts(products: Product[], sortType: string): Product[] {
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
}
