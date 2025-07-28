import {
  computed,
  Injectable,
  signal,
  Inject,
  PLATFORM_ID,
} from "@angular/core";
import { isPlatformBrowser } from "@angular/common";
import { Product } from "../../type";

@Injectable({
  providedIn: "root",
})
export class ShoppingCartLocalStorageService {
  private readonly key = "ng_e_commerce_cart_items";

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  cartItems = signal<Product[]>(this.loadItems());

  cartItemQuantity = computed(() => {
    return this.cartItems().reduce((a, c) => {
      return a + (c?.quantity || 0);
    }, 0);
  });

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
    this.cartItems.set(items);
  }

  addItem(item: Product) {
    const items = [...this.cartItems()];
    items.push(item);
    this.saveItems(items);
  }

  removeItem(item: Product) {
    const newItems = this.cartItems().filter((i) => i.id !== item.id);
    this.saveItems(newItems);
  }

  updateItem(item: Product) {
    const newItems = this.cartItems().map((i) => {
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
    this.cartItems.set([]);
  }

  checkItemAlreadyExist(id: number) {
    return this.cartItems().some((ct) => ct.id === id);
  }
}
