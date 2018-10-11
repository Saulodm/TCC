import { VacinaService } from './../../services/vacina.service';
import { Component } from '@angular/core';
import { VacinaViewModel } from '../../viewModels/vacinaViewModel';

@Component({
  templateUrl: 'chartjs.component.html'
})
export class ChartJSComponent {

  public dependenteSelecionado: any;
  public pesquisaEuMesmo: boolean = true;

  listaVacinas: any[];


  public AntimeningococicaCConjugada: VacinaViewModel = new VacinaViewModel();
  public Antipneumococica10ValenteConjugada: VacinaViewModel = new VacinaViewModel();
  public BCGID: VacinaViewModel = new VacinaViewModel();
  public DTP: VacinaViewModel = new VacinaViewModel();
  public FebreAmarela: VacinaViewModel = new VacinaViewModel();
  public HepatitieB: VacinaViewModel = new VacinaViewModel();
  public SRC: VacinaViewModel = new VacinaViewModel();
  public Tetravalente: VacinaViewModel = new VacinaViewModel();
  public VOP: VacinaViewModel = new VacinaViewModel();
  public VORH: VacinaViewModel = new VacinaViewModel();

  constructor(private vacinaService: VacinaService) {
    this.dependenteSelecionado = null
    this.listaVacinas = vacinaService.getVacinas();

    this.listaVacinas.forEach(vc => {
      switch (vc.cod) {
        case 1:
          this.AntimeningococicaCConjugada.Nome = vc.nome;
          this.AntimeningococicaCConjugada.Idade = vc.idade;
          this.AntimeningococicaCConjugada.TipoIdade = vc.tipoIdade;
          this.AntimeningococicaCConjugada.Dose = vc.doses;
          break;
        case 2:
          this.Antipneumococica10ValenteConjugada.Nome = vc.nome;
          this.Antipneumococica10ValenteConjugada.Idade = vc.idade;
          this.Antipneumococica10ValenteConjugada.TipoIdade = vc.tipoIdade;
          this.Antipneumococica10ValenteConjugada.Dose = vc.doses;
          break;
        case 3:
          this.BCGID.Nome = vc.nome;
          this.BCGID.Idade = vc.idade;
          this.BCGID.TipoIdade = vc.tipoIdade;
          this.BCGID.Dose = vc.doses;
          break;
        case 4:
          this.DTP.Nome = vc.nome;
          this.DTP.Idade = vc.idade;
          this.DTP.TipoIdade = vc.tipoIdade;
          this.DTP.Dose = vc.doses;
          break;
        case 5:
          this.FebreAmarela.Nome = vc.nome;
          this.FebreAmarela.Idade = vc.idade;
          this.FebreAmarela.TipoIdade = vc.tipoIdade;
          this.FebreAmarela.Dose = vc.doses;
          break;
        case 6:
          this.HepatitieB.Nome = vc.nome;
          this.HepatitieB.Idade = vc.idade;
          this.HepatitieB.TipoIdade = vc.tipoIdade;
          this.HepatitieB.Dose = vc.doses;
          break;
        case 7:
          this.SRC.Nome = vc.nome;
          this.SRC.Idade = vc.idade;
          this.SRC.TipoIdade = vc.tipoIdade;
          this.SRC.Dose = vc.doses;
          break;
        case 8:
          this.Tetravalente.Nome = vc.nome;
          this.Tetravalente.Idade = vc.idade;
          this.Tetravalente.TipoIdade = vc.tipoIdade;
          this.Tetravalente.Dose = vc.doses;
          break;
        case 9:
          this.VOP.Nome = vc.nome;
          this.VOP.Idade = vc.idade;
          this.VOP.TipoIdade = vc.tipoIdade;
          this.VOP.Dose = vc.doses;
          break;
        case 10:
          this.VORH.Nome = vc.nome;
          this.VORH.Idade = vc.idade;
          this.VORH.TipoIdade = vc.tipoIdade;
          this.VORH.Dose = vc.doses;
          break;
      }

    });

  }
}
