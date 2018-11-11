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
  isEditando: boolean = false;
  constructor(@Inject(SESSION_STORAGE)
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
    this.dependente = new DependenteViewModel();
    this.consultaDependentes();
  }
  consultaDependentes() {
    this.listaDepedentes = [];
    var result = this.dependenteService.getDependentes(this.storage.get(StorageKeys.userId)) as Array<any>;
    result.forEach(dp => {
      dp.datanascimento = Util.FormataData(dp.datanascimento);
      this.listaDepedentes.push(dp);
    });
  }

  deletarDependente(id: string) {
    this.dependenteService.deleteDependente(id);
    alert("Dependente removido");
    this.consultaDependentes();
  }
  editarDependente(n: DependenteViewModel) {
    this.isEditando = true;
    this.dependente = n;
    this.dependente.datanascimento = Util.DesformataData(n.datanascimento);

  }
  validaCadastro() {

    if (this.dependente.nome == undefined || this.dependente.nome == "") {
      return false;
    }
    if (this.dependente.cpf == undefined || this.dependente.cpf == "") {
      return false;
    }
    if (this.dependente.datanascimento == undefined || this.dependente.datanascimento == "") {
      return false;
    }
    return true;
  }
  salvar() {
    if (this.validaCadastro()) {
      var result = this.dependenteService.updateDependente(this.dependente);
      alert("Dados alterados!");
      this.isEditando = false;
      this.dependente = new DependenteViewModel();
      this.consultaDependentes();
    } else {
      alert("Campos para o cadastro não preenchidos.")
    }
  }
  cancelar() {
    this.isEditando = false;
    this.dependente = new DependenteViewModel();

  }

}
