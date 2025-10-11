import {useEffect} from "react";
import useAuthStore from "@/stores/authStore";
import {Router, useRouter} from "expo-router";
import IAuthStore from "@/stores/types/IAuthStore";
import {Text, TouchableOpacity, View} from "react-native";

const HomeScreen = () => {
    const router: Router = useRouter();
    const authStore: IAuthStore = useAuthStore();

    useEffect(() => {
        const verificaToken = async (): Promise<boolean> => {
            return await authStore.verificaTokenValido();
        };

        verificaToken().then((result: boolean) => {
            if (!result)
                router.replace("/pages/LoginScreen");
        });
    }, [authStore, router]);

    return (
        <View>
            <Text>
                Bem vindo ao APP de gerenciamento!
            </Text>
            <TouchableOpacity onPress={() => router.push("/pages/BoardScreen")}>
                Boards
            </TouchableOpacity>
        </View>
    )
}

export default HomeScreen;