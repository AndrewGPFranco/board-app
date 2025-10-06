import Ionicons from "@expo/vector-icons/Ionicons";
import {View, StyleSheet, Text} from "react-native";
import {FormLogin} from "@/components/auth/FormLogin";

export function LoginScreen() {
    return (
        <View style={styles.container}>
            <View style={styles.containerIcons}>
                <Ionicons name="videocam-outline" size={32} color="purple" style={styles.icon}/>
                <Ionicons name="book-outline" size={32} color="purple" style={styles.icon}/>
                <Ionicons name="barcode-outline" size={32} color="purple"/>
            </View>

            <View style={styles.containerInfos}>
                <Text style={styles.titulo}>Gerenciador de mídias</Text>
                <Text style={styles.descricao}>
                    Acompanhe seu progresso em filmes, séries, livros e animes
                </Text>
            </View>

            <FormLogin/>

            <Text style={styles.termos}>
                {/*TODO: arrumar para ser um link*/}
                Ao continuar, você concorda com nossos <Text style={styles.falsoLink}>Termos de Uso</Text>
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 20,
    },
    containerIcons: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 20,
    },
    icon: {
        marginRight: 10,
    },
    containerInfos: {
        alignItems: "center",
        marginBottom: 20,
    },
    titulo: {
        fontSize: 19,
        fontWeight: "bold",
        marginBottom: 5,
    },
    descricao: {
        fontSize: 13,
        textAlign: "center",
        color: "#666",
    },
    termos: {
        marginTop: 20,
        fontSize: 12,
        color: "gray",
        textAlign: "center",
    },
    falsoLink: {
        fontSize: 12,
        color: 'purple',
        fontWeight: "bold",
    }
});
