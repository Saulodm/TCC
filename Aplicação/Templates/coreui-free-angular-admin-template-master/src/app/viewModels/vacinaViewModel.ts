export class VacinaViewModel{
    public Nome: string;  
    public Data: string;
    public Lote: string;
    public Dose: number;
    public EmAtraso: boolean;

    constructor(){
        this.EmAtraso = true;
    }
}