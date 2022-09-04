import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dotNumber'
})
export class DotNumberPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    
    let breakNumber = 3;
    let counter = 1;
    let newValues: string[] = [];

    let number = value as String;
    
    for(let i = number.toString().length - 1; i >= 0; i--)
    {
      newValues.unshift(number.toString()[i]);

      if(counter == breakNumber && i > 0)
      {
        newValues.unshift(".");
        counter = 0;
      }

      counter++;
    }

    return newValues.join("");
  }

}
