import {create} from "zustand";
import {AxiosError} from "axios";
import {api} from "@/network/AxiosInstance";
import {parseDateBR} from "@/utils/DataUtils";
import IAuthStore from "@/stores/types/IAuthStore";
import ResponseAPI from "@/stores/types/ResponseAPI";
import {IUserRegister} from "@/types/interfaces/utils";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
    }
}));

export default useAuthStore;