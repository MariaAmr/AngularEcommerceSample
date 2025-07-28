import { AfterViewInit, Component, EventEmitter, Output } from '@angular/core';
import { initFlowbite } from "flowbite";
@Component({
  selector: "app-sort",
  imports: [],
  templateUrl: "./sort.html",
  styleUrl: "./sort.css",
})
export class Sort implements AfterViewInit {
  ngAfterViewInit() {
    // Initialize Flowbite dropdowns
    initFlowbite();
  }
  @Output() sortChange = new EventEmitter<string>();

  sort(type: string) {
    this.sortChange.emit(type);
  }
}
