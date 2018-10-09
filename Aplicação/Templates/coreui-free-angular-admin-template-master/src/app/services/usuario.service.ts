import { UsuarioViewModel } from './../viewModels/usuarioViewModel';
import { BaseService } from './base.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private baseService: BaseService) { }

  getUsuarioLoginExists(login: string): any {
    var result;
    this.baseService.httpGet("Usuario/" + login, res => {
      result = JSON.parse(res);
    })
    return result.length > 0;
  }
  postUsuario(usuario: UsuarioViewModel) {
    var user =  JSON.stringify(usuario);
    this.baseService.httpPost("Usuario/Register", user, res => {
      console.log(res);
    })
  }
}
