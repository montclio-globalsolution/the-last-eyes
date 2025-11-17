import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Feather, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

export default function ExploreScreen() {
    return (
        <ScrollView style={styles.container}>

            {/* Card 1 - Hobbies */}
            <View style={styles.card}>
                <View style={styles.cardHeader}>
                    <Feather name="sun" size={22} color="#1A73E8" />
                    <Text style={styles.cardTitle}>Hobbies Recomendados</Text>
                </View>

                <Text style={styles.cardText}>
                    Explore novas atividades para relaxar a mente:
                </Text>

                <Text style={styles.item}>• Desenho livre ou pintura</Text>
                <Text style={styles.item}>• Jardinagem ou cuidado com plantas</Text>
                <Text style={styles.item}>• Escrita criativa ou diário</Text>
                <Text style={styles.item}>• Quebra-cabeças ou LEGO</Text>
            </View>

            {/* Card 2 - Músicas */}
            <View style={styles.card}>
                <View style={styles.cardHeader}>
                    <Ionicons name="musical-notes-outline" size={22} color="#1A73E8" />
                    <Text style={styles.cardTitle}>Sua Playlist do Momento</Text>
                </View>

                <Text style={styles.cardText}>
                    Músicas que combinam com seu humor atual:
                </Text>

                <Text style={styles.item}>• Lo-fi Beats para foco</Text>
                <Text style={styles.item}>• Indie leve para relaxar</Text>
                <Text style={styles.item}>• Piano ambiental para acalmar</Text>
            </View>

            {/* Card 3 - Atividade física leve */}
            <View style={styles.card}>
                <View style={styles.cardHeader}>
                    <MaterialCommunityIcons name="run" size={24} color="#1A73E8" />
                    <Text style={styles.cardTitle}>Atividade para Hoje</Text>
                </View>

                <Text style={styles.cardText}>
                    Pequenos movimentos podem transformar seu dia:
                </Text>

                <Text style={styles.item}>• Caminhada leve de 10 minutos</Text>
                <Text style={styles.item}>• Alongamento matinal</Text>
                <Text style={styles.item}>• Respiração 4-7-8 para ansiedade</Text>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#F9FAFB",
    },

    header: {
        fontSize: 28,
        fontWeight: "800",
        color: "#1A73E8",
        marginBottom: 25,
    },

    card: {
        backgroundColor: "#fff",
        padding: 20,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: "#E5E7EB",
        marginBottom: 25,
        elevation: 2,
    },

    cardHeader: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 12,
        gap: 8,
    },

    cardTitle: {
        fontSize: 18,
        fontWeight: "700",
        color: "#1F2937",
    },

    cardText: {
        fontSize: 15,
        color: "#6B7280",
        marginBottom: 14,
        lineHeight: 22,
    },

    item: {
        fontSize: 15,
        color: "#111827",
        marginBottom: 8,
        paddingLeft: 4,
    },
});
