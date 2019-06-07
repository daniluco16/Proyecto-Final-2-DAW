import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchUser'
})
export class SearchUserPipe implements PipeTransform {

  transform(value: any, args?: any): any {

    if (!args) {
      return value;
    }
    return value.filter((val) => {
      let rVal = (val.rol.toLocaleLowerCase().includes(args.toLocaleLowerCase())) || 
      val.nick.toLocaleLowerCase().includes(args.toLocaleLowerCase()) || 
      val.surname.toLocaleLowerCase().includes(args.toLocaleLowerCase()) || 
      val.name.toLocaleLowerCase().includes(args.toLocaleLowerCase()) ||
      val.email.toLocaleLowerCase().includes(args.toLocaleLowerCase());
      return rVal;
    });
  }
}
