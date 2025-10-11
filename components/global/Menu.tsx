import {useRouter} from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import {StyleSheet, TouchableOpacity, View} from "react-native";

const Menu = () => {
    const router = useRouter();

    const mainMenuItems = [
        {
            label: "Boards",
            icon: "albums-outline",
            onPress: () => router.push("/pages/BoardScreen"),
        }
    ];

    return (
        <View style={styles.bottomMenu}>
            {mainMenuItems.map((item, index) => (
                <TouchableOpacity key={index} style={styles.menuButton} onPress={item.onPress}>
                    <Ionicons name={item.icon as any} size={20} color="black"/>
                </TouchableOpacity>
            ))}
        </View>
    )
}

export default Menu;

const styles = StyleSheet.create({
    bottomMenu: {
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        paddingVertical: 20,
        borderTopWidth: 1,
        borderTopColor: '#707070'
    },
    menuButton: {
        alignItems: "center",
    },
    menuLabel: {
        color: "#fff",
        fontSize: 12,
        marginTop: 4,
    },
})