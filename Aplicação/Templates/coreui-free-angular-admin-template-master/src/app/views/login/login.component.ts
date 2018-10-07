import { LoginService } from './../../services/login.service';
import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { BsModalRef, ModalOptions, BsModalService } from 'ngx-bootstrap/modal';
import * as ngxbootstrap from 'ngx-bootstrap'


@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html'
})
export class LoginComponent {

  /**
   *
   */
  constructor(public modalService: BsModalService,
    public router: Router,
    private loginService: LoginService) {


  }
  public emailConfirmacao: string;
  public usuario: string;
  public senha: string;
  modal: BsModalRef;
  private usuarioBusca: any;



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
        this.router.navigate(['home']);
      } else {
        alert("Senha inválida!");
      }
    }

    //this.router.navigate(['register']);
  }
  registrar(){
    this.router.navigate(['register']);
  }
}
