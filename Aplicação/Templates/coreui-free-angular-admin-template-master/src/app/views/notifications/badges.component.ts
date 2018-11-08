import { Component, Inject } from '@angular/core';
import { SESSION_STORAGE, StorageService } from 'angular-webstorage-service';
import { VacinaService } from '../../services/vacina.service';
import { UsuarioService } from '../../services/usuario.service';
import { AcessoService } from '../../services/acesso.service';
import { DependenteService } from '../../services/dependente.service';
import * as moment from 'moment'
import 'moment/locale/pt-br';
import { VacinaAtrasoViewModel } from '../../viewModels/vacinaAtrasoViewModel';
import { StorageKeys } from '../../../shared/storage-keys';

@Component({
  templateUrl: 'badges.component.html'
})
export class BadgesComponent {

  listaAcesso: any[];
  listaDependente: any[];
  listaAtraso: VacinaAtrasoViewModel[];
  listaVacinas: any[];

  constructor(@Inject(SESSION_STORAGE)
  public storage: StorageService,
    private vacinaService: VacinaService,
    private usuarioService: UsuarioService,
    private acessoService: AcessoService,
    private dependenteService: DependenteService) {
    moment.locale('pt-BR');
    this.listaAcesso = [];
    this.listaAtraso = [];
    this.listaDependente = [];
    this.listaVacinas = [];
    this.listaVacinas = this.vacinaService.getVacinas();
    this.listaAcesso = this.acessoService.getAcessosMedico(this.storage.get(StorageKeys.userId));
    this.preencheAtraso();
  }
  preencheAtraso() {
    this.listaAcesso.forEach(ac => {
      var atrasoPaciente = false;
      var atrasoDependente = false;
      var atraso = new VacinaAtrasoViewModel();
      atraso.nomePaciente = ac.nomepaciente;
      atrasoPaciente = this.verificaAtraso(this.vacinaService.getCartaoVacina(ac.idpaciente), undefined);


      this.listaDependente = [];
      this.listaDependente = this.dependenteService.getDependentes(ac.idpaciente) as Array<any>;
      this.listaDependente.forEach(dp => {
        if (this.verificaAtraso(this.vacinaService.getCartaoVacina(dp._id), dp)) {
          atrasoDependente = true;
          atraso.dependentes.push(dp.nome);
        }
      })
      if (atrasoPaciente || atrasoDependente)
        this.listaAtraso.push(atraso);
    });
  }

  verificaAtraso(listaVacina: any[], dependente: any): boolean {
    var possuiAtraso = false
    possuiAtraso = listaVacina.length == 0;
    if (listaVacina.length > 0) {
      this.listaVacinas.forEach(vc => {
        if (possuiAtraso == false) {
          switch (vc.cod) {
            case 1:
              var vcp = listaVacina.find(function (vs) {
                return vs.cod == vc.cod;
              });
              if (dependente == undefined)
                possuiAtraso = vcp == undefined;
              else {
                possuiAtraso = this.validaVacinaDeveSerTomada(dependente, vc, vcp == undefined);
              }
              break;
            case 2:
              var vcp = listaVacina.find(function (vs) {
                return vs.cod == vc.cod;
              });
              if (dependente == undefined)
                possuiAtraso = vcp == undefined;
              else {
                possuiAtraso = this.validaVacinaDeveSerTomada(dependente, vc, vcp == undefined);
              }
              break;
            case 3:
              var vcp = listaVacina.find(function (vs) {
                return vs.cod == vc.cod;
              });
              if (dependente == undefined)
                possuiAtraso = vcp == undefined;
              else {
                possuiAtraso = this.validaVacinaDeveSerTomada(dependente, vc, vcp == undefined);
              }
              break;
            case 4:
              var vcp = listaVacina.find(function (vs) {
                return vs.cod == vc.cod;
              });
              if (dependente == undefined)
                possuiAtraso = vcp == undefined;
              else {
                possuiAtraso = this.validaVacinaDeveSerTomada(dependente, vc, vcp == undefined);
              }
              break;
            case 5:
              var vcp = listaVacina.find(function (vs) {
                return vs.cod == vc.cod;
              });
              if (dependente == undefined)
                possuiAtraso = vcp == undefined;
              else {
                possuiAtraso = this.validaVacinaDeveSerTomada(dependente, vc, vcp == undefined);
              }
              break;
            case 6:
              var vcp = listaVacina.find(function (vs) {
                return vs.cod == vc.cod;
              });
              if (dependente == undefined)
                possuiAtraso = vcp == undefined;
              else {
                possuiAtraso = this.validaVacinaDeveSerTomada(dependente, vc, vcp == undefined);
              }
            case 7:
              var vcp = listaVacina.find(function (vs) {
                return vs.cod == vc.cod;
              });
              if (dependente == undefined)
                possuiAtraso = vcp == undefined;
              else {
                possuiAtraso = this.validaVacinaDeveSerTomada(dependente, vc, vcp == undefined);
              }
              break;
            case 8:
              var vcp = listaVacina.find(function (vs) {
                return vs.cod == vc.cod;
              });
              if (dependente == undefined)
                possuiAtraso = vcp == undefined;
              else {
                possuiAtraso = this.validaVacinaDeveSerTomada(dependente, vc, vcp == undefined);
              }
              break;
            case 9:
              var vcp = listaVacina.find(function (vs) {
                return vs.cod == vc.cod;
              });
              if (dependente == undefined)
                possuiAtraso = vcp == undefined;
              else {
                possuiAtraso = this.validaVacinaDeveSerTomada(dependente, vc, vcp == undefined);
              }
              break;
            case 10:
              var vcp = listaVacina.find(function (vs) {
                return vs.cod == vc.cod;
              });
              if (dependente == undefined)
                possuiAtraso = vcp == undefined;
              else {
                possuiAtraso = this.validaVacinaDeveSerTomada(dependente, vc, vcp == undefined);
              }
              break;
          }
        }
      });

    }
    return possuiAtraso;
  }
  validaVacinaDeveSerTomada(dependente: any, vacina: any, naopossui: boolean): boolean {
    var nascimento = moment(dependente.datanascimento);
    var now = moment();
    if (naopossui == true && now.subtract(vacina.idade, 'months') >= nascimento) {
      return true;
    } else {
      return false;
    }
  }
}
