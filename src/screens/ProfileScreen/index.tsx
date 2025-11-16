import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function ProfileScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Meu Perfil</Text>
            <Text style={styles.text}>Nome: Pedro Henrique</Text>
            <Text style={styles.text}>E-mail: pedro@email.com</Text>
            <Text style={styles.text}>Setor: Desenvolvimento</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: "center", padding: 20 },
    title: { fontSize: 24, fontWeight: "bold", color: "#1A73E8", marginBottom: 16 },
    text: { fontSize: 16, marginBottom: 8 },
});
