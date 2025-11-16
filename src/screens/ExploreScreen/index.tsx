import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function ExploreScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Explore+</Text>
            <Text style={styles.text}>
                Aqui você verá recomendações de atividades para melhorar seu bem-estar:
            </Text>
            <Text style={styles.item}>• Pausas ativas</Text>
            <Text style={styles.item}>• Meditação guiada</Text>
            <Text style={styles.item}>• Conteúdos de aprendizado</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: "center", padding: 20 },
    title: { fontSize: 24, fontWeight: "bold", color: "#1A73E8", marginBottom: 16 },
    text: { fontSize: 16, marginBottom: 12 },
    item: { fontSize: 16, marginBottom: 6 },
});
