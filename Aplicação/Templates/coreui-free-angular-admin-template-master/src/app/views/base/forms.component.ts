import { NoticiaService } from './../../services/noticia.service';
import { NoticiaViewModel } from './../../viewModels/noticiaViewModel';
import { Component } from '@angular/core';

@Component({
  templateUrl: 'forms.component.html'
})
export class FormsComponent {

  noticia: NoticiaViewModel;
  listaNoticias: any[];

  constructor(private noticiaService: NoticiaService) {
    this.noticia = new NoticiaViewModel();
    this.listaNoticias = [];
    this.consultarNoticias();
  }

  cadastrar() {
    if (this.validaCadastro()) {
      var result = this.noticiaService.postNoticia(this.noticia);
      alert("Cadastro Realizado");
      this.consultarNoticias();
    } else {
      alert("Campos para o cadastro não preenchidos.")
    }
  }
  onFileChanged(event) {
    this.noticia.imagem = event.target.files[0]
  }
  validaCadastro() {
    if (this.noticia.imagem == undefined) {
      return false;
    }
    if (this.noticia.manchete == undefined || this.noticia.manchete == "") {
      return false;
    }
    if (this.noticia.texto == undefined || this.noticia.texto == "") {
      return false;
    }
    if (this.noticia.titulo == undefined || this.noticia.titulo == "") {
      return false;
    }
    return true;
  }
  consultarNoticias(){
    this.listaNoticias = [];
    var result = this.noticiaService.getNoticias();
    this.listaNoticias.push(...result);
  }
  deletarNoticia(id){
    this.noticiaService.deleteNoticia(id);
    alert("Removido com sucesso.")
    this.consultarNoticias();
  }

}
