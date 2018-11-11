import { NoticiaViewModel } from './../viewModels/noticiaViewModel';
import { BaseService } from './base.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NoticiaService {

  constructor(private baseService: BaseService) { }
  postNoticia(noticia: NoticiaViewModel): any {
    var user = JSON.stringify(noticia);
    var result = null
    this.baseService.httpPost("Noticia/Register", user, res => {
      result = JSON.parse(res);
    })
    return result;
  }

  getNoticias(): any {
    var result;
    this.baseService.httpGet("Noticias/", res => {
      result = JSON.parse(res);
    })
    return result;
  }

  deleteNoticia(id) {
    var result = {};
    this.baseService.httpDelete("Noticias/" + id, res => {
      result = JSON.parse(res);
    })
    return result;

  }
  updateNoticia(noticia: NoticiaViewModel): any{
    var user = JSON.stringify(noticia);
    var result = null
    this.baseService.httpPost("Noticia/Edit", user, res => {
      result = JSON.parse(res);
    })
    return result;
  }

}
