import { StorageKeys } from './../../../shared/storage-keys';
import { StorageService, SESSION_STORAGE } from 'angular-webstorage-service';
import { DependenteService } from './../../services/dependente.service';
import { Util } from './../../../shared/util';
import { DependenteViewModel } from './../../viewModels/dependenteViewModel';
import { Component, Inject } from '@angular/core';
import { CarouselConfig } from 'ngx-bootstrap/carousel';

@Component({
  templateUrl: 'carousels.component.html', providers: [
    { provide: CarouselConfig, useValue: { interval: 1500, noPause: true } }
  ]
})
export class CarouselsComponent {

  dependente: DependenteViewModel;
  listaDepedentes: any[];
  constructor( @Inject(SESSION_STORAGE)
  public storage: StorageService,
    private dependenteService: DependenteService) {
    this.dependente = new DependenteViewModel();
    this.consultaDependentes();

  }

  CPFMask() {
    this.dependente.cpf = Util.MaskCpfCnpj(this.dependente.cpf);
  }
  cadastrar() {
    var result = this.dependenteService.postDependente(this.storage.get(StorageKeys.userId), this.dependente);
    alert("Cadastro Realizado");
    this.consultaDependentes();
  }
  consultaDependentes() {
    this.listaDepedentes= [];
    var result = this.dependenteService.getDependentes(this.storage.get(StorageKeys.userId)) as Array<any>;
    result.forEach(dp => {
      this.listaDepedentes.push(dp);
    });
  }
}
