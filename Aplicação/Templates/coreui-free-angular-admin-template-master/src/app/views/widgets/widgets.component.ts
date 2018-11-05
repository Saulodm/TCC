import { element } from 'protractor';
import { AcessoService } from './../../services/acesso.service';
import { AcessoViewModel } from './../../viewModels/acessoViewModel';
import { StorageKeys } from './../../../shared/storage-keys';
import { StorageService, SESSION_STORAGE } from 'angular-webstorage-service';
import { UsuarioService } from './../../services/usuario.service';
import { Component, Inject } from '@angular/core';
import { getStyle } from '@coreui/coreui/dist/js/coreui-utilities';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';

@Component({
  templateUrl: 'widgets.component.html'
})
export class WidgetsComponent {
  public listaDrop: any[]
  public listaUsuarios: any[];
  public usuarioSelecionado: any;
  public listaSolitacoes: any[];
  constructor(
    @Inject(SESSION_STORAGE)
    public storage: StorageService,
    private usuarioService: UsuarioService,
    private acessoService: AcessoService) {
    this.listaUsuarios = [];
    this.listaDrop = [];
    this.listaSolitacoes = [];
    this.listaUsuarios = usuarioService.getAll(1);
    this.refreshDrop();
  }

  solicitar() {

    var acesso = new AcessoViewModel();
    var med = this.usuarioService.getUsuario(this.storage.get(StorageKeys.userId))[0];
    acesso.idmedico = med._id
    acesso.idpaciente = this.usuarioSelecionado._id;
    acesso.nomepaciente = this.usuarioSelecionado.nome + " " + this.usuarioSelecionado.sobrenome;
    acesso.nomemedico = med.nome + " " + med.sobrenome;
    acesso.tipoacesso = 1;

    this.acessoService.postAcessoMedico(acesso);
    alert("Solicitação enviada com sucesso.");
    this.refreshDrop();
  }

  consultar() {
    this.listaSolitacoes = this.acessoService.getAcessosMedico(this.storage.get(StorageKeys.userId));
  }

  deletarSolicitacao(id) {
    this.acessoService.deleteSolicitacao(id);
    alert("Solicitação cancelada com sucesso.");
    this.refreshDrop();
  }
  refreshDrop() {
    this.listaDrop = [];
    this.listaUsuarios = this.usuarioService.getAll(1);

    this.consultar();
    this.listaUsuarios.forEach(element => {
      var result = this.listaSolitacoes.find(function (s) {
        return s.idpaciente == element._id;
      });
      if (element.perfil == 1 && result == undefined) {
        this.listaDrop.push(element);
      }
    });
    this.usuarioSelecionado = null
  }

}
