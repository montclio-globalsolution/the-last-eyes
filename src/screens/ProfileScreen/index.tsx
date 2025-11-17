import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    ActivityIndicator,
} from "react-native";
import { useAuth } from "../../contexts/AuthContext";
import api from "../../services/api";

export default function ProfileScreen() {
    const { signOut, user } = useAuth();

    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);

    const mockProfile = {
        name: "Pedro Henrique",
        email: "pedro@email.com",
        sector: "Desenvolvimento",
        role: "Analista Jr",
        phone: "(11) 90000-0000",
        avatar: null,
    };

    const useMock = true;

    async function loadProfile() {
        try {
            setLoading(true);

            if (useMock) {
                await new Promise((res) => setTimeout(res, 400));
                setProfile(mockProfile);
                return;
            }

            const response = await api.get(`/profile/${user.id}`);
            setProfile(response.data);

        } catch (err) {
            console.log("Erro carregando perfil:", err);

            setProfile(mockProfile);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadProfile();
    }, []);

    if (loading) {
        return (
            <View style={styles.center}>
                <ActivityIndicator size="large" color="#1A73E8" />
                <Text style={styles.loadingText}>Carregando perfil...</Text>
            </View>
        );
    }

    const avatarUrl =
        profile.avatar ||
        `https://ui-avatars.com/api/?name=${encodeURIComponent(profile.name)}&background=1A73E8&color=fff&size=128`;

    return (
        <View style={styles.container}>

            <View style={styles.profileHeader}>
                <Image source={{ uri: avatarUrl }} style={styles.avatar} />

                <Text style={styles.name}>{profile.name}</Text>
                <Text style={styles.email}>{profile.email}</Text>
            </View>

            <View style={styles.card}>
                <Text style={styles.cardTitle}>Informações</Text>

                <View style={styles.infoRow}>
                    <Text style={styles.label}>Setor</Text>
                    <Text style={styles.value}>{profile.sector}</Text>
                </View>

                <View style={styles.infoRow}>
                    <Text style={styles.label}>Cargo</Text>
                    <Text style={styles.value}>{profile.role}</Text>
                </View>

                <View style={styles.infoRow}>
                    <Text style={styles.label}>Telefone</Text>
                    <Text style={styles.value}>{profile.phone}</Text>
                </View>
            </View>

            <TouchableOpacity style={styles.logoutButton} onPress={signOut}>
                <Text style={styles.logoutText}>Sair</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 22,
        paddingTop: 50,
        backgroundColor: "#F9FAFB",
    },

    header: {
        fontSize: 28,
        fontWeight: "800",
        color: "#1A73E8",
        marginBottom: 25,
    },

    profileHeader: {
        alignItems: "center",
        marginBottom: 35,
    },

    avatar: {
        width: 110,
        height: 110,
        borderRadius: 100,
        marginBottom: 12,
    },

    name: {
        fontSize: 22,
        fontWeight: "800",
        color: "#111827",
        marginBottom: 4,
    },

    email: {
        fontSize: 15,
        color: "#6B7280",
    },

    card: {
        backgroundColor: "#fff",
        padding: 20,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: "#E5E7EB",
        marginBottom: 40,
        elevation: 3,
    },

    cardTitle: {
        fontSize: 18,
        fontWeight: "700",
        color: "#1F2937",
        marginBottom: 15,
    },

    infoRow: {
        marginBottom: 14,
    },

    label: {
        fontSize: 13,
        color: "#6B7280",
    },

    value: {
        fontSize: 17,
        fontWeight: "600",
        color: "#111827",
    },

    logoutButton: {
        backgroundColor: "#EF4444",
        padding: 16,
        borderRadius: 14,
        marginTop: "auto",
        marginBottom: 20,
    },

    logoutText: {
        textAlign: "center",
        fontSize: 18,
        fontWeight: "700",
        color: "#fff",
    },

    center: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },

    loadingText: {
        marginTop: 12,
        color: "#6B7280",
    },
});
