import { Injectable, Inject, PLATFORM_ID } from "@angular/core";
import { isPlatformBrowser } from "@angular/common";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ThemeService {
  private isDarkModeSubject = new BehaviorSubject<boolean>(false);
  isDarkMode$ = this.isDarkModeSubject.asObservable();

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.initializeTheme();
  }

  private initializeTheme() {
    if (isPlatformBrowser(this.platformId)) {
      const savedTheme = localStorage.getItem("theme");
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;

      // Default to dark if saved theme is dark or no preference but OS prefers dark
      const initialDarkMode =
        savedTheme === "dark" || (!savedTheme && prefersDark);
      this.isDarkModeSubject.next(initialDarkMode);
      this.applyTheme(initialDarkMode);
    }
  }

  toggleTheme() {
    const newMode = !this.isDarkModeSubject.value;
    this.isDarkModeSubject.next(newMode);
    this.applyTheme(newMode);
  }

  private applyTheme(isDark: boolean) {
    if (isPlatformBrowser(this.platformId)) {
      const theme = isDark ? "dark" : "light";

      // For DaisyUI v5+
      document.documentElement.setAttribute("data-theme", theme);

      // Also maintain the dark class for Tailwind dark mode utilities if needed
      if (isDark) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }

      localStorage.setItem("theme", theme);
    }
  }
}
