import {useEffect, useState} from "react";
import Menu from "@/components/global/Menu";
import useBoardStore from "@/stores/boardStore";
import {StyleSheet, Text, View} from "react-native";
import IBoardStore from "@/stores/types/IBoardStore";
import {ListBoards} from "@/components/board/ListBoards";
import {IBoard} from "@/types/interfaces/InterfaceUtils";
import {SafeAreaView} from "react-native-safe-area-context";

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
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <View style={styles.header}>
                    <Text style={styles.titulo}>Meus Quadros</Text>
                    <Text style={styles.subtitle}>{boards.length} quadro{boards.length !== 1 ? 's' : ''}</Text>
                </View>

                <ListBoards
                    boards={boards}
                />
            </View>
            <Menu/>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f8f9fa",
    },
    content: {
        flex: 1,
        paddingHorizontal: 16,
        paddingTop: 20,
    },
    header: {
        marginBottom: 24,
    },
    titulo: {
        fontSize: 28,
        fontWeight: "700",
        color: "#1a1a1a",
        letterSpacing: -0.5,
    },
    subtitle: {
        fontSize: 14,
        color: "#999",
        marginTop: 4,
        fontWeight: "500",
    }
});

export default BoardScreen;