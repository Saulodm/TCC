import { Component, OnInit, Inject } from '@angular/core';
import { getStyle, rgbToHex } from '@coreui/coreui/dist/js/coreui-utilities';
import { StorageService, SESSION_STORAGE } from 'angular-webstorage-service';
import { UsuarioService } from '../../services/usuario.service';
import { AcessoService } from '../../services/acesso.service';
import { StorageKeys } from '../../../shared/storage-keys';
import { AcessoViewModel } from '../../viewModels/acessoViewModel';

@Component({
  templateUrl: 'colors.component.html'
})
export class ColorsComponent implements OnInit {

  listaSolitacoes: any[];
  constructor(
    @Inject(SESSION_STORAGE)
    public storage: StorageService,
    private usuarioService: UsuarioService,
    private acessoService: AcessoService) {

  }

  ngOnInit(): void {

    this.refreshConsulta();
  }
  refreshConsulta() {
    this.listaSolitacoes = [];
    this.listaSolitacoes = this.acessoService.getAcessosPaciente(this.storage.get(StorageKeys.userId));
  }
  negarSolicitacao(id: string) {
    this.acessoService.deleteSolicitacao(id);
    alert("Solicitação negada com sucesso.");
    this.refreshConsulta();
  }
  permitirSolicitacao(acesso: AcessoViewModel) {
    acesso.tipoacesso = 2;
    this.acessoService.updateAcesso(acesso);
    alert("Solicitação de acesso concedida.");
    this.refreshConsulta();
  }
}
