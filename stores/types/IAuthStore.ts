import ResponseAPI from "@/stores/types/ResponseAPI";

interface IAuthStore {
    efetuarLogin: (email: string, password: string) => Promise<ResponseAPI<string>>;
}

export default IAuthStore;