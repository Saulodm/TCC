import { Router } from '@angular/router';
import { Util } from './../../../shared/util';
import { UsuarioService } from './../../services/usuario.service';
import { Component, OnInit } from '@angular/core';
import { UsuarioViewModel } from '../../viewModels/usuarioViewModel';
import { EnderecoViewModel } from '../../viewModels/enderecoViewModel';
import * as moment from 'moment'
import 'moment/locale/pt-br';
@Component({
  selector: 'app-dashboard',
  templateUrl: 'register.component.html'
})
export class RegisterComponent implements OnInit {

  constructor(private usuarioService: UsuarioService,
    public router: Router) {

  }

  public parte1Ativa: boolean;
  public parte2Ativa: boolean;
  public usuario: UsuarioViewModel;
  public senhaRepetida: string;
  public Regioes = [{ cod: 1, nome: "Barreiro" }, { cod: 2, nome: "Centro-Sul" }, { cod: 3, nome: "Leste" },
  { cod: 4, nome: "Norte" }, { cod: 5, nome: "Nordeste" }, { cod: 6, nome: "Norte" },
  { cod: 7, nome: "Oeste" }, { cod: 8, nome: "Pampulha" }, { cod: 9, nome: "Venda Nova" }];
  ngOnInit(): void {
    this.parte1Ativa = true;
    this.parte2Ativa = false;
    this.usuario = new UsuarioViewModel();
    this.usuario.endereco = new EnderecoViewModel();
    moment.locale('pt-BR');
  }

  Continuar() {

    if (this.senhaRepetida != this.usuario.senha) {
      alert("A confirmação da senha deve ser igual a senha.");
      return false;
    }
    if (this.usuarioService.getUsuarioLoginExists(this.usuario.login)) {
      alert("O nome de usuário já existe.");
      return false;
    }

    this.parte1Ativa = false;
    this.parte2Ativa = true;
  }

  CPFMask() {
    this.usuario.cpf = Util.MaskCpfCnpj(this.usuario.cpf);
  }
  TelefoneMask() {
    this.usuario.celular = Util.MaskTelefone(this.usuario.celular);
  }
  Registrar() {
    if (this.validaDataNascimento()) {
      var result = this.usuarioService.postUsuario(this.usuario);
      alert("Cadastro executado!")
      this.router.navigate(['login']);
    } else {
      alert("O usuário deve ser maior de 18 anos.")
    }
  }
  getById(name: string) {
    return document.getElementById(name);
  }
  atualizaValorInput(name: string, valor: string) {
    (<HTMLInputElement>this.getById(name)).value = valor;
  }
  validaDataNascimento() {
    var now = moment();
    var nascimento = moment(this.usuario.datanascimento);
    var result = now.subtract(18, 'years') >= nascimento;
    return result;
  }

}
