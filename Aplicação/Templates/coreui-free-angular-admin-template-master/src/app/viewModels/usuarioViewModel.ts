import { EnderecoViewModel } from "./enderecoViewModel";

export class UsuarioViewModel {
    login: string;
    senha: string;
    email: string;
    nome: string;
    sobrenome: string;
    cpf: string;
    celular: number;
    endereco: EnderecoViewModel;
}