import {create} from "zustand";
import {api} from "@/network/AxiosInstance";
import IAuthStore from "@/stores/types/IAuthStore";
import ResponseAPI from "@/stores/types/ResponseAPI";
import AsyncStorage from "@react-native-async-storage/async-storage";

const useAuthStore = create<IAuthStore>((set, get) => ({
    async efetuarLogin(email: string, password: string): Promise<ResponseAPI<string>> {
        try {
            const data = {email, password};
            const response = await api.post("/open/v1/auth/login", data);

            await AsyncStorage.setItem("token", response.data.response);
            return new ResponseAPI(false, "");
        } catch (error) {
            console.error(error);
            return new ResponseAPI(true, 'Ocorreu um erro ao realizar o login, verifique os dados e tente novamente!');
        }
    },
}));

export default useAuthStore;