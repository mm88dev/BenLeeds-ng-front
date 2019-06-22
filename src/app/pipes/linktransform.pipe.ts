import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nospace'
})
export class LinktransformPipe implements PipeTransform {
  transform(value: string): string {
    let words = value.split(' ');
    for (let i = 0; i < words.length; i++) {
      words[i] = words[i].toLowerCase();
    }
    return words.join('');
  }
}
