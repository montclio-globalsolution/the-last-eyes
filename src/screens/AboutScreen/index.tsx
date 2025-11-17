import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { BUILD_COMMIT, BUILD_VERSION } from "../../config/buildInfo";
import { MaterialIcons } from "@expo/vector-icons";

export default function AboutScreen() {
    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <MaterialIcons name="info-outline" size={34} color="#1A73E8" />
            </View>

            {/* Descrição */}
            <View style={styles.card}>
                <Text style={styles.cardTitle}>Descrição do Projeto</Text>
                <Text style={styles.description}>
                    O The Last Eyes é uma plataforma inteligente focada em bem-estar corporativo,
                    comportamento e engajamento no ambiente de trabalho.
                    Ele identifica padrões, sugere melhorias e oferece recomendações personalizadas.
                </Text>
            </View>

            {/* Informações Técnicas */}
            <View style={styles.cardTech}>
                <Text style={styles.cardTitle}>Informações Técnicas</Text>

                <View style={styles.row}>
                    <Text style={styles.label}>Versão:</Text>
                    <Text style={styles.value}>{BUILD_VERSION}</Text>
                </View>

                <View style={styles.row}>
                    <Text style={styles.label}>Commit:</Text>
                    <Text style={styles.value}>
                        {BUILD_COMMIT || "Não disponível"}
                    </Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 22,
        backgroundColor: "#F9FAFB",
    },

    header: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 25,
        justifyContent: "center",
    },

    headerTitle: {
        fontSize: 28,
        fontWeight: "800",
        color: "#1A73E8",
        marginLeft: 12,
    },

    card: {
        backgroundColor: "#FFFFFF",
        padding: 20,
        borderRadius: 14,
        borderColor: "#E5E7EB",
        borderWidth: 1,
        marginBottom: 20,
        shadowColor: "#000",
        shadowOpacity: 0.06,
        shadowRadius: 4,
        elevation: 3,
    },

    cardTech: {
        backgroundColor: "#FFFFFF",
        padding: 20,
        borderRadius: 14,
        borderColor: "#E5E7EB",
        borderWidth: 1,
        shadowColor: "#000",
        shadowOpacity: 0.06,
        shadowRadius: 4,
        elevation: 3,
    },

    cardTitle: {
        fontSize: 18,
        fontWeight: "700",
        color: "#1A73E8",
        marginBottom: 10,
    },

    description: {
        fontSize: 15,
        color: "#444",
        lineHeight: 22,
    },

    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 10,
    },

    label: {
        fontSize: 16,
        color: "#6B7280",
        fontWeight: "500",
    },

    value: {
        fontSize: 16,
        fontWeight: "700",
        color: "#1A1A1A",
    },
});
