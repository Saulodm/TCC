import { AcessoViewModel } from './../viewModels/acessoViewModel';
import { BaseService } from './base.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AcessoService {

  constructor(private baseService: BaseService) { }

  postAcessoMedico(acesso: AcessoViewModel) {
    var post = JSON.stringify(acesso);
    var result = null
    this.baseService.httpPost("Acesso/Register", post, res => {
      result = JSON.parse(res);
    })
    return result;
  }
  getAcessosMedico(id: string) {
    var result;
    this.baseService.httpGet("Acesso/Medico/" + id, res => {
      result = JSON.parse(res);
    })
    return result;
  }
  deleteSolicitacao(id: string) {
    var result = {};
    this.baseService.httpDelete("Acesso/" + id, res => {
      result = JSON.parse(res);
    })
    return result;
  }
}
