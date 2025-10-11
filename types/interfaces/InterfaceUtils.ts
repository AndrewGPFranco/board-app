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

export interface IBoard {
    id: string;
    titulo: string;
    descricao: string;
    username: string;
    createdAt: Date;
    updatedAt: Date;
    itensBoard: ItemBoard[];
}

export interface ItemBoard {
    id: string;
    titulo: string;
    descricao: string;
    categoria: string;
    createdAt: Date;
    updateAt: Date;
    finalizedA: Date;
}