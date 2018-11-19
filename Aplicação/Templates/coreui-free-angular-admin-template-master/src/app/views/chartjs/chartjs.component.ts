import { DependenteService } from './../../services/dependente.service';
import { Util } from './../../../shared/util';
import { UsuarioService } from './../../services/usuario.service';
import { StorageKeys } from './../../../shared/storage-keys';
import { StorageService, SESSION_STORAGE } from 'angular-webstorage-service';
import { VacinaCartaoViewModel } from './../../viewModels/vacinaCartaoViewModel';
import { VacinaService } from './../../services/vacina.service';
import { Component, Inject } from '@angular/core';
import { VacinaViewModel } from '../../viewModels/vacinaViewModel';
import * as moment from 'moment'
import 'moment/locale/pt-br';

@Component({
  templateUrl: 'chartjs.component.html'
})
export class ChartJSComponent {

  public dependenteSelecionado: any;
  public pesquisaEuMesmo: boolean = true;
  public vacinaSelecionada: any;
  isEditando: boolean = false;
  listaVacinas: any[];
  listaVacinasDrop: any[];
  listaVacinasPaciente: any[];
  listaDependentes: any[];
  isCadastrando: boolean = false;
  vacinaCadastro: VacinaCartaoViewModel;
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
    private dependenteService: DependenteService) {
    moment.locale('pt-BR');
    this.vacinaCadastro = new VacinaCartaoViewModel();
    this.dependenteSelecionado = null;
    this.vacinaSelecionada = null;
    this.listaVacinas = vacinaService.getVacinas();
    this.listaVacinasPaciente = [];
    this.listaVacinasDrop = [];


    this.listaDependentes = [];

    this.listaDependentes = this.dependenteService.getDependentes(this.storage.get(StorageKeys.userId)) as Array<any>;

    this.preencheDropVacinas();
    this.consultar();
  }

  cadastroShow() {
    this.isCadastrando = true;
  }
  cadastrar() {
    if (this.validaCadastro()) {
      this.isCadastrando = false;
      this.vacinaCadastro.nome = this.vacinaSelecionada.nome;
      this.vacinaCadastro.cod = this.vacinaSelecionada.cod;
      if (this.pesquisaEuMesmo) {
        this.vacinaService.postVacinaCartao(this.vacinaCadastro, this.storage.get(StorageKeys.userId));
      } else {
        this.vacinaService.postVacinaCartao(this.vacinaCadastro, this.dependenteSelecionado._id);

      }
      this.vacinaCadastro = new VacinaCartaoViewModel();
      this.vacinaSelecionada = null;
      this.consultar();
    }
  }

  consultar() {
    this.vacinaCadastro = new VacinaCartaoViewModel();
    this.isCadastrando = false;
    this.listaVacinasPaciente = [];
    this.limparVacinas();
    if (this.pesquisaEuMesmo) {

      var result = this.vacinaService.getCartaoVacina(this.storage.get(StorageKeys.userId));
      result.forEach(vc => {
        vc.lote = vc.lote.toUpperCase();
        vc.data = Util.FormataData(vc.data);
        this.listaVacinasPaciente.push(vc);
      });
      var paciente = this.usuarioService.getUsuario(this.storage.get(StorageKeys.userId))[0];
      this.nomePaciente = paciente.nome.trim() + " " + paciente.sobrenome.trim();
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
            if (this.pesquisaEuMesmo)
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
            if (this.pesquisaEuMesmo)
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
            if (this.pesquisaEuMesmo)
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
            if (this.pesquisaEuMesmo)
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
            if (this.pesquisaEuMesmo)
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
            if (this.pesquisaEuMesmo)
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
            if (this.pesquisaEuMesmo)
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
            if (this.pesquisaEuMesmo)
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
            if (this.pesquisaEuMesmo)
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
            if (this.pesquisaEuMesmo)
              this.VORH.EmAtraso = vcp == undefined;
            else {
              this.VORH.EmAtraso = this.validaVacinaDeveSerTomada(vc, vcp == undefined);
            }
            break;
        }

      });

    }
  }

  preencheDropVacinas() {
    var flags = {};
    this.listaVacinasDrop = this.listaVacinas.filter(function (entry) {
      if (flags[entry.nome]) {
        return false;
      }
      flags[entry.nome] = true;
      return true;
    });

  }
  validaCadastro() {
    if (this.vacinaSelecionada == null) {
      alert("Selecione a Vacina.");
      return false;

    }
    if (this.vacinaCadastro.data == undefined || this.vacinaCadastro.data == "") {
      alert("Informe a data de vacinação.");
      return false;

    }
    if (this.vacinaCadastro.lote == undefined || this.vacinaCadastro.lote == "") {
      alert("Informe o lote da vacina.");
      return false;

    }
    if (this.vacinaCadastro.dose == undefined || this.vacinaCadastro.dose == "") {
      alert("Informe a dose da vacina.");
      return false;

    }
    return true;
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
  deletarVacina(id: string) {
    this.vacinaService.deletarCartaoVacina(id);
    alert("Vacina removida");
    this.consultar();
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

  editarVacina(v: any) {
    this.isEditando = true;
    this.vacinaCadastro = v;
    this.vacinaCadastro.lote = v.lote;
    this.vacinaCadastro.dose = v.dose;
    this.vacinaCadastro.data = Util.DesformataData(v.data);

    this.listaVacinasDrop.forEach(vc => {
      if (vc.cod == v.cod)
        this.vacinaSelecionada = vc;
    })
  }
  salvar(){
    if (this.validaCadastro()) {
      this.isEditando = false;
      this.vacinaCadastro.nome = this.vacinaSelecionada.nome;
      this.vacinaCadastro.cod = this.vacinaSelecionada.cod;
      this.vacinaService.updateVacinaCartao(this.vacinaCadastro);
      this.vacinaCadastro = new VacinaCartaoViewModel();
      this.vacinaSelecionada = null;
      this.consultar();
    }
  }
  cancelar(){
    this.isEditando = false;    
    this.vacinaCadastro = new VacinaCartaoViewModel();
    this.vacinaSelecionada = null;
    this.consultar();
  }
}
