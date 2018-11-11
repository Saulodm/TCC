import { StorageKeys } from './../../shared/storage-keys';
import { VacinaCartaoViewModel } from './../viewModels/vacinaCartaoViewModel';
import { BaseService } from './base.service';
import { Injectable } from '@angular/core';
import { SESSION_STORAGE, StorageService } from 'angular-webstorage-service';
import { Inject } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VacinaService {

  constructor( @Inject(SESSION_STORAGE)
  public storage: StorageService, private baseService: BaseService) { }

  getVacinas() {
    var result;
    this.baseService.httpGet("Vacinas/", res => {
      result = JSON.parse(res);
    })
    return result;
  }
  postVacinaCartao(vacina: VacinaCartaoViewModel, idPaciente: string): any {
    var result;

    var object = {
      idpaciente: idPaciente,
      cod: vacina.cod,
      nome: vacina.nome,
      data: vacina.data,
      lote: vacina.lote,
      dose: vacina.dose
    }
    var vacinaCartao = JSON.stringify(object);
    this.baseService.httpPost("Vacinas/Register", vacinaCartao, res => {
      result = JSON.parse(res);
    })
    return result;
  }

  getCartaoVacina(id: string): any {
    var result;
    this.baseService.httpGet("Vacinas/Consulta/" + id, res => {
      result = JSON.parse(res);
    })
    return result;
  }

  deletarCartaoVacina(id: string) {
    var result;
    this.baseService.httpDelete("Vacinas/" + id, res => {
      result = JSON.parse(res);
    })
    return result;
  }
  updateVacinaCartao(vacina: VacinaCartaoViewModel){
    var param = JSON.stringify(vacina);
    var result = {};
    this.baseService.httpPost("Vacinas/Edit", param, (res => {
      result = JSON.parse(res);
    }));
    return result;
  }

}
