import { DependenteViewModel } from './../viewModels/dependenteViewModel';
import { BaseService } from './base.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DependenteService {

  constructor(private baseService: BaseService) { }

  postDependente(idUsuario: string, dependente: DependenteViewModel) {
    let object = {
      idusuario: idUsuario,
      nome: dependente.nome,
      datanascimento: dependente.dataNacimento,
      cpf: dependente.cpf
    }
    var param = JSON.stringify(object);
    var result = {};
    this.baseService.httpPost("Dependente/Register", param, (res => {
      result = JSON.parse(res);
    }));
    return result;
  }

  getDependentes(idUsuario: string) {
    var result = {};
    this.baseService.httpGet("Dependente/Consulta/" + idUsuario, res => {
      result = JSON.parse(res);
    })
    return result;
  }
}
