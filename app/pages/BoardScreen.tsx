import {useEffect, useState} from "react";
import Menu from "@/components/global/Menu";
import {StyleSheet, View} from "react-native";
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
        <View style={styles.container}>
            <View style={styles.content}>
                <ListBoards
                    boards={boards}
                />
            </View>
            <Menu/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});

export default BoardScreen;