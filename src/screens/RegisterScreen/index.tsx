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

// Importa a função do serviço
// Certifique-se de que o caminho está correto para sua pasta services
import { registerUser } from "../../services/apiBackend";

export default function Register() {
    const navigation = useNavigation<any>();

    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [cpf, setCpf] = useState("");
    const [phone, setPhone] = useState("");
    const [birthDate, setBirthDate] = useState("");

    const [loading, setLoading] = useState(false);


    const FIXED_ROLE_ID = 1;
    const FIXED_JOB_ID = 1;

    const handleDateChange = (text: string) => {
        let cleaned = text.replace(/\D/g, "");
        if (cleaned.length > 2) {
            cleaned = cleaned.substring(0, 2) + "/" + cleaned.substring(2);
        }
        if (cleaned.length > 5) {
            cleaned = cleaned.substring(0, 5) + "/" + cleaned.substring(5, 9);
        }
        if (cleaned.length > 10) {
            cleaned = cleaned.substring(0, 10);
        }
        setBirthDate(cleaned);
    };

    const handleRegister = async () => {
        // Validação
        if (!nome || !email || !senha || !cpf || !birthDate) {
            Alert.alert("Atenção", "Preencha todos os campos obrigatórios!");
            return;
        }

        if (birthDate.length !== 10) {
            Alert.alert("Data Inválida", "Preencha a data completa: DD/MM/AAAA");
            return;
        }

        setLoading(true);

        try {
            const cpfLimpo = cpf.replace(/\D/g, "");
            const phoneLimpo = phone.replace(/\D/g, ""); // "21987654321"

            const [dia, mes, ano] = birthDate.split('/');
            const dataISO = `${ano}-${mes}-${dia}`;

            const payload = {
                roleId: FIXED_ROLE_ID,
                name: nome,
                email: email,
                password: senha,
                cpf: cpfLimpo,
                phone: phoneLimpo,
                birthDate: dataISO,
                currentJobId: FIXED_JOB_ID
            };

            console.log("Enviando Payload:", JSON.stringify(payload, null, 2));

            await registerUser(payload);

            Alert.alert("Sucesso", "Cadastro realizado! Faça login.", [
                { text: "OK", onPress: () => navigation.navigate("Login") },
            ]);

        } catch (error: any) {
            console.error("Erro API:", error);

            let msg = "Falha ao cadastrar.";
            if (error.response?.data) {
                msg = typeof error.response.data === 'string'
                    ? error.response.data
                    : (error.response.data.message || JSON.stringify(error.response.data));
            } else if (error.message) {
                msg = error.message;
            }

            Alert.alert("Erro", msg);
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
                autoCapitalize="none"
            />

            <TextInput
                placeholder="CPF (apenas números)"
                style={styles.input}
                placeholderTextColor="#999"
                value={cpf}
                onChangeText={setCpf}
                keyboardType="numeric"
                maxLength={14}
            />

            <View style={styles.row}>
                <TextInput
                    placeholder="DD/MM/AAAA"
                    style={[styles.input, styles.halfInput]}
                    placeholderTextColor="#999"
                    value={birthDate}
                    onChangeText={handleDateChange}
                    keyboardType="numeric"
                    maxLength={10}
                />
                <TextInput
                    placeholder="Telefone"
                    style={[styles.input, styles.halfInput]}
                    placeholderTextColor="#999"
                    value={phone}
                    onChangeText={setPhone}
                    keyboardType="phone-pad"
                />
            </View>

            <TextInput
                placeholder="Senha"
                style={styles.input}
                placeholderTextColor="#999"
                secureTextEntry
                value={senha}
                onChangeText={setSenha}
            />

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
        width: 140,
        height: 140,
        marginBottom: 10,
    },
    title: {
        fontSize: 26,
        fontWeight: "700",
        color: "#1A73E8",
        marginBottom: 20,
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
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        gap: 10
    },
    halfInput: {
        width: '48%',
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