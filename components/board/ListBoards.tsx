import {api} from "@/network/AxiosInstance";
import React, {useEffect, useState} from "react";
import {IBoard} from "@/types/interfaces/InterfaceUtils";
import {parseDateFromDateToStringBR} from "@/utils/DataUtils";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {Image, StyleSheet, Text, View, ActivityIndicator} from "react-native";

type ListBoardsProps = {
    boards: IBoard[];
};

export function ListBoards({boards}: ListBoardsProps) {
    const [imagesBase64, setImagesBase64] = useState<{ [key: string]: string }>({});
    const [loadingImages, setLoadingImages] = useState<{ [key: string]: boolean }>({});

    useEffect(() => {
        boards.forEach(async board => {
            if (!imagesBase64[board.id]) {
                setLoadingImages(prev => ({...prev, [board.id]: true}));
                api.get(
                    `/api/v1/board/get-imagem-board?pathImagem=${board.pathImagem}`,
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${await AsyncStorage.getItem('token')}`
                        },
                    }
                )
                    .then(response => {
                        setImagesBase64(prev => ({
                            ...prev,
                            [board.id]: `data:image/png;base64,${response.data}`
                        }));
                    })
                    .catch(err => console.log(`Erro ao buscar imagem do board ${board.id}:`, err))
                    .finally(() => {
                        setLoadingImages(prev => ({...prev, [board.id]: false}));
                    });
            }
        });
    }, [boards, imagesBase64]);

    const renderDataCriacao = (date: Date) => {
        const parseDateBR1 = parseDateFromDateToStringBR(date);
        return <Text style={styles.data}>{parseDateBR1}</Text>;
    };

    const renderizaImagemCapa = (board: IBoard) => {
        if (loadingImages[board.id]) {
            return (
                <ActivityIndicator size="small"/>
            )
        } else if (board.pathImagem === null) {
            return (
                <View style={styles.containerAvatarComLetra}>
                    <Text style={styles.avatarLetra}>
                        {board.titulo.at(0)?.toUpperCase()}
                    </Text>
                </View>
            )
        } else {
            return (
                <Image
                    style={styles.avatar}
                    source={{
                        uri: imagesBase64[board.id]
                    }}
                />
            )
        }
    }

    return (
        <View style={styles.container}>
            {boards.map((board: IBoard) => (
                <View style={styles.item} key={board.id}>
                    <View style={styles.containerImagem}>
                        {renderizaImagemCapa(board)}
                    </View>
                    <View style={styles.containerInfos}>
                        <View>
                            <Text style={styles.titulo}>{board.titulo}</Text>
                            <Text style={styles.descricao}>{board.descricao}</Text>
                        </View>
                        <View>
                            {renderDataCriacao(board.createdAt)}
                        </View>
                    </View>
                </View>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 10
    },
    item: {
        flexDirection: "row",
        gap: 10,
        borderWidth: 1,
        paddingHorizontal: 15,
        paddingVertical: 5,
        borderColor: "gray",
        minWidth: "90%",
        maxWidth: "90%",
        borderRadius: 10,
    },
    containerImagem: {
        alignItems: "center",
        justifyContent: "center",
    },
    avatar: {
        width: 35,
        height: 35
    },
    titulo: {
        fontSize: 15,
        fontWeight: "bold",
        flexShrink: 1,
    },
    descricao: {
        fontSize: 12,
        color: "gray",
        flexShrink: 1,
    },
    containerInfos: {
        flex: 1,
        flexDirection: "column",
        flexWrap: "wrap",
    },
    data: {
        fontSize: 13,
        color: "black",
    },
    containerAvatarComLetra: {
        backgroundColor: "#fff",
        borderRadius: 50,
        alignItems: "center",
        justifyContent: "center",
        width: 35,
        height: 35,
    },
    avatarLetra: {
        fontWeight: "bold",
        fontSize: 16,
        color: "black",
    }
});
