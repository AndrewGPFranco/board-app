import {LoginScreen} from "@/app/pages/LoginScreen";
import {createNativeStackNavigator} from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

export default function App() {
    return (
        <Stack.Navigator initialRouteName="Login">
            <Stack.Screen name="Login" options={{headerShown: false}} component={LoginScreen}/>
        </Stack.Navigator>
    );
}