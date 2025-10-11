import {Text, View} from "react-native";
import {IBoard} from "@/types/interfaces/InterfaceUtils";

type ListBoardsProps = {
    boards: IBoard[];
};

export function ListBoards({boards}: ListBoardsProps) {
    return (
        <View>
            {boards.map((board: IBoard, index: number) => (
                <Text key={index}>{board.titulo}</Text>
            ))}
        </View>
    )
}