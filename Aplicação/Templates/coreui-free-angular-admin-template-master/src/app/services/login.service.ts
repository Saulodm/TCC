import { BaseService } from './base.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private baseService: BaseService) { }

  getUsuario(login: string): any {
    var result;
    this.baseService.httpGet("Usuario/" + login, res => {
      result =  JSON.parse(res);
    })
    return result;
  }
  getUsuarioPorEmail(email: string){
    var result;
    this.baseService.httpGet("Usuario/Email/" + email, res => {
      result =  JSON.parse(res);
    })
    return result;
  }
}
