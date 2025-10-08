import Ionicons from "@expo/vector-icons/Ionicons";
import {FormRegister} from "@/components/auth/FormRegister";
import {KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, View} from "react-native";

export default function UserRegisterScreen() {
    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <ScrollView
                contentContainerStyle={styles.scrollContent}
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.containerInicio}>
                    <View style={styles.containerIcon}>
                        <Ionicons name="person-add" size={32} color="white"/>
                    </View>
                    <Text style={styles.titulo}>Criar Conta</Text>
                    <Text style={styles.descricao}>Preencha os dados para começar</Text>
                </View>

                <FormRegister/>

                <Text style={styles.textoRodape}>
                    Ao criar uma conta, você concorda com nossos Termos de Uso e Política de Privacidade
                </Text>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent:
            "center",
        alignItems:
            "center",
        paddingHorizontal:
            5,
    },
    scrollContent: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    containerInicio: {
        alignItems: "center",
        gap:
            5
    },
    containerIcon: {
        backgroundColor: "purple",
        width:
            "15%",
        padding:
            10,
        borderRadius:
            "25%",
    },
    titulo: {
        fontSize: 30,
        fontWeight:
            "bold",
    },
    descricao: {
        fontSize: 15,
        color:
            "gray",
    },
    textoRodape: {
        fontSize: 10,
        textAlign:
            "center",
        color:
            "gray",
    }
});