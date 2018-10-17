import { Util } from './../../../shared/util';
import { MedicoService } from './../../services/medico.service';
import { UsuarioViewModel } from './../../viewModels/usuarioViewModel';
import { Component } from '@angular/core';

@Component({
  templateUrl: 'collapses.component.html'
})
export class CollapsesComponent {

  public usuario: UsuarioViewModel;
  public senhaRepetida: string;
  public crm: string;
  constructor(public medicoService: MedicoService) {
    this.usuario = new UsuarioViewModel();
  }



  Registrar() {
    this.medicoService.inserirMedico(this.usuario, this.crm);
    alert("Cadastro relaizado com sucesso.")
  }

  CPFMask() {
    this.usuario.cpf = Util.MaskCpfCnpj(this.usuario.cpf);
  }

  TelefoneMask(){
    this.usuario.celular = Util.MaskTelefone(this.usuario.celular);
  }

  CRMMask(){

  }

}
