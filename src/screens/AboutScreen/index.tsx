import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function AboutScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Sobre o App</Text>
            <Text style={styles.text}>
                The Last Eyes é uma plataforma para monitorar padrões de comportamento, bem-estar e engajamento no trabalho.
            </Text>
            <Text style={styles.text}>Versão: 1.0.0</Text>
            <Text style={styles.text}>Desenvolvido por: Pedro Henrique e equipe</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: "center", padding: 20 },
    title: { fontSize: 24, fontWeight: "bold", color: "#1A73E8", marginBottom: 16 },
    text: { fontSize: 16, marginBottom: 8 },
});
