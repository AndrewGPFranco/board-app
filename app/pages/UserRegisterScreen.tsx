import React from "react";
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
                    <View style={styles.iconWrapper}>
                        <View style={styles.containerIcon}>
                            <Ionicons name="person-add" size={32} color="white"/>
                        </View>
                    </View>
                    <Text style={styles.titulo}>Criar Conta</Text>
                    <Text style={styles.descricao}>Preencha os dados para começar</Text>
                </View>

                <FormRegister/>

                <Text style={styles.textoRodape}>
                    Ao criar uma conta, você concorda com nossos{' '}
                    <Text style={styles.link}>Termos de Uso</Text> e{' '}
                    <Text style={styles.link}>Política de Privacidade</Text>
                </Text>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 20
    },
    scrollContent: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 40,
    },
    containerInicio: {
        alignItems: "center",
        marginBottom: 5,
    },
    iconWrapper: {
        marginBottom: 16,
        shadowColor: '#8B5CF6',
        shadowOffset: {width: 0, height: 4},
        shadowOpacity: 0.2,
        shadowRadius: 12,
        elevation: 8,
    },
    containerIcon: {
        width: 50,
        height: 50,
        borderRadius: 40,
        backgroundColor: 'purple',
        justifyContent: 'center',
        alignItems: 'center',
    },
    titulo: {
        fontSize: 32,
        fontWeight: "700",
        color: '#1F2937',
        marginBottom: 8,
        letterSpacing: -0.5,
    },
    descricao: {
        fontSize: 16,
        color: "#6B7280",
        textAlign: 'center',
    },
    textoRodape: {
        fontSize: 12,
        textAlign: "center",
        color: "#9CA3AF",
        lineHeight: 18,
        paddingHorizontal: 16,
    },
    link: {
        color: '#8B5CF6',
        fontWeight: '600',
    }
});