import { VacinaService } from './../../services/vacina.service';
import { Component } from '@angular/core';

@Component({
  templateUrl: 'chartjs.component.html'
})
export class ChartJSComponent {

  listaVacinas: any[];
  listaVacinas2: any[];
  constructor(private vacinaService : VacinaService) {
    this.listaVacinas = [];
    this.listaVacinas2 = [];

    this.listaVacinas = vacinaService.getVacinas();

    // this.listaVacinas2 = vacinas.slice((vacinas.length/2));
    // this.listaVacinas = vacinas.slice(0,(vacinas.length/2));


  }
}
