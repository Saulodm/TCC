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
      cod: vacina.Cod,
      nome: vacina.Nome,
      data: vacina.Data,
      lote: vacina.Lote,
      dose: vacina.Dose
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

}
