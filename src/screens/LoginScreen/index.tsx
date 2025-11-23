import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ActivityIndicator,
    Alert,
    Image,
    StyleSheet,
    KeyboardAvoidingView,
    Platform
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import { useAuth } from "../../contexts/AuthContext";

export default function Login() {
    const navigation = useNavigation<any>();
    const { signIn } = useAuth();

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
            await signIn({ email, password: senha });

            navigation.reset({
                index: 0,
                routes: [{ name: "AppDrawer" }],
            });

        } catch (error: any) {
            console.error("Erro Login:", error);

            let msg = "Não foi possível fazer login.";

            if (error.response?.data?.message) {
                msg = error.response.data.message;
            } else if (error.message) {
                if (error.message.includes("401") || error.message.includes("403")) {
                    msg = "E-mail ou senha incorretos.";
                }
            }

            Alert.alert("Erro de Acesso", msg);
        } finally {
            setLoading(false);
        }
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}
        >
            <Image
                source={require("../../../assets/logo.png")}
                style={styles.logo}
                resizeMode="contain"
            />

            <Text style={styles.title}>Bem-vindo!</Text>

            <TextInput
                style={styles.input}
                placeholder="E-mail (Login)"
                placeholderTextColor="#888"
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
            />

            <TextInput
                style={styles.input}
                placeholder="Senha"
                placeholderTextColor="#888"
                secureTextEntry={true}
                value={senha}
                onChangeText={setSenha}
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
        </KeyboardAvoidingView>
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
        color: "#333"
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