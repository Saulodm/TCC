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
  postUsuario(usuario: UsuarioViewModel): any {
    var user = JSON.stringify(usuario);
    var result = null
    this.baseService.httpPost("Usuario/Register", user, res => {
      result = JSON.parse(res);
    })
    return result;
  }

  getUsuario(id: string): any {
    var result;
    this.baseService.httpGet("Usuario/Consulta/" + id, res => {
      result = JSON.parse(res);
    })
    return result;
  }
  getAll(perfil) {
    var result;
    this.baseService.httpGet("Usuario/All/" + perfil, res => {
      result = JSON.parse(res);
    })
    return result;
  }
}
