import { Util } from './../../../shared/util';
import { UsuarioService } from './../../services/usuario.service';
import { StorageKeys } from './../../../shared/storage-keys';
import { StorageService, SESSION_STORAGE } from 'angular-webstorage-service';
import { VacinaCartaoViewModel } from './../../viewModels/vacinaCartaoViewModel';
import { VacinaService } from './../../services/vacina.service';
import { Component, Inject } from '@angular/core';
import { VacinaViewModel } from '../../viewModels/vacinaViewModel';

@Component({
  templateUrl: 'chartjs.component.html'
})
export class ChartJSComponent {

  public dependenteSelecionado: any;
  public pesquisaEuMesmo: boolean = true;
  public vacinaSelecionada: any;

  listaVacinas: any[];
  listaVacinasDrop: any[];
  listaVacinasPaciente: any[];
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

  constructor( @Inject(SESSION_STORAGE)
  public storage: StorageService,
    private vacinaService: VacinaService,
    private usuarioService: UsuarioService) {
    this.vacinaCadastro = new VacinaCartaoViewModel();
    this.dependenteSelecionado = null;
    this.vacinaSelecionada = null;
    this.listaVacinas = vacinaService.getVacinas();
    this.listaVacinasPaciente = [];
    this.listaVacinasDrop = [];


    this.preencheDropVacinas();
    this.consultar();
  }

  cadastroShow() {
    this.isCadastrando = true;
  }
  cadastrar() {
    if (this.validaCadastro()) {
      this.isCadastrando = false;
      this.vacinaCadastro.Nome = this.vacinaSelecionada.nome;
      this.vacinaCadastro.Cod = this.vacinaSelecionada.cod;
      if (this.pesquisaEuMesmo) {
        this.vacinaService.postVacinaCartao(this.vacinaCadastro, this.storage.get(StorageKeys.userId));
      } else {
        this.vacinaService.postVacinaCartao(this.vacinaCadastro, "");

      }
      this.vacinaCadastro = new VacinaCartaoViewModel();
      this.vacinaSelecionada = null;
      this.consultar();
    }
  }

  consultar() {
    if (this.pesquisaEuMesmo) {
      this.listaVacinasPaciente = this.vacinaService.getCartaoVacina(this.storage.get(StorageKeys.userId));
      var paciente = this.usuarioService.getUsuario(this.storage.get(StorageKeys.userId))[0];
      this.nomePaciente = paciente.nome.trim() + " " + paciente.sobrenome.trim();
    } else {
      this.listaVacinasPaciente = this.vacinaService.getCartaoVacina("");
      this.usuarioService.getUsuario("");
    }
    if (this.listaVacinasPaciente.length > 0) {
      this.listaVacinasPaciente.forEach(vc => {
        switch (vc.cod) {
          case 1:
            this.AntimeningococicaCConjugada.Nome = vc.nome;
            this.AntimeningococicaCConjugada.Lote = vc.lote.toUpperCase();
            this.AntimeningococicaCConjugada.Data = Util.FormataData(vc.data);
            this.AntimeningococicaCConjugada.Dose = vc.dose;
            break;
          case 2:
            this.Antipneumococica10ValenteConjugada.Nome = vc.nome;
            this.Antipneumococica10ValenteConjugada.Lote = vc.lote.toUpperCase();
            this.Antipneumococica10ValenteConjugada.Data = Util.FormataData(vc.data);
            this.Antipneumococica10ValenteConjugada.Dose = vc.dose;
            break;
          case 3:
            this.BCGID.Nome = vc.nome;
            this.BCGID.Lote = vc.lote.toUpperCase();
            this.BCGID.Data = Util.FormataData(vc.data);
            this.BCGID.Dose = vc.dose;
            break;
          case 4:
            this.DTP.Nome = vc.nome;
            this.DTP.Lote = vc.lote.toUpperCase();
            this.DTP.Data = Util.FormataData(vc.data);
            this.DTP.Dose = vc.dose;
            break;
          case 5:
            this.FebreAmarela.Nome = vc.nome;
            this.FebreAmarela.Lote = vc.lote.toUpperCase();
            this.FebreAmarela.Data = Util.FormataData(vc.data);
            this.FebreAmarela.Dose = vc.dose;
            break;
          case 6:
            this.HepatitieB.Nome = vc.nome;
            this.HepatitieB.Lote = vc.lote.toUpperCase();
            this.HepatitieB.Data = Util.FormataData(vc.data);
            this.HepatitieB.Dose = vc.dose;
            break;
          case 7:
            this.SRC.Nome = vc.nome;
            this.SRC.Lote = vc.lote.toUpperCase();
            this.SRC.Data = Util.FormataData(vc.data);
            this.SRC.Dose = vc.dose;
            break;
          case 8:
            this.Tetravalente.Nome = vc.nome;
            this.Tetravalente.Lote = vc.lote.toUpperCase();
            this.Tetravalente.Data = Util.FormataData(vc.data);
            this.Tetravalente.Dose = vc.dose;
            break;
          case 9:
            this.VOP.Nome = vc.nome;
            this.VOP.Lote = vc.lote.toUpperCase();
            this.VOP.Data = Util.FormataData(vc.data);
            this.VOP.Dose = vc.dose;
            break;
          case 10:
            this.VORH.Nome = vc.nome;
            this.VORH.Lote = vc.lote.toUpperCase();
            this.VORH.Data = Util.FormataData(vc.data);
            this.VORH.Dose = vc.dose;
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
    if (this.vacinaCadastro.Data == undefined || this.vacinaCadastro.Data == "") {
      alert("Informe a data de vacinação.");
      return false;

    }
    if (this.vacinaCadastro.Lote == undefined || this.vacinaCadastro.Lote == "") {
      alert("Informe o lote da vacina.");
      return false;

    }
    if (this.vacinaCadastro.Dose == undefined || this.vacinaCadastro.Lote == "") {
      alert("Informe a dose da vacina.");
      return false;

    }
    return true;
  }
}
