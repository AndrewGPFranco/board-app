import ResponseAPI from "@/utils/ResponseAPI";
import {IBoard} from "@/types/interfaces/InterfaceUtils";

interface IBoardStore {
    getAllBoardsByUser(): Promise<ResponseAPI<IBoard[]>>
}

export default IBoardStore;