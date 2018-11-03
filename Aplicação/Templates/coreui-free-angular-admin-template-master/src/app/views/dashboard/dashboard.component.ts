import { StorageKeys } from './../../../shared/storage-keys';
import { StorageService, SESSION_STORAGE } from 'angular-webstorage-service';
import { DependenteService } from './../../services/dependente.service';
import { VacinaService } from './../../services/vacina.service';
import { element } from 'protractor';
import { RouterTestingModule } from '@angular/router/testing';
import { NoticiaService } from './../../services/noticia.service';
import { NoticiaViewModel } from './../../viewModels/noticiaViewModel';
import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { getStyle, hexToRgba } from '@coreui/coreui/dist/js/coreui-utilities';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import { BsModalRef, ModalOptions, BsModalService } from 'ngx-bootstrap/modal';
import * as ngxbootstrap from 'ngx-bootstrap'
import * as moment from 'moment'
import 'moment/locale/pt-br';

@Component({
  templateUrl: 'dashboard.component.html'
})
export class DashboardComponent implements OnInit {
 
  idUsuario
  listaNoticias: any[]; 
  noticia1: NoticiaViewModel;
  noticia2: NoticiaViewModel;
  noticia3: NoticiaViewModel;
  noticia4: NoticiaViewModel;
  noticia5: NoticiaViewModel;
  noticia6: NoticiaViewModel;
  visibleNoticia1: boolean = false;
  visibleNoticia2: boolean = false;
  visibleNoticia3: boolean = false;
  visibleNoticia4: boolean = false;
  visibleNoticia5: boolean = false;
  visibleNoticia6: boolean = false;
  constructor(
    @Inject(SESSION_STORAGE)
    public storage: StorageService,
    private noticiaService: NoticiaService,
   ) {
    moment.locale('pt-BR');

    this.listaNoticias = [];    
    this.noticia1 = new NoticiaViewModel();
    this.noticia2 = new NoticiaViewModel();
    this.noticia3 = new NoticiaViewModel();
    this.noticia4 = new NoticiaViewModel();
    this.noticia5 = new NoticiaViewModel();
    this.noticia6 = new NoticiaViewModel();
    this.idUsuario = this.storage.get(StorageKeys.userId);
    this.consutarNoticias();
   
  }
  ngOnInit(): void {
   
  }

  consutarNoticias() {
    this.listaNoticias = []
    var result = this.noticiaService.getNoticias();
    this.listaNoticias.push(...result);

    for (var index = 0; index < this.listaNoticias.length; index++) {
      var element = this.listaNoticias[index];
      switch (index) {
        case 0:
          this.noticia1.manchete = element.manchete;
          this.noticia1.texto = element.texto;
          this.noticia1.titulo = element.titulo;
          this.visibleNoticia1 = true;
          break;
        case 1:
          this.noticia2.manchete = element.manchete;
          this.noticia2.texto = element.texto;
          this.noticia2.titulo = element.titulo;
          this.visibleNoticia2 = true;
          break;
        case 2:
          this.noticia3.manchete = element.manchete;
          this.noticia3.texto = element.texto;
          this.noticia3.titulo = element.titulo;
          this.visibleNoticia3 = true;
          break;
        case 3:
          this.noticia4.manchete = element.manchete;
          this.noticia4.texto = element.texto;
          this.noticia4.titulo = element.titulo;
          this.visibleNoticia4 = true;
          break;
        case 4:
          this.noticia5.manchete = element.manchete;
          this.noticia5.texto = element.texto;
          this.noticia5.titulo = element.titulo;
          this.visibleNoticia5 = true;
          break;
        case 5:
          this.noticia6.manchete = element.manchete;
          this.noticia6.texto = element.texto;
          this.noticia6.titulo = element.titulo;
          this.visibleNoticia6 = true;
          break;

        default:
          break;
      }

    }
  }
  


}
