import { Pipe, PipeTransform } from '@angular/core';
@Pipe({name: 'cardTransform'})
export class cardTransform implements PipeTransform{
  transform(num: string): string {
    console.log(typeof num)
    num = num.toString()
    let maskedNumbers = num.slice(0, -4);
    let visibleNumbers = num.slice(-4);
    return maskedNumbers.replace(/./g, '*') + visibleNumbers;

  }

}