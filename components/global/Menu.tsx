import {useRouter} from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import {StyleSheet, TouchableOpacity, View} from "react-native";

const Menu = () => {
    const router = useRouter();

    const mainMenuItems = [
        {
            label: "Home",
            icon: "home-sharp",
            onPress: () => router.push("/pages/HomeScreen"),
        },
        {
            label: "Boards",
            icon: "albums-sharp",
            onPress: () => router.push("/pages/BoardScreen"),
        }
    ];

    return (
        <View style={styles.bottomMenu}>
            {mainMenuItems.map((item, index) => (
                <TouchableOpacity key={index} style={styles.menuButton} onPress={item.onPress}>
                    <Ionicons name={item.icon as any} size={25} color="black"/>
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
        paddingVertical: 15,
        borderTopWidth: 1,
        borderTopColor: '#a1a1a1'
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