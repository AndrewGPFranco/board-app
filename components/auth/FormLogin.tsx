import {z} from "zod";
import React, {useState} from "react";
import {Router, useRouter} from "expo-router";
import useAuthStore from "@/stores/authStore";
import {Dialog, Portal} from "react-native-paper";
import IAuthStore from "@/stores/types/IAuthStore";
import ResponseAPI from "@/stores/types/ResponseAPI";
import {Text, TextInput, View, StyleSheet, TouchableOpacity} from "react-native";

export function FormLogin() {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [visible, setVisible] = React.useState<boolean>(false);
    const [mensagemLogin, setMensagemLogin] = React.useState<string>("");

    const router: Router = useRouter();
    const authStore: IAuthStore = useAuthStore();
    const hideDialog: () => void = () => setVisible(false);

    const schema = z.object({
        email: z.string().email("O email é obrigatório!"),
        password: z.string().min(8, "A senha precisa ter no mínimo 8 caracteres"),
    })

    const realizarLogin = async (): Promise<void> => {
        const validation = schema.safeParse({email, password});

        if (validation.error) {
            setMensagemLogin(String(validation.error.errors.at(0)?.message));
            setVisible(true);
            return;
        }

        const response: ResponseAPI<string> = await authStore.efetuarLogin(email, password);

        if (response.getError()) {
            setMensagemLogin(String(response.getResponse()));
            setVisible(true);
            return;
        }

        router.replace("/pages/HomeScreen");
    }

    return (
        <View style={styles.container}>
            <Portal>
                <Dialog
                    visible={visible}
                    onDismiss={hideDialog}
                    style={{
                        backgroundColor: '#707070',
                        borderRadius: 12,
                    }}
                >
                    <Dialog.Content
                        style={{
                            alignItems: 'center',
                        }}
                    >
                        <Text
                            style={{
                                fontSize: 18,
                                color: 'white',
                                textAlign: 'center',
                            }}
                        >
                            {mensagemLogin}
                        </Text>
                    </Dialog.Content>
                </Dialog>
            </Portal>

            <Text style={styles.boasVindas}>Bem-vindo de volta</Text>
            <Text style={styles.descricao}>Entre com sua conta para continuar</Text>

            <View style={styles.containerInputLabel}>
                <Text style={styles.label}>E-mail</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={setEmail}
                    value={email}
                    placeholder="Digite seu e-mail"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoComplete="off"
                />
            </View>

            <View style={styles.containerInputLabel}>
                <Text style={styles.label}>Senha</Text>
                <TextInput
                    secureTextEntry
                    style={styles.input}
                    onChangeText={setPassword}
                    value={password}
                    placeholder="Digite sua senha"
                    autoComplete="off"
                />
            </View>

            <TouchableOpacity style={styles.btnEntrar} onPress={realizarLogin}>
                <Text style={styles.btnText}>Entrar</Text>
            </TouchableOpacity>

            <Text style={styles.aviso}>Não tem uma conta? <Text
                onPress={() => router.push("/pages/UserRegisterScreen")}
                style={styles.falsoLink}>Cadastre-se</Text>
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 15,
        margin: 20,
        padding: 30,
        borderRadius: 20,
        backgroundColor: "#f5f5f5",
        shadowColor: "#000",
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 5,
    },
    boasVindas: {
        fontWeight: 'bold',
        fontSize: 22,
        marginBottom: 5,
        color: "#333",
    },
    descricao: {
        fontSize: 14,
        textAlign: "center",
        color: "gray",
        marginBottom: 20,
    },
    containerInputLabel: {
        width: "100%",
        marginBottom: 15,
    },
    label: {
        fontSize: 14,
        fontWeight: "600",
        marginBottom: 7,
        color: "#444",
    },
    input: {
        height: 45,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 10,
        paddingHorizontal: 15,
        backgroundColor: "#fff",
        fontSize: 14,
        color: "#333",
        minWidth: '100%'
    },
    btnEntrar: {
        borderRadius: 15,
        paddingVertical: 12,
        paddingHorizontal: 40,
        backgroundColor: "purple",
        alignItems: "center",
        marginTop: 10,
    },
    btnText: {
        fontWeight: "bold",
        fontSize: 18,
        color: "white",
    },
    falsoLink: {
        color: 'purple',
        fontWeight: "bold",
    },
    aviso: {
        marginTop: 5,
        fontSize: 12,
        color: "gray",
        textAlign: "center",
    }
});