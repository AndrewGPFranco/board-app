import {useEffect} from "react";
import {Text, View} from "react-native";
import useAuthStore from "@/stores/authStore";
import {Router, useRouter} from "expo-router";
import IAuthStore from "@/stores/types/IAuthStore";

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
        </View>
    )
}

export default HomeScreen;