import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, Alert, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { styles } from '../styles/LoginStyle';

export default function Login() {
    const navigation = useNavigation<any>();

    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [loading, setLoading] = useState(false);

    async function handleLogin() {
        if (!email || !senha) {
            Alert.alert("Erro", "Preencha todos os campos!");
            return;
        }

        setLoading(true);

        try {
            // depois trocamos por uma chamada real à API
            setTimeout(() => {
                setLoading(false);
                navigation.navigate("AppRoutes"); // quando integrar com auth, trocamos isso aqui
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
