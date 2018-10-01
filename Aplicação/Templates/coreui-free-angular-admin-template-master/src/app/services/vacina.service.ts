import { BaseService } from './base.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VacinaService {

  constructor(private baseService : BaseService) { }

  getVacinas(){
    var result;
    this.baseService.httpGet("Vacinas/", res => {
      result =  JSON.parse(res);
    })
    return result;
  }
}
