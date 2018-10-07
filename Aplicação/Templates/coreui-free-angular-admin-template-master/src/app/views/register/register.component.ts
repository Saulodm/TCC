import { Component, OnInit } from '@angular/core';
import { UsuarioViewModel } from '../../viewModels/usuarioViewModel';
import { EnderecoViewModel } from '../../viewModels/enderecoViewModel';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'register.component.html'
})
export class RegisterComponent implements OnInit {

  constructor() {
    this.usuario = new UsuarioViewModel();
    this.usuario.endereco = new EnderecoViewModel();
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
  }

  Continuar() {
    this.parte1Ativa = false;
    this.parte2Ativa = true;
  }

}
