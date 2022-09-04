import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'plural'
})
export class PluralPipe implements PipeTransform {

  //Pass for exaple word apple 
  //As argument pass number of apples 
  //If number of apples is larger than 1 then 's' will be appended to the end of the string

  transform(value: unknown, ...args: unknown[]): unknown {
    let itemCount = args[0];
    if((itemCount as Number) > 1)
      return value + "s"
    return value;
  }

}
