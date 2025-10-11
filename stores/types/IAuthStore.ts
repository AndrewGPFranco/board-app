import ResponseAPI from "@/utils/ResponseAPI";
import {IUserRegister} from "@/types/interfaces/InterfaceUtils";

interface IAuthStore {
    verificaTokenValido: () => Promise<boolean>;
    realizarRegistro: (data: IUserRegister) => Promise<ResponseAPI<string>>;
    efetuarLogin: (email: string, password: string) => Promise<ResponseAPI<string>>;
}

export default IAuthStore;