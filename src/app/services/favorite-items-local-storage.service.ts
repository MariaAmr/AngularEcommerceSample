import {
  Injectable,
  signal,
  Inject,
  PLATFORM_ID,
  computed,
} from "@angular/core";
import { isPlatformBrowser } from "@angular/common";
import { Product } from "../../type";

@Injectable({
  providedIn: "root",
})
export class FavoriteItemsLocalStorageService {
  private readonly key = "ng_e_commerce_favorite_items";

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  favoriteItems = signal<Product[]>(this.loadItems());

  // Add this computed property
  favoriteItemsCount = computed(() => this.favoriteItems().length);
  private isLocalStorageAvailable(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      try {
        const testKey = "__test__";
        localStorage.setItem(testKey, testKey);
        localStorage.removeItem(testKey);
        return true;
      } catch (e) {
        return false;
      }
    }
    return false;
  }

  private loadItems(): Product[] {
    if (!isPlatformBrowser(this.platformId)) return [];

    try {
      const data = localStorage.getItem(this.key);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      console.error("Error accessing localStorage:", e);
      return [];
    }
  }

  private saveItems(items: Product[]) {
    if (isPlatformBrowser(this.platformId)) {
      try {
        localStorage.setItem(this.key, JSON.stringify(items));
      } catch (e) {
        console.error("Error saving to localStorage:", e);
      }
    }
    this.favoriteItems.set(items);
  }

  addItem(item: Product) {
    const items = [...this.favoriteItems()];
    items.push(item);
    this.saveItems(items);
  }

  removeItem(item: Product) {
    const newItems = this.favoriteItems().filter((i) => i.id !== item.id);
    this.saveItems(newItems);
  }

  updateItem(item: Product) {
    const newItems = this.favoriteItems().map((i) => {
      if (i.id !== item.id) {
        return i;
      } else {
        return item;
      }
    });
    this.saveItems(newItems);
  }

  clearItems() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem(this.key);
    }
    this.favoriteItems.set([]);
  }

  checkItemAlreadyExist(id: number) {
    return this.favoriteItems().some((ct) => ct.id === id);
  }
}
