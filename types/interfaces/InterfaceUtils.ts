export interface IUserRegister {
    nome: string;
    email: string;
    senha: string;
    username: string;
    nomeCompleto: string;
    dataNascimento: Date | string;
    numeroTelefone: string;
}

export interface IDecodeJWT {
    email: string;
    exp: number;
    id: string;
    iss: string;
    sub: string;
}