import { NoticiaService } from './../../services/noticia.service';
import { NoticiaViewModel } from './../../viewModels/noticiaViewModel';
import { Component } from '@angular/core';
import { ImagemViewModel } from '../../viewModels/imagemViewModel';

@Component({
  templateUrl: 'forms.component.html'
})
export class FormsComponent {

  noticia: NoticiaViewModel;
  listaNoticias: any[];
  listaImagens: ImagemViewModel[];
  imagemSelecionada: ImagemViewModel;

  constructor(private noticiaService: NoticiaService) {
    this.noticia = new NoticiaViewModel();
    this.listaNoticias = [];
    this.listaImagens = [];
    this.imagemSelecionada = null;
    this.preencheImagens();
    this.consultarNoticias();
  }
  preencheImagens(){
    var img = new ImagemViewModel();
    img.nome = "Alimentação";
    img.src = "../../../assets/alimentacaoSaudavel.jpg";
    this.listaImagens.push(img);
    img = new ImagemViewModel();
    img.nome = "Atividade Física";
    img.src = "../../../assets/atividadeFisica.png";
    this.listaImagens.push(img);
    img = new ImagemViewModel();
    img.nome = "Gripe";
    img.src = "../../../assets/gripe.jpg";
    this.listaImagens.push(img);
    img = new ImagemViewModel();
    img.nome = "Vacinação";
    img.src = "../../../assets/vacinação.jpg";
    this.listaImagens.push(img);
  }
  cadastrar() {
    if (this.validaCadastro()) {
      this.noticia.imagem = this.imagemSelecionada.src;
      var result = this.noticiaService.postNoticia(this.noticia);
      alert("Cadastro Realizado");
      this.imagemSelecionada = null;
      this.noticia = new NoticiaViewModel();
      this.consultarNoticias();
    } else {
      alert("Campos para o cadastro não preenchidos.")
    }
  }
  onFileChanged(event) {
    this.noticia.imagem = event.target.files[0]
  }
  validaCadastro() {
    if (this.imagemSelecionada == undefined) {
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


  consultarNoticias() {
    this.listaNoticias = [];
    var result = this.noticiaService.getNoticias();
    this.listaNoticias.push(...result);
  }
  deletarNoticia(id) {
    this.noticiaService.deleteNoticia(id);
    alert("Removido com sucesso.")
    this.consultarNoticias();
  }

}
