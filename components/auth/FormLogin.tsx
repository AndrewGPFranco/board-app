import {useState} from "react";
import {Text, TextInput, View, StyleSheet, Alert, TouchableOpacity} from "react-native";

export function FormLogin() {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const realizarLogin = () => {
        Alert.alert(`${email} ${password}`);
    }

    return (
        <View style={styles.container}>
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
                />
            </View>

            <TouchableOpacity style={styles.btnEntrar} onPress={realizarLogin}>
                <Text style={styles.btnText}>Entrar</Text>
            </TouchableOpacity>

            {/*TODO: arrumar para ser um link*/}
            <Text style={styles.aviso}>Não tem uma conta? <Text style={styles.falsoLink}>Cadastre-se</Text></Text>
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