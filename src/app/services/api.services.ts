import { Injectable } from "@angular/core";
import { Product } from "../../type";

@Injectable({
  providedIn: "root",
})
export class ApiService {
  private url = "https://fakestoreapi.com";

  async getProducts(category?: string): Promise<Product[]> {
    const data = await fetch(
      category
        ? `${this.url}/products/category/${category}`
        : `${this.url}/products`
    );
    return (await data.json()) ?? [];
  }

  async getProductsWithLimit(
    limit: number,
    category?: string
  ): Promise<Product[]> {
    const data = await fetch(
      category
        ? `${this.url}/products/category/${category}?limit=${limit}`
        : `${this.url}/products?limit=${limit}`
    );
    return (await data.json()) ?? [];
  }
  async searchProducts(query: string): Promise<Product[]> {
    // If your API supports search, use this instead:
    // const data = await fetch(`${this.url}/products?q=${query}`);
    // return (await data.json()) ?? [];

    // Fallback to client-side filtering
    const allProducts = await this.getProducts();
    return allProducts.filter(
      (product) =>
        product.title.toLowerCase().includes(query.toLowerCase()) ||
        product.description.toLowerCase().includes(query.toLowerCase()) ||
        product.category.toLowerCase().includes(query.toLowerCase())
    );
  }

  async getProductById(id: string): Promise<Product | null> {
    const data = await fetch(`${this.url}/products/${id}`);
    return (await data.json()) ?? null;
  }
}
