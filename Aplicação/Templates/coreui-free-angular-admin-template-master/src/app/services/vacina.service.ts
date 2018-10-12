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
  postVacinaCartao(isUser: boolean, vacina: VacinaCartaoViewModel, idDependente: string): any {
    var result;
    var object = {}
    if (isUser) {
      object = {
        idpaciente: this.storage.get(StorageKeys.userId),
        nome: vacina.Nome,
        data: vacina.Data,
        lote: vacina.Lote,
        dose: vacina.Dose
      }
    } else {
      object = {
        idpaciente: idDependente,
        nome: vacina.Nome,
        data: vacina.Data,
        lote: vacina.Lote,
        dose: vacina.Dose
      }
    }
    var vacinaCartao = JSON.stringify(object);
    this.baseService.httpPost("Vacinas/Register", vacinaCartao, res => {
      result = res;
    })
    return result;
  }

}
