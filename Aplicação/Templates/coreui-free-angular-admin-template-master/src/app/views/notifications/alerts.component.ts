import { AcessoService } from './../../services/acesso.service';
import { Component, SecurityContext, ViewEncapsulation, Inject } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { AlertConfig } from 'ngx-bootstrap/alert';
import { VacinaCartaoViewModel } from '../../viewModels/vacinaCartaoViewModel';
import { VacinaViewModel } from '../../viewModels/vacinaViewModel';
import { StorageService, SESSION_STORAGE } from 'angular-webstorage-service';
import { VacinaService } from '../../services/vacina.service';
import { UsuarioService } from '../../services/usuario.service';
import { DependenteService } from '../../services/dependente.service';
import * as moment from 'moment'
import 'moment/locale/pt-br';
import { StorageKeys } from '../../../shared/storage-keys';
import { Util } from '../../../shared/util';
// such override allows to keep some initial values

export function getAlertConfig(): AlertConfig {
  return Object.assign(new AlertConfig(), { type: 'success' });
}

@Component({
  templateUrl: 'alerts.component.html',
  encapsulation: ViewEncapsulation.None,
  providers: [{ provide: AlertConfig, useFactory: getAlertConfig }]
})
export class AlertsComponent {
  public dependenteSelecionado: any;
  public pacienteSelecionado: any;
  public pesquisado: boolean = false;


  listaVacinas: any[];
  listaVacinasDrop: any[];
  listaVacinasPaciente: any[];
  listaDependentes: any[];
  listaPacientes: any[];
  listaAcessoMedico: any[];
  nomePaciente: string;
  public AntimeningococicaCConjugada: VacinaViewModel = new VacinaViewModel();
  public Antipneumococica10ValenteConjugada: VacinaViewModel = new VacinaViewModel();
  public BCGID: VacinaViewModel = new VacinaViewModel();
  public DTP: VacinaViewModel = new VacinaViewModel();
  public FebreAmarela: VacinaViewModel = new VacinaViewModel();
  public HepatitieB: VacinaViewModel = new VacinaViewModel();
  public SRC: VacinaViewModel = new VacinaViewModel();
  public Tetravalente: VacinaViewModel = new VacinaViewModel();
  public VOP: VacinaViewModel = new VacinaViewModel();
  public VORH: VacinaViewModel = new VacinaViewModel();

  constructor(@Inject(SESSION_STORAGE)
  public storage: StorageService,
    private vacinaService: VacinaService,
    private usuarioService: UsuarioService,
    private acessoService: AcessoService,
    private dependenteService: DependenteService) {
    moment.locale('pt-BR');
    this.dependenteSelecionado = null;
    this.pacienteSelecionado = null;


    this.listaVacinas = vacinaService.getVacinas();
    this.listaVacinasPaciente = [];
    this.listaVacinasDrop = [];
    this.listaPacientes = [];
    this.listaDependentes = [];
    this.listaAcessoMedico = [];
    this.listaAcessoMedico = this.acessoService.getAcessosMedico(this.storage.get(StorageKeys.userId));

    this.listaPacientes.push(... this.listaAcessoMedico);
  }

  consultar() {
    this.listaVacinasPaciente = [];
    this.limparVacinas();
    if (this.dependenteSelecionado == null) {

      var result = this.vacinaService.getCartaoVacina(this.pacienteSelecionado.idpaciente);
      result.forEach(vc => {
        vc.lote = vc.lote.toUpperCase();
        vc.data = Util.FormataData(vc.data);
        this.listaVacinasPaciente.push(vc);
      });
      
      this.nomePaciente = this.pacienteSelecionado.nomepaciente.trim();
    } else {
      var result = this.vacinaService.getCartaoVacina(this.dependenteSelecionado._id);
      this.nomePaciente = this.dependenteSelecionado.nome;
      result.forEach(vc => {
        vc.lote = vc.lote.toUpperCase();
        vc.data = Util.FormataData(vc.data);
        this.listaVacinasPaciente.push(vc);
      });
    }
    if (this.listaVacinasPaciente.length > 0) {
      this.listaVacinas.forEach(vc => {
        switch (vc.cod) {
          case 1:
            var vcp = this.listaVacinasPaciente.find(function (vs) {
              return vs.cod == vc.cod;
            });
            if (vcp) {
              this.AntimeningococicaCConjugada.Nome = vcp.nome;
              this.AntimeningococicaCConjugada.Lote = vcp.lote;
              this.AntimeningococicaCConjugada.Data = vcp.data;
              this.AntimeningococicaCConjugada.Dose = vcp.dose;
            } else {
              this.AntimeningococicaCConjugada.Nome = vc.nome;
            }
            if (this.dependenteSelecionado == null)
              this.AntimeningococicaCConjugada.EmAtraso = vcp == undefined;
            else {
              this.AntimeningococicaCConjugada.EmAtraso = this.validaVacinaDeveSerTomada(vc, vcp == undefined);
            }
            break;
          case 2:
            var vcp = this.listaVacinasPaciente.find(function (vs) {
              return vs.cod == vc.cod;
            });
            if (vcp) {
              this.Antipneumococica10ValenteConjugada.Nome = vcp.nome;
              this.Antipneumococica10ValenteConjugada.Lote = vcp.lote;
              this.Antipneumococica10ValenteConjugada.Data = vcp.data;
              this.Antipneumococica10ValenteConjugada.Dose = vcp.dose;
            } else {
              this.Antipneumococica10ValenteConjugada.Nome = vc.nome;
            }
            if (this.dependenteSelecionado == null)
              this.Antipneumococica10ValenteConjugada.EmAtraso = vcp == undefined;
            else {
              this.Antipneumococica10ValenteConjugada.EmAtraso = this.validaVacinaDeveSerTomada(vc, vcp == undefined);
            }
            break;
          case 3:
            var vcp = this.listaVacinasPaciente.find(function (vs) {
              return vs.cod == vc.cod;
            });
            if (vcp) {
              this.BCGID.Nome = vcp.nome;
              this.BCGID.Lote = vcp.lote;
              this.BCGID.Data = vcp.data;
              this.BCGID.Dose = vcp.dose;
            } else {
              this.BCGID.Nome = vc.nome;
            }
            if (this.dependenteSelecionado == null)
              this.BCGID.EmAtraso = vcp == undefined;
            else {
              this.BCGID.EmAtraso = this.validaVacinaDeveSerTomada(vc, vcp == undefined);
            }
            break;
          case 4:
            var vcp = this.listaVacinasPaciente.find(function (vs) {
              return vs.cod == vc.cod;
            });
            if (vcp) {
              this.DTP.Nome = vcp.nome;
              this.DTP.Lote = vcp.lote;
              this.DTP.Data = vcp.data;
              this.DTP.Dose = vcp.dose;
            } else {
              this.DTP.Nome = vc.nome;
            }
            if (this.dependenteSelecionado == null)
              this.DTP.EmAtraso = vcp == undefined;
            else {
              this.DTP.EmAtraso = this.validaVacinaDeveSerTomada(vc, vcp == undefined);
            }
            break;
          case 5:
            var vcp = this.listaVacinasPaciente.find(function (vs) {
              return vs.cod == vc.cod;
            });
            if (vcp) {
              this.FebreAmarela.Nome = vcp.nome;
              this.FebreAmarela.Lote = vcp.lote;
              this.FebreAmarela.Data = vcp.data;
              this.FebreAmarela.Dose = vcp.dose;
            } else {
              this.FebreAmarela.Nome = vc.nome;
            }
            if (this.dependenteSelecionado == null)
              this.FebreAmarela.EmAtraso = vcp == undefined;
            else {
              this.FebreAmarela.EmAtraso = this.validaVacinaDeveSerTomada(vc, vcp == undefined);
            }
            break;
          case 6:
            var vcp = this.listaVacinasPaciente.find(function (vs) {
              return vs.cod == vc.cod;
            });
            if (vcp) {
              this.HepatitieB.Nome = vcp.nome;
              this.HepatitieB.Lote = vcp.lote;
              this.HepatitieB.Data = vcp.data;
              this.HepatitieB.Dose = vcp.dose;
            } else {
              this.HepatitieB.Nome = vc.nome;
            }
            if (this.dependenteSelecionado == null)
              this.HepatitieB.EmAtraso = vcp == undefined;
            else {
              this.HepatitieB.EmAtraso = this.validaVacinaDeveSerTomada(vc, vcp == undefined);
            }
            break;
          case 7:
            var vcp = this.listaVacinasPaciente.find(function (vs) {
              return vs.cod == vc.cod;
            });
            if (vcp) {
              this.SRC.Nome = vcp.nome;
              this.SRC.Lote = vcp.lote;
              this.SRC.Data = vcp.data;
              this.SRC.Dose = vcp.dose;
            } else {
              this.SRC.Nome = vc.nome;
            }
            if (this.dependenteSelecionado == null)
              this.SRC.EmAtraso = vcp == undefined;
            else {
              this.SRC.EmAtraso = this.validaVacinaDeveSerTomada(vc, vcp == undefined);
            }
            break;
          case 8:
            var vcp = this.listaVacinasPaciente.find(function (vs) {
              return vs.cod == vc.cod;
            });
            if (vcp) {
              this.Tetravalente.Nome = vcp.nome;
              this.Tetravalente.Lote = vcp.lote;
              this.Tetravalente.Data = vcp.data;
              this.Tetravalente.Dose = vcp.dose;
            } else {
              this.Tetravalente.Nome = vc.nome;
            }
            if (this.dependenteSelecionado == null)
              this.Tetravalente.EmAtraso = vcp == undefined;
            else {
              this.Tetravalente.EmAtraso = this.validaVacinaDeveSerTomada(vc, vcp == undefined);
            }
            break;
          case 9:
            var vcp = this.listaVacinasPaciente.find(function (vs) {
              return vs.cod == vc.cod;
            });
            if (vcp) {
              this.VOP.Nome = vcp.nome;
              this.VOP.Lote = vcp.lote;
              this.VOP.Data = vcp.data;
              this.VOP.Dose = vcp.dose;
            } else {
              this.VOP.Nome = vc.nome;
            }
            if (this.dependenteSelecionado == null)
              this.VOP.EmAtraso = vcp == undefined;
            else {
              this.VOP.EmAtraso = this.validaVacinaDeveSerTomada(vc, vcp == undefined);
            }
            break;
          case 10:
            var vcp = this.listaVacinasPaciente.find(function (vs) {
              return vs.cod == vc.cod;
            });
            if (vcp) {
              this.VORH.Nome = vcp.nome;
              this.VORH.Lote = vcp.lote;
              this.VORH.Data = vcp.data;
              this.VORH.Dose = vcp.dose;
            } else {
              this.VORH.Nome = vc.nome;
            }
            if (this.dependenteSelecionado == null)
              this.VORH.EmAtraso = vcp == undefined;
            else {
              this.VORH.EmAtraso = this.validaVacinaDeveSerTomada(vc, vcp == undefined);
            }
            break;
        }

      });

    }
    this.pesquisado = true;
  }

  limparVacinas() {
    this.AntimeningococicaCConjugada = new VacinaViewModel();
    this.Antipneumococica10ValenteConjugada = new VacinaViewModel();
    this.BCGID = new VacinaViewModel();
    this.DTP = new VacinaViewModel();
    this.FebreAmarela = new VacinaViewModel();
    this.HepatitieB = new VacinaViewModel();
    this.SRC = new VacinaViewModel();
    this.Tetravalente = new VacinaViewModel();
    this.VOP = new VacinaViewModel();
    this.VORH = new VacinaViewModel();
  }
  validaVacinaDeveSerTomada(vacina: any, naopossui: boolean): boolean {
    var nascimento = moment(this.dependenteSelecionado.datanascimento);
    var now = moment();
    if (naopossui == true && now.subtract(vacina.idade, 'months') >= nascimento) {
      return true;
    } else {
      return false;
    }
  }
  getDependentes() {
    this.listaDependentes = this.dependenteService.getDependentes(this.pacienteSelecionado.idpaciente) as Array<any>;
    this.dependenteSelecionado = null;
  }

}
