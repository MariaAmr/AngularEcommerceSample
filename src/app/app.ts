import { Component, signal } from '@angular/core';
import { Navbar } from "./components/navbar/navbar";
import { Footer } from "./components/footer/footer";
import { OnInit } from "@angular/core";

import { RouterOutlet } from "@angular/router";



@Component({
  selector: "app-root",
  imports: [RouterOutlet, Navbar, Footer],
  templateUrl: "./app.html",
  styleUrl: "./app.css",
})
export class App implements OnInit {
  protected readonly title = signal("ecommerce-tailwind");

}
