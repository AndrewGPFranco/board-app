import HomeScreen from "@/app/pages/HomeScreen";
import {PaperProvider} from "react-native-paper";
import LoginScreen from "@/app/pages/LoginScreen";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import UserRegisterScreen from "@/app/pages/UserRegisterScreen";

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
                <Stack.Screen
                    name="Home"
                    component={HomeScreen}
                    options={{headerShown: false}}
                />
                <Stack.Screen
                    name="UserRegister"
                    component={UserRegisterScreen}
                    options={{headerShown: false}}
                />
            </Stack.Navigator>
        </PaperProvider>
    );
}