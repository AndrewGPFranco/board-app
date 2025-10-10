import {create} from "zustand";
import {AxiosError} from "axios";
import {jwtDecode} from "jwt-decode";
import {api} from "@/network/AxiosInstance";
import {parseDateBR} from "@/utils/DataUtils";
import IAuthStore from "@/stores/types/IAuthStore";
import ResponseAPI from "@/stores/types/ResponseAPI";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {IDecodeJWT, IUserRegister} from "@/types/interfaces/InterfaceUtils";

const useAuthStore = create<IAuthStore>(() => ({
    async efetuarLogin(email: string, password: string): Promise<ResponseAPI<string>> {
        try {
            const data = {email, password};
            const response = await api.post("/open/v1/auth/login", data);

            await AsyncStorage.setItem("token", response.data.response);
            return new ResponseAPI(false, "");
        } catch (error: any) {
            if (error instanceof AxiosError)
                return new ResponseAPI(true, error.response?.data.response);

            return new ResponseAPI(true, 'Ocorreu um erro ao realizar o login, verifique os dados e tente novamente!');
        }
    },
    async realizarRegistro(input: IUserRegister): Promise<ResponseAPI<string>> {
        try {
            const dataNascimento: Date | null = parseDateBR(input.dataNascimento);
            if (!dataNascimento)
                return new ResponseAPI(true, 'Data de nascimento inválida!');

            const data: IUserRegister = {
                nome: input.nome,
                email: input.email,
                nomeCompleto: input.nomeCompleto,
                dataNascimento: dataNascimento,
                numeroTelefone: input.numeroTelefone,
                senha: input.senha,
                username: input.username
            }

            const response = await api.post("/open/v1/auth/registrar-usuario", data);

            return new ResponseAPI(false, response.data);
        } catch (error) {
            if (error instanceof AxiosError)
                return new ResponseAPI(true, error.response?.data);

            return new ResponseAPI(true, 'Ocorreu um erro ao realizar o registro, verifique os dados e tente novamente!');
        }
    },
    async verificaTokenValido(): Promise<boolean> {
        const token: string | null = await AsyncStorage.getItem('token');

        if (token === null) return Promise.resolve(false);

        const decoded: IDecodeJWT = jwtDecode(token);
        const dataExpericaoToken = new Date(decoded.exp * 1000);

        if (dataExpericaoToken < new Date()) {
            await AsyncStorage.removeItem("token");
            return Promise.resolve(false);
        }

        return Promise.resolve(true);
    }
}));

export default useAuthStore;