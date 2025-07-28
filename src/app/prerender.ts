// src/app/prerender.ts
import { HttpClient } from "@angular/common/http";
import { inject } from "@angular/core";

export function getPrerenderParams(): { id: string }[] {
  // For now return static IDs - we'll make this dynamic next
  return [{ id: "1" }, { id: "2" }, { id: "3" }];
}

// Optional: Dynamic version using HttpClient
export async function getDynamicPrerenderParams(): Promise<{ id: string }[]> {
  const http = inject(HttpClient);
  try {
    const products = await http
      .get<any[]>("https://fakestoreapi.com/products")
      .toPromise();
    return products?.map((p) => ({ id: p.id.toString() })) || [];
  } catch {
    return getPrerenderParams(); // Fallback to static IDs
  }
}
