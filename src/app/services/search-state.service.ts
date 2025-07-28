// search-state.service.ts
import { Injectable, signal } from "@angular/core";
import { Product } from "../../type";

@Injectable({ providedIn: "root" })
export class SearchStateService {
  isSearching = signal(false);
  searchResults = signal<Product[]>([]);
  searchTerm = signal("");
  currentCategory = signal<string | null>(null);
}
