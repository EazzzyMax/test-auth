import { NavigationContainer } from "@react-navigation/native";
import StackNavigator from "./src/StackNavigator";
import { AuthProvider } from "./src/AuthContext";

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <StackNavigator />
      </NavigationContainer>
    </AuthProvider>
  );
}

