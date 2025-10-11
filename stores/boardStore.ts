import {create} from "zustand";
import {api} from "@/network/AxiosInstance";
import ResponseAPI from "@/utils/ResponseAPI";
import IBoardStore from "@/stores/types/IBoardStore";
import {IBoard} from "@/types/interfaces/InterfaceUtils";
import AsyncStorage from "@react-native-async-storage/async-storage";

const useBoardStore = create<IBoardStore>(() => ({
    async getAllBoardsByUser(): Promise<ResponseAPI<IBoard[]>> {
        try {
            const token: string | null = await AsyncStorage.getItem("token");

            const response = await api.get("/api/v1/board/itens", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })

            return new ResponseAPI(false, response.data);
        } catch (error) {
            console.log(error)
            return new ResponseAPI(true, []);
        }
    },
}));

export default useBoardStore;