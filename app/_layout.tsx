import {Stack} from 'expo-router';
import {PaperProvider} from 'react-native-paper';

export default function RootLayout() {
    return (
        <PaperProvider>
            <Stack screenOptions={{headerShown: false}}>
                <Stack.Screen name="index"/>
                <Stack.Screen name="pages/HomeScreen"/>
                <Stack.Screen name="pages/BoardScreen"/>
                <Stack.Screen name="pages/LoginScreen"/>
                <Stack.Screen name="pages/UserRegisterScreen"/>
            </Stack>
        </PaperProvider>
    );
}