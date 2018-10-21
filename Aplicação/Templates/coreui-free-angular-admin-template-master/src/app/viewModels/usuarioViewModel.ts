import { EnderecoViewModel } from "./enderecoViewModel";
import { DependenteViewModel } from "./dependenteViewModel";

export class UsuarioViewModel {
    login: string;
    senha: string;
    email: string;
    nome: string;
    sobrenome: string;
    cpf: string;
    celular: number;
    perfil: number;
    endereco: EnderecoViewModel;
    datanascimento: string;
    
}