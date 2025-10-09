import ResponseAPI from "@/stores/types/ResponseAPI";
import {IUserRegister} from "@/types/interfaces/utils";

interface IAuthStore {
    efetuarLogin: (email: string, password: string) => Promise<ResponseAPI<string>>;
    realizarRegistro: (data: IUserRegister) => Promise<ResponseAPI<string>>;
}

export default IAuthStore;