import { PostoService } from './../../services/posto.service';
import { Component, ViewChild } from '@angular/core';
import * as $ from 'jquery';
// import { } from '@types/googlemaps';

@Component({
  templateUrl: 'cards.component.html'
})
export class CardsComponent {
  // @ViewChild('gmap') gmapElement: any;
  // map: google.maps.Map;

  ngOnInit() {
    // var mapProp = {
    //   center: new google.maps.LatLng(18.5793, 73.8143),
    //   zoom: 15,
    //   mapTypeId: google.maps.MapTypeId.ROADMAP
    // };
    // this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);
    this.regiaoSelecionada = 0;
  }
  constructor(private postoService: PostoService) { }
  public listaPostos = [];
  //url base do servidor.

  //inicializando os combo box.
  public postoSelecionado = 0;
  public regiaoSelecionada = 0;
  public Regioes = [{ cod: 1, nome: "Barreiro" }, { cod: 2, nome: "Centro-Sul" }, { cod: 3, nome: "Leste" },
  { cod: 4, nome: "Norte" }, { cod: 5, nome: "Nordeste" }, { cod: 6, nome: "Norte" },
  { cod: 7, nome: "Oeste" }, { cod: 8, nome: "Pampulha" }, { cod: 9, nome: "Venda Nova" }];
  public Postos = [];
  public Markers = [];
  public Zoom = 0;
  public mostrarDetalhes = false;
  public PositionMapLat = 0;
  public PositionMapLong = 0;
  public detalhesPosto;
  //deixando mapa escondido
  public showMap = false;
  //funcção que retorna um marker novo para colocar no mapa.
  marker() {
    return { nomePosto: "", latitude: 0, longitude: 0 }
  }
  //função que executa requisição http assincrona.


  //função que executa requisição http sincrona. 

  //função que filtra os postos com base na região selecionada.
  getPostos() {
    this.postoSelecionado = 0;
    if (this.regiaoSelecionada != 0) {
      var regiao = "";
      for (let i = 0; i < this.Regioes.length; i++) {
        if (this.regiaoSelecionada == this.Regioes[i].cod) {
          regiao = this.Regioes[i].nome;
        }
      }
      this.Postos = this.postoService.getPostos(regiao);

    }
  }
  //função que exibe todos os detalhes de acordo com o posto selecionado.
  verDetalhes() {

    if (this.postoSelecionado > 1) {
      this.Zoom = 15;
      this.showMap = true;
      $("#map").addClass("map-size");
      this.Postos.forEach(v => {
        if (v.cod == this.postoSelecionado) {
          this.detalhesPosto = v;
          this.mostrarDetalhes = true;
          var novoMarker = this.marker();
          novoMarker.nomePosto = v.nome;
          novoMarker.latitude = v.position;
          novoMarker.longitude = v.position;
          this.Markers.push(novoMarker);
          this.PositionMapLat = v.position;
          this.PositionMapLong = v.position;
        }
      });
    } else {
      this.showMap = true;
      $("#map").removeClass("map-size");
      this.Zoom = 12;
      this.mostrarDetalhes = false;
      this.Postos.forEach(v => {
        var novoMarker = this.marker();
        novoMarker.nomePosto = v.nome;
        novoMarker.latitude = v.position;
        novoMarker.longitude = v.position;
        this.Markers.push(novoMarker);
      });

      this.PositionMapLat = this.Markers[0].position;
      this.PositionMapLong = this.Markers[0].position;
    }
  }
}
