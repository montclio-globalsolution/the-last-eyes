import { useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ActivityIndicator,
    Alert,
    Image,
    StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function Login() {
    const navigation = useNavigation<any>();

    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleLogin() {
        if (!email || !senha) {
            Alert.alert("Erro", "Preencha todos os campos!");
            return;
        }

        setLoading(true);

        try {
            // Placeholder: simula login
            setTimeout(() => {
                setLoading(false);
                // Navega direto para o Drawer principal
                navigation.reset({
                    index: 0,
                    routes: [{ name: "AppDrawer" }], // <-- Atualizado
                });
            }, 1200);
        } catch (error) {
            setLoading(false);
            Alert.alert("Erro", "Não foi possível fazer login.");
        }
    }

    return (
        <View style={styles.container}>
            <Image
                source={require("../../../assets/logo.png")}
                style={styles.logo}
                resizeMode="contain"
            />

            <Text style={styles.title}>Bem-vindo!</Text>

            <TextInput
                style={styles.input}
                placeholder="E-mail"
                placeholderTextColor="#888"
                keyboardType="email-address"
                onChangeText={setEmail}
                value={email}
            />

            <TextInput
                style={styles.input}
                placeholder="Senha"
                placeholderTextColor="#888"
                secureTextEntry
                onChangeText={setSenha}
                value={senha}
            />

            <TouchableOpacity
                style={styles.button}
                onPress={handleLogin}
                disabled={loading}
            >
                {loading ? (
                    <ActivityIndicator size="small" color="#FFF" />
                ) : (
                    <Text style={styles.buttonText}>Entrar</Text>
                )}
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate("Register")}>
                <Text style={styles.link}>
                    Não tem conta? <Text style={styles.linkBold}>Cadastre-se</Text>
                </Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFFFFF",
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 24,
    },
    logo: {
        width: 140,
        height: 140,
        marginBottom: 20,
    },
    title: {
        fontSize: 26,
        fontWeight: "bold",
        color: "#1A73E8",
        marginBottom: 24,
    },
    input: {
        width: "100%",
        height: 52,
        backgroundColor: "#F2F2F2",
        borderRadius: 12,
        paddingHorizontal: 16,
        fontSize: 16,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: "#D9D9D9",
    },
    button: {
        width: "100%",
        height: 52,
        backgroundColor: "#1A73E8",
        borderRadius: 12,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 8,
    },
    buttonText: {
        color: "#FFF",
        fontSize: 18,
        fontWeight: "600",
    },
    link: {
        marginTop: 20,
        color: "#555",
        fontSize: 15,
    },
    linkBold: {
        color: "#1A73E8",
        fontWeight: "bold",
    },
});
