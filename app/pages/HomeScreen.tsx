import {useEffect} from "react";
import Menu from "@/components/global/Menu";
import useAuthStore from "@/stores/authStore";
import {Router, useRouter} from "expo-router";
import IAuthStore from "@/stores/types/IAuthStore";
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";

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
        <View style={styles.container}>
            <View style={styles.content}>
                <Text>Bem-vindo ao APP de gerenciamento!</Text>

                <TouchableOpacity onPress={() => router.push("/pages/BoardScreen")}>
                    <Text>Boards</Text>
                </TouchableOpacity>

            </View>
            <Menu/>
        </View>
    );
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

export default HomeScreen;