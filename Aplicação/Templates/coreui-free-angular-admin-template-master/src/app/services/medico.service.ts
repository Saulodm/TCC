import { BaseService } from './base.service';
import { UsuarioViewModel } from './../viewModels/usuarioViewModel';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MedicoService {

  constructor(private baseService: BaseService) { }

  inserirMedico(usuario: UsuarioViewModel, crm: string) {
    var param = {
      login: usuario.login,
      senha: usuario.senha,
      email: usuario.email,
      nome: usuario.nome,
      sobrenome: usuario.sobrenome,
      cpf: usuario.cpf,
      celular:usuario.celular,
      perfil: usuario.perfil,
      crm: crm
    };
    var med = JSON.stringify(param);
    var result = null
    this.baseService.httpPost("Medico/Register", med, res => {
      result = JSON.parse(res);
    })
    return result;
  }
}
