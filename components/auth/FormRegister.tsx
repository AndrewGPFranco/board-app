import {z} from "zod";
import React, {useState} from "react";
import {Router, useRouter} from "expo-router";
import {Text, TextInput, View, StyleSheet, TouchableOpacity, Alert} from "react-native";

export function FormRegister() {
    const [formData, setFormData] = useState({
        nome: "", email: "", senha: "", username: "", nomeCompleto: "", dataNascimento: "", numeroTelefone: "",
    });

    const handleChange = (key: string, value: string) => {
        setFormData(prev => ({...prev, [key]: value}));
    };

    const router: Router = useRouter();

    const schema = z.object({
        nome: z.string()
            .min(3, "O nome precisa ter pelo menos 3 caracteres")
            .max(30, "O nome não pode ultrapassar 30 caracteres"),
        email: z.string().email("O email precisa estar no padrão correto"),
        senha: z.string().min(8, "A senha precisa ter no mínimo 8 caracteres"),
        username: z.string()
            .min(3, "O username precisa ter pelo menos 3 caracteres")
            .max(20, "O username não pode ultrapassar 20 caracteres"),
        nomeCompleto: z.string().max(255, "O nome não pode ultrapassar 255 caracteres"),
        dataNascimento: z.string().max(8, "A data de nascimento informada é inválida"),
        numeroTelefone: z.string().max(11, "O número de telefone informado é inválido")
    })

    const formatDataNascimento = (text: string) => {
        const cleaned = text.replace(/\D/g, '');

        let formatted: string;
        if (cleaned.length <= 2)
            formatted = cleaned;
        else if (cleaned.length <= 4)
            formatted = `${cleaned.slice(0, 2)}/${cleaned.slice(2)}`;
        else
            formatted = `${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}/${cleaned.slice(4, 8)}`;

        handleChange("dataNascimento", formatted);
    };

    const realizarRegistro = () => {
        const validation = schema.safeParse({
            nome: formData.nome,
            email: formData.email,
            senha: formData.senha,
            username: formData.username,
            nomeCompleto: formData.nomeCompleto,
            dataNascimento: formData.dataNascimento,
            numeroTelefone: formData.numeroTelefone
        });

        if (!validation.success) {
            const firstError = validation.error.errors[0];
            Alert.alert(firstError.path[0] as string, firstError.message);
            return;
        }


        router.replace("/pages/LoginScreen");
    }

    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.label}>Nome</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={(valor) => handleChange("nome", valor)}
                    value={formData.nome}
                    placeholder="Digite seu nome"
                    autoCapitalize="none"
                    autoComplete="off"
                />
            </View>
            <View>
                <Text style={styles.label}>Nome Completo</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={(valor) => handleChange("nomeCompleto", valor)}
                    value={formData.nomeCompleto}
                    placeholder="Digite seu nome completo"
                    autoCapitalize="none"
                    autoComplete="off"
                />
            </View>
            <View>
                <Text style={styles.label}>E-mail</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={(valor) => handleChange("email", valor)}
                    value={formData.email}
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
                    onChangeText={(valor) => handleChange("senha", valor)}
                    value={formData.senha}
                    placeholder="Digite sua senha"
                    autoCapitalize="none"
                    autoComplete="off"
                    secureTextEntry
                />
            </View>
            <View>
                <Text style={styles.label}>Username</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={(valor) => handleChange("username", valor)}
                    value={formData.username}
                    placeholder="Digite seu username"
                    autoCapitalize="none"
                    autoComplete="off"
                />
            </View>
            <View>
                <Text style={styles.label}>Número de Telefone</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={(valor) => handleChange("numeroTelefone", valor)}
                    value={formData.numeroTelefone}
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
                    value={formData.dataNascimento}
                    onChangeText={formatDataNascimento}
                    keyboardType="numeric"
                    maxLength={10}
                />
            </View>

            <TouchableOpacity style={styles.btnEntrar} onPress={realizarRegistro}>
                <Text style={styles.btnText}>Registrar</Text>
            </TouchableOpacity>
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
    }
})