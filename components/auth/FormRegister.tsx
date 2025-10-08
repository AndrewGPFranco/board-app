import React, {useState} from "react";
import {Text, TextInput, View, StyleSheet} from "react-native";

export function FormRegister() {
    const [nome, setNome] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [senha, setSenha] = useState<string>("");
    const [username, setUsername] = useState<string>("");
    const [nomeCompleto, setNomeCompleto] = useState<string>("");
    const [dataNascimento, setDataNascimento] = useState<string>("");
    const [numeroTelefone, setNumeroTelefone] = useState<string>("");

    const formatDataNascimento = (text: string) => {
        const cleaned = text.replace(/\D/g, '');

        let formatted: string;
        if (cleaned.length <= 2)
            formatted = cleaned;
        else if (cleaned.length <= 4)
            formatted = `${cleaned.slice(0, 2)}/${cleaned.slice(2)}`;
        else
            formatted = `${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}/${cleaned.slice(4, 8)}`;

        setDataNascimento(formatted);
    };

    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.label}>Nome</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={setNome}
                    value={nome}
                    placeholder="Digite seu nome"
                    autoCapitalize="none"
                    autoComplete="off"
                />
            </View>
            <View>
                <Text style={styles.label}>Nome Completo</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={setNomeCompleto}
                    value={nomeCompleto}
                    placeholder="Digite seu nome completo"
                    autoCapitalize="none"
                    autoComplete="off"
                />
            </View>
            <View>
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
            <View>
                <Text style={styles.label}>Senha</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={setSenha}
                    value={senha}
                    placeholder="Digite sua senha"
                    autoCapitalize="none"
                    autoComplete="off"
                />
            </View>
            <View>
                <Text style={styles.label}>Username</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={setUsername}
                    value={username}
                    placeholder="Digite seu username"
                    autoCapitalize="none"
                    autoComplete="off"
                />
            </View>
            <View>
                <Text style={styles.label}>Número de Telefone</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={setNumeroTelefone}
                    value={numeroTelefone}
                    placeholder="(XX) XXXXX-XXXX"
                    autoCapitalize="none"
                    keyboardType="numeric"
                    autoComplete="off"
                    maxLength={11}
                />
            </View>
            <View>
                <Text style={styles.label}>Data de Nascimento</Text>
                <TextInput
                    style={styles.input}
                    placeholder="DD/MM/AAAA"
                    placeholderTextColor="#999"
                    value={dataNascimento}
                    onChangeText={formatDataNascimento}
                    keyboardType="numeric"
                    maxLength={10}
                />
            </View>
        </View>
    )
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
    label: {
        fontSize: 14,
        fontWeight: "600",
        marginBottom: 7,
        color: "#444",
    },
    containerInputLabel: {
        width: "100%",
        marginBottom: 15,
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
    }
})