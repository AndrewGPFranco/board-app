import {ScrollView} from "react-native";
import {useEffect, useState} from "react";
import useBoardStore from "@/stores/boardStore";
import IBoardStore from "@/stores/types/IBoardStore";
import {ListBoards} from "@/components/board/ListBoards";
import {IBoard} from "@/types/interfaces/InterfaceUtils";

const BoardScreen = () => {
    const boardStore: IBoardStore = useBoardStore();

    const [boards, setBoards] = useState<IBoard[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const responseAPI = await boardStore.getAllBoardsByUser();
            setBoards(responseAPI.getResponse() as IBoard[]);
        };

        void fetchData();
    }, [boardStore]);

    return (
        <>
            <ScrollView>
                <ListBoards
                    boards={boards}
                />
            </ScrollView>
        </>
    )
}

export default BoardScreen;