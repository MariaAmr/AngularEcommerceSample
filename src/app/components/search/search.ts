// search-bar.component.ts
import { Component, inject } from "@angular/core";
import { SearchStateService } from "../../services/search-state.service";
import { ApiService } from "../../services/api.services";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { faSearch, faTimes } from "@fortawesome/free-solid-svg-icons";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-search-bar",
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  template: `
    <div class="w-1/2 sm:w-1/3 max-w-7xl px-6 mt-25 mx-auto">
      <div class="z-10 bg-white dark:bg-gray-900 py-4 px-6 sm:px-4 shadow-sm">
        <div class="max-w-7xl mx-auto">
          <div class="relative">
            <div
              class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"
            >
              <fa-icon [icon]="faSearch" class="text-gray-500"></fa-icon>
            </div>
            <input
              type="text"
              [value]="searchState.searchTerm()"
              (input)="onSearchInput($event)"
              class="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search {{
                searchState.currentCategory() || 'products'
              }}..."
            />
            @if (searchState.searchTerm()) {
            <button
              type="button"
              (click)="clearSearch()"
              class="absolute right-2.5 bottom-2.5 p-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
            >
              <fa-icon [icon]="faTimes"></fa-icon>
            </button>
            }
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [],
})
export class SearchBarComponent {
  searchState = inject(SearchStateService);
  private apiService = inject(ApiService);
  faSearch = faSearch;
  faTimes = faTimes;
  private debounceTimer: any;

  async onSearchInput(event: Event) {
    const term = (event.target as HTMLInputElement).value;
    this.searchState.searchTerm.set(term);

    clearTimeout(this.debounceTimer);

    if (term.trim().length > 0) {
      this.searchState.isSearching.set(true);
      this.debounceTimer = setTimeout(() => {
        this.performSearch(term);
      }, 300);
    } else {
      this.clearSearch();
    }
  }

  private async performSearch(term: string) {
    try {
      const category = this.searchState.currentCategory();
      const products = await this.apiService.getProducts(category || undefined);
      const filtered = products.filter((p) =>
        p.title.toLowerCase().includes(term.toLowerCase())
      );
      this.searchState.searchResults.set(filtered);
    } catch (error) {
      console.error("Search failed:", error);
      this.searchState.searchResults.set([]);
    }
  }

  clearSearch() {
    this.searchState.searchTerm.set("");
    this.searchState.searchResults.set([]);
    this.searchState.isSearching.set(false);
  }
}