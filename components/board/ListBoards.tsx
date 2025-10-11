import {api} from "@/network/AxiosInstance";
import React, {useEffect, useState} from "react";
import {IBoard} from "@/types/interfaces/InterfaceUtils";
import {parseDateFromDateToStringBR} from "@/utils/DataUtils";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {Image, StyleSheet, Text, View, ActivityIndicator, FlatList, Pressable} from "react-native";

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
                <View style={styles.avatar}>
                    <ActivityIndicator size="small" color="#5c6bc0"/>
                </View>
            )
        } else if (board.pathImagem === null) {
            return (
                <View style={[styles.avatar, styles.avatarComLetra]}>
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
        <FlatList
            data={boards}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
            renderItem={({item: board}) => (
                <Pressable style={({pressed}) => [styles.item, pressed && styles.itemPressed]}>
                    <View style={styles.containerImagem}>
                        {renderizaImagemCapa(board)}
                    </View>
                    <View style={styles.containerInfos}>
                        <View style={styles.textContainer}>
                            <Text style={styles.titulo} numberOfLines={1}>{board.titulo}</Text>
                            <Text style={styles.descricao} numberOfLines={2}>{board.descricao}</Text>
                        </View>
                        <View>
                            {renderDataCriacao(board.createdAt)}
                        </View>
                    </View>
                </Pressable>
            )}
            contentContainerStyle={styles.container}
        />
    );
}

const styles = StyleSheet.create({
    container: {
        paddingBottom: 20,
        width: "100%",
    },
    item: {
        flexDirection: "row",
        gap: 12,
        backgroundColor: "#fff",
        paddingHorizontal: 14,
        paddingVertical: 12,
        borderRadius: 12,
        marginBottom: 10,
        shadowColor: "#000",
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.08,
        shadowRadius: 4,
        elevation: 3,
    },
    itemPressed: {
        opacity: 0.7,
        backgroundColor: "#f5f5f5",
    },
    containerImagem: {
        alignItems: "center",
        justifyContent: "center",
    },
    avatar: {
        width: 48,
        height: 48,
        borderRadius: 10,
    },
    avatarComLetra: {
        backgroundColor: "#5c6bc0",
        alignItems: "center",
        justifyContent: "center",
    },
    titulo: {
        fontSize: 16,
        fontWeight: "600",
        color: "#1a1a1a",
    },
    descricao: {
        fontSize: 13,
        color: "#666",
        marginTop: 4,
        lineHeight: 18,
    },
    containerInfos: {
        flex: 1,
        justifyContent: "space-between",
    },
    textContainer: {
        flex: 1,
    },
    data: {
        fontSize: 12,
        color: "#999",
        fontWeight: "500",
    },
    avatarLetra: {
        fontWeight: "700",
        fontSize: 18,
        color: "#fff",
    }
});