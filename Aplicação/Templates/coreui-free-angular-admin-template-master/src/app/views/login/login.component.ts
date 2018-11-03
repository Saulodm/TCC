import { DependenteService } from './../../services/dependente.service';
import { VacinaService } from './../../services/vacina.service';
import { StorageKeys } from './../../../shared/storage-keys';
import { LoginService } from './../../services/login.service';
import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { BsModalRef, ModalOptions, BsModalService } from 'ngx-bootstrap/modal';
import * as ngxbootstrap from 'ngx-bootstrap'
import { SESSION_STORAGE, StorageService } from 'angular-webstorage-service';
import { Inject } from '@angular/core';
import * as moment from 'moment'
import 'moment/locale/pt-br';
@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html'
})
export class LoginComponent {

  /**
   *
   */

  listaVacinas: any[]
  vacinasEmAtrasoUsuario: boolean = false;
  vacinasEmAtrasoDependente: boolean = false;
  listaVacinasUsuario: any[];
  listaVacinasDependente: any[];
  listaDependente: any[];
  public emailConfirmacao: string;
  public usuario: string;
  public senha: string;
  modal: BsModalRef;
  private usuarioBusca: any;

  constructor( @Inject(SESSION_STORAGE)
  public storage: StorageService,
    public modalService: BsModalService,
    private vacinaService: VacinaService,
    private dependenteService: DependenteService,
    public router: Router,
    public loginService: LoginService,
  ) {
    moment.locale('pt-BR');
    this.listaVacinasDependente = [];
    this.listaDependente = [];
    this.listaVacinasUsuario = [];
    this.listaVacinas = [];
    this.listaVacinas = this.vacinaService.getVacinas();

  }

  openModal(content: any) {

    let options: ModalOptions = {
      backdrop: "static",
      keyboard: false,
      ignoreBackdropClick: true,
      animated: true
    }
    this.modal = this.modalService.show(content, options);
  }
  closeModal() {
    this.modal.hide();
  }
  exibirMensagem() {
    var result = this.loginService.getUsuarioPorEmail(this.emailConfirmacao);
    if (result.length == 0) {
      alert("Email não cadastrado!");
    } else {
      this.usuarioBusca = result[0];
      if (this.usuarioBusca.email == this.emailConfirmacao) {
        alert("As instruções de redefinição de senha foram enviadas para o email: " + this.emailConfirmacao);
      } else {
        alert("Email não cadastrado!");
      }
    }

  }
  desabilitaButaoEnviar() {
    return this.emailConfirmacao == undefined
  }
  desabilitaButaoLogar() {
    return (this.usuario == undefined || this.senha == undefined || this.usuario == "" || this.senha == "");
  }
  logar() {
    var result = this.loginService.getUsuario(this.usuario);
    if (result.length == 0) {
      alert("Usuario inválido!");
    } else {
      this.usuarioBusca = result[0];
      if (this.usuarioBusca.senha == this.senha) {

        this.storage.set(StorageKeys.userId, this.usuarioBusca._id);
        if(this.usuarioBusca.perfil == 1){

          this.consultarVacinasUsuario(this.usuarioBusca._id);
          this.consultarVacinasDependentes(this.usuarioBusca._id);
        }
        this.router.navigate(['home']);
      } else {
        alert("Senha inválida!");
      }
    }

    //this.router.navigate(['register']);
  }
  registrar() {
    this.router.navigate(['register']);
  }

  consultarVacinasUsuario(id) {
    this.listaVacinasUsuario = this.vacinaService.getCartaoVacina(id);
    this.listaVacinas.forEach(v => {
      var result = this.listaVacinasUsuario.find(function (vs) {
        return vs.cod == v.cod;
      });
      if (this.vacinasEmAtrasoUsuario == false) {
        if (result == undefined) {
          this.vacinasEmAtrasoUsuario = true;
          alert("Você possui vacinas em atraso. Procure o posto de saúde para colocar a vacinação em dia.");
        }
      }
    });
  }

  consultarVacinasDependentes(id) {
    this.listaDependente = this.dependenteService.getDependentes(id) as Array<any>;
    if (this.listaDependente.length > 0) {
      this.listaDependente.forEach(dp => {
        this.listaVacinasDependente = this.vacinaService.getCartaoVacina(dp._id);
        this.listaVacinas.forEach(v => {
          var result = this.listaVacinasDependente.find(function (vd) {
            return vd.cod == v.cod;
          });
          if (this.vacinasEmAtrasoDependente == false) {
            var nascimento = moment(dp.datanascimento);
            var now = moment();
            if (result == undefined && now.subtract(v.idade, 'months') >= nascimento) {
              this.vacinasEmAtrasoDependente = true;
              alert("Seus dependentes possuem vacinas em atraso. Procure o posto de saúde para colocar a vacinação em dia.");
            }
          }
        });
      });
    }
  }
}
