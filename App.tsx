import "react-native-gesture-handler";
import AppRoutes from "./src/screens/navigation/AppRoutes";
import { AuthProvider } from "./src/contexts/AuthContext";

export default function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}
