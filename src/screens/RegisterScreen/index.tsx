import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Image,
    ScrollView,
    Alert,
    ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Picker } from "@react-native-picker/picker";
import axios from "axios";

export default function Register() {
    const navigation = useNavigation<any>();

    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [setor, setSetor] = useState("");
    const [loading, setLoading] = useState(false);

    const handleRegister = async () => {
        if (!nome || !email || !senha || !setor) {
            Alert.alert("Atenção", "Preencha todos os campos antes de cadastrar!");
            return;
        }

        setLoading(true);

        try {
            // Substitua pela URL da sua API
            const response = await axios.post("http://SEU_BACKEND/api/usuario", {
                nome,
                email,
                senha,
                setor,
            });

            if (response.status === 201 || response.status === 200) {
                Alert.alert("Sucesso", "Cadastro realizado com sucesso!", [
                    { text: "OK", onPress: () => navigation.navigate("login") },
                ]);
            } else {
                Alert.alert("Erro", "Não foi possível realizar o cadastro.");
            }
        } catch (error: any) {
            console.log(error.response || error.message || error);
            Alert.alert(
                "Erro",
                error.response?.data?.message || "Erro ao conectar com a API"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Image
                source={require("../../../assets/logo.png")}
                style={styles.logo}
                resizeMode="contain"
            />

            <Text style={styles.title}>Criar Conta</Text>

            <TextInput
                placeholder="Nome completo"
                style={styles.input}
                placeholderTextColor="#999"
                value={nome}
                onChangeText={setNome}
            />

            <TextInput
                placeholder="E-mail"
                style={styles.input}
                placeholderTextColor="#999"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
            />

            <TextInput
                placeholder="Senha"
                style={styles.input}
                placeholderTextColor="#999"
                secureTextEntry
                value={senha}
                onChangeText={setSenha}
            />

            <Text style={styles.label}>Setor</Text>
            <View style={styles.pickerContainer}>
                <Picker
                    selectedValue={setor}
                    onValueChange={(itemValue) => setSetor(itemValue)}
                >
                    <Picker.Item
                        label="Selecione um setor..."
                        value=""
                        enabled={false}
                        color="#999"
                    />
                    <Picker.Item label="RH" value="rh" />
                    <Picker.Item label="Financeiro" value="financeiro" />
                    <Picker.Item label="Operações" value="operacoes" />
                    <Picker.Item label="TI" value="ti" />
                </Picker>
            </View>

            <TouchableOpacity
                style={[styles.button, loading && styles.buttonDisabled]}
                onPress={handleRegister}
                disabled={loading}
            >
                {loading ? (
                    <ActivityIndicator color="#fff" />
                ) : (
                    <Text style={styles.buttonText}>Cadastrar</Text>
                )}
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                <Text style={styles.link}>
                    Já possui conta? <Text style={styles.linkBold}>Entrar</Text>
                </Text>
            </TouchableOpacity>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: "#fff",
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 20,
        paddingVertical: 40,
    },
    logo: {
        width: 160,
        height: 160,
        marginBottom: 10,
    },
    title: {
        fontSize: 26,
        fontWeight: "700",
        color: "#1A73E8",
        marginBottom: 25,
    },
    input: {
        width: "100%",
        padding: 12,
        borderWidth: 1,
        borderColor: "#1A73E8",
        borderRadius: 10,
        marginBottom: 14,
        color: "#333",
    },
    label: {
        width: "100%",
        fontSize: 14,
        color: "#1A73E8",
        marginBottom: 4,
        fontWeight: "600",
    },
    pickerContainer: {
        width: "100%",
        borderWidth: 1,
        borderColor: "#1A73E8",
        borderRadius: 10,
        marginBottom: 14,
        backgroundColor: "#fff",
    },
    button: {
        width: "100%",
        backgroundColor: "#1A73E8",
        paddingVertical: 14,
        borderRadius: 10,
        alignItems: "center",
        marginTop: 10,
    },
    buttonDisabled: {
        opacity: 0.7,
    },
    buttonText: {
        color: "#fff",
        fontWeight: "700",
        fontSize: 16,
    },
    link: {
        marginTop: 16,
        color: "#333",
        fontSize: 14,
    },
    linkBold: {
        color: "#1A73E8",
        fontWeight: "700",
    },
});
