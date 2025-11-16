import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function Home() {
    const navigation = useNavigation<any>();

    const [humor, setHumor] = useState("😐 Neutro"); // placeholder
    const [recomendacoes, setRecomendacoes] = useState([
        { id: 1, texto: "Faça uma pausa de 5 minutos", feito: false },
        { id: 2, texto: "Beba água e alongue-se", feito: false },
        { id: 3, texto: "Confira um tutorial rápido de produtividade", feito: false },
    ]);

    const handleCheckinHumor = () => {
        // Para testar, só um alert por enquanto
        Alert.alert("Check-in", "Registrar humor clicado!");
        // Aqui futuramente abriria modal ou nova tela de check-in
    };

    const toggleRecomendacao = (id: number) => {
        setRecomendacoes((prev) =>
            prev.map((item) =>
                item.id === id ? { ...item, feito: !item.feito } : item
            )
        );
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.header}>Olá, Pedro!</Text>

            {/* Card de Humor */}
            <TouchableOpacity style={styles.card} onPress={handleCheckinHumor}>
                <Text style={styles.cardTitle}>Como você está se sentindo?</Text>
                <Text style={styles.humor}>{humor}</Text>
            </TouchableOpacity>

            {/* Card de Alertas IA */}
            <View style={styles.card}>
                <Text style={styles.cardTitle}>Sinais da IA</Text>
                <Text style={styles.alertText}>⚠️ Hoje seu engajamento caiu 20%</Text>
                <Text style={styles.alertText}>⚠️ Você parece sobrecarregado, faça uma pausa!</Text>
            </View>

            {/* Lista de Recomendações */}
            <View style={styles.card}>
                <Text style={styles.cardTitle}>Recomendações</Text>
                {recomendacoes.map((item) => (
                    <TouchableOpacity
                        key={item.id}
                        style={[
                            styles.recomendacao,
                            item.feito && styles.recomendacaoFeita,
                        ]}
                        onPress={() => toggleRecomendacao(item.id)}
                    >
                        <Text
                            style={[
                                styles.recomendacaoText,
                                item.feito && styles.recomendacaoTextFeita,
                            ]}
                        >
                            {item.texto}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: "#fff",
        padding: 20,
    },
    header: {
        fontSize: 24,
        fontWeight: "700",
        color: "#1A73E8",
        marginBottom: 20,
    },
    card: {
        backgroundColor: "#F5F8FF",
        borderRadius: 12,
        padding: 15,
        marginBottom: 15,
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: "700",
        color: "#1A73E8",
        marginBottom: 10,
    },
    humor: {
        fontSize: 32,
        textAlign: "center",
        marginTop: 10,
    },
    alertText: {
        fontSize: 14,
        color: "#D93025",
        marginBottom: 5,
    },
    recomendacao: {
        padding: 10,
        borderRadius: 8,
        backgroundColor: "#fff",
        borderWidth: 1,
        borderColor: "#1A73E8",
        marginBottom: 8,
    },
    recomendacaoFeita: {
        backgroundColor: "#E0EFFF",
        borderColor: "#A0C4FF",
    },
    recomendacaoText: {
        fontSize: 14,
        color: "#1A73E8",
    },
    recomendacaoTextFeita: {
        textDecorationLine: "line-through",
        color: "#888",
    },
});
