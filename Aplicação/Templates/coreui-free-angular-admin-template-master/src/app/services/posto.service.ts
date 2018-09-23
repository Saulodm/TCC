import { BaseService } from './base.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PostoService {

  constructor(private baseService: BaseService) { }

  getPostos(nomeRegiao: string): any {
    var result;
    this.baseService.httpGet("Regiao/" + nomeRegiao.toUpperCase().replace("-", ""), res => {
      result =  JSON.parse(res);
    })
    return result;
  }
}
