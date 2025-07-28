import { Component } from "@angular/core";

@Component({
  selector: "app-product-card-skeleton",
  imports: [],
  template: ` <div class="card skeleton bg-base-100 w-full h-full shadow-sm">
    <figure>
      <div class="skeleton w-full h-[350px]"></div>
    </figure>
    <div class="card-body">
      <div class="skeleton w-full h-[35px]"></div>
      <div class="flex justify-between items-center">
        <div class="skeleton w-[80px] h-[20px]"></div>
        <div class="flex items-center gap-1">
          <div class="skeleton w-4 h-4 rounded-full"></div>
          <div class="skeleton w-4 h-4 rounded-full"></div>
          <div class="skeleton w-4 h-4 rounded-full"></div>
          <div class="skeleton w-4 h-4 rounded-full"></div>
          <div class="skeleton w-4 h-4 rounded-full"></div>
          <div class="skeleton w-6 h-4 ml-1"></div>
        </div>
      </div>
      <div class="skeleton w-full h-[100px]"></div>
      <div class="card-actions mt-4 w-full">
        <div class="flex items-center gap-x-2 w-full justify-between">
          <div class="flex items-center gap-x-2">
            <div class="skeleton w-8 h-8 rounded-full"></div>
            <div class="skeleton w-8 h-8 rounded-full"></div>
          </div>
          <div class="skeleton w-16 h-6"></div>
        </div>
        <div class="skeleton w-full h-10 mt-2"></div>
      </div>
    </div>
  </div>`,
})
export class ProductCardSkeletonComponent {}
