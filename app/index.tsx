import {PaperProvider} from "react-native-paper";
import LoginScreen from "@/app/pages/LoginScreen";
import {createNativeStackNavigator} from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

export default function App() {
    return (
        <PaperProvider>
            <Stack.Navigator initialRouteName="Login">
                <Stack.Screen
                    name="Login"
                    component={LoginScreen}
                    options={{headerShown: false}}
                />
            </Stack.Navigator>
        </PaperProvider>
    );
}