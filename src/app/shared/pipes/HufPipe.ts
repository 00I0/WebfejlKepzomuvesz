import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'huf',
  pure: false,
})
export class HufPipe implements PipeTransform {

  transform(value: any): string {
    return `${(+value).toFixed(0)} Ft`
  }

}
