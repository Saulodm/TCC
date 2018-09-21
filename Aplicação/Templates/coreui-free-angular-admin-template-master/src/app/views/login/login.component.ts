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
    public router: Router) {


  }
  public emailConfirmacao: string;
  public usuario: string;
  public senha: string;
  modal: BsModalRef;



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
    alert("As instruções de redefinição de senha foram enviadas para o email: " + this.emailConfirmacao);
  }
  desabilitaButaoEnviar() {
    return this.emailConfirmacao == undefined
  }
  desabilitaButaoLogar() {
    return (this.usuario == undefined || this.senha == undefined||this.usuario == "" || this.senha == "");
  }
  logar() {
    this.router.navigate(['dashboard']);
  }
}
