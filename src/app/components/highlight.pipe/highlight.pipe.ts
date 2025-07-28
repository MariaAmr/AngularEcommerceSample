// highlight.pipe.ts
import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "highlight",
  standalone: true,
})
export class HighlightPipe implements PipeTransform {
  transform(value: string, query: string): string {
    if (!query || !value) return value;

    const regex = new RegExp(query, "gi");
    return value.replace(
      regex,
      (match) =>
        `<span class="bg-yellow-200 dark:bg-yellow-600">${match}</span>`
    );
  }
}
