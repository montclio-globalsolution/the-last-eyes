import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    ActivityIndicator,
    TextInput,
    Alert,
    ScrollView,
    KeyboardAvoidingView,
    Platform
} from "react-native";
import { useAuth } from "../../contexts/AuthContext";
import apiBackend from "../../services/apiBackend";

export default function ProfileScreen() {
    const { signOut } = useAuth();

    const FIXED_USER_ID = 6;

    const [profile, setProfile] = useState<any>({});
    const [formData, setFormData] = useState<any>({});

    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [saving, setSaving] = useState(false);

    async function loadProfile() {
        try {
            setLoading(true);
            console.log(`Buscando ID: ${FIXED_USER_ID}`);

            const response = await apiBackend.get(`/users/${FIXED_USER_ID}`);

            console.log("Dados recebidos:", response.data);

            const data = { ...response.data };

            setProfile(data);
            setFormData(data);

        } catch (err) {
            console.log("Erro carregando perfil:", err);
            Alert.alert("Erro", "Não foi possível carregar os dados.");
        } finally {
            setLoading(false);
        }
    }

    async function handleUpdate() {
        try {
            setSaving(true);

            if (!formData.name || !formData.email) {
                Alert.alert("Atenção", "Nome e E-mail são obrigatórios.");
                setSaving(false);
                return;
            }

            const response = await apiBackend.put(`/users/${FIXED_USER_ID}`, formData);

            const updatedData = { ...response.data };
            setProfile(updatedData);

            setIsEditing(false);
            Alert.alert("Sucesso", "Perfil atualizado!");

        } catch (err) {
            console.error("Erro ao atualizar:", err);
            Alert.alert("Erro", "Falha ao atualizar perfil.");
        } finally {
            setSaving(false);
        }
    }

    function confirmDelete() {
        Alert.alert(
            "Excluir Conta",
            "Tem certeza? O usuário será apagado permanentemente.",
            [
                { text: "Cancelar", style: "cancel" },
                { text: "Excluir", style: "destructive", onPress: handleDelete }
            ]
        );
    }

    async function handleDelete() {
        try {
            setLoading(true);
            await apiBackend.delete(`/users/${FIXED_USER_ID}`);
            Alert.alert("Conta Excluída", "Usuário removido com sucesso.");
            signOut();
        } catch (err) {
            console.error("Erro ao deletar:", err);
            Alert.alert("Erro", "Não foi possível excluir.");
            setLoading(false);
        }
    }

    const handleChange = (key: string, value: string) => {
        setFormData((prev: any) => ({ ...prev, [key]: value }));
    };

    const handleCancelEdit = () => {
        setFormData({ ...profile });
        setIsEditing(false);
    };

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

    const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(profile?.name || "User")}&background=1A73E8&color=fff&size=128`;

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
            <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>

                <View style={styles.profileHeader}>
                    <Image source={{ uri: avatarUrl }} style={styles.avatar} />

                    {isEditing ? (
                        <TextInput
                            style={styles.nameInput}
                            value={formData.name}
                            onChangeText={(t) => handleChange("name", t)}
                            placeholder="Seu Nome"
                        />
                    ) : (
                        <Text style={styles.name}>{String(profile?.name || "")}</Text>
                    )}

                    <Text style={styles.email}>{String(profile?.email || "")}</Text>
                </View>

                <View style={styles.card}>
                    <View style={styles.cardHeader}>
                        <Text style={styles.cardTitle}>Dados Pessoais</Text>

                        {!isEditing && (
                            <TouchableOpacity onPress={() => setIsEditing(true)} style={styles.editBtn}>
                                <Text style={styles.editLink}>Editar</Text>
                            </TouchableOpacity>
                        )}
                    </View>

                    <View style={styles.infoRow}>
                        <Text style={styles.label}>E-mail</Text>
                        {isEditing ? (
                            <TextInput
                                style={styles.input}
                                value={formData.email}
                                onChangeText={(t) => handleChange("email", t)}
                                keyboardType="email-address"
                                autoCapitalize="none"
                            />
                        ) : (
                            <Text style={styles.value}>{String(profile?.email || "-")}</Text>
                        )}
                    </View>

                    <View style={styles.infoRow}>
                        <Text style={styles.label}>Telefone</Text>
                        {isEditing ? (
                            <TextInput
                                style={styles.input}
                                value={formData.phone ? String(formData.phone) : ""}
                                onChangeText={(t) => handleChange("phone", t)}
                                keyboardType="phone-pad"
                            />
                        ) : (
                            <Text style={styles.value}>{String(profile?.phone || "Não informado")}</Text>
                        )}
                    </View>

                    <View style={styles.infoRow}>
                        <Text style={styles.label}>CPF</Text>
                        <Text style={[styles.value, { color: '#999' }]}>
                            {String(profile?.cpf || "Não informado")}
                        </Text>
                    </View>

                    {isEditing && (
                        <View style={styles.actionButtons}>
                            <TouchableOpacity style={styles.cancelButton} onPress={handleCancelEdit}>
                                <Text style={styles.cancelText}>Cancelar</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.saveButton} onPress={handleUpdate} disabled={saving}>
                                {saving ? (
                                    <ActivityIndicator color="#FFF" size="small" />
                                ) : (
                                    <Text style={styles.saveText}>Salvar</Text>
                                )}
                            </TouchableOpacity>
                        </View>
                    )}
                </View>

                {!isEditing && (
                    <>
                        <TouchableOpacity style={styles.logoutButton} onPress={signOut}>
                            <Text style={styles.logoutText}>Sair da Conta</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.deleteButton} onPress={confirmDelete}>
                            <Text style={styles.deleteText}>Excluir Conta</Text>
                        </TouchableOpacity>
                    </>
                )}

            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F9FAFB",
        paddingHorizontal: 22,
        paddingTop: 40,
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
    profileHeader: {
        alignItems: "center",
        marginBottom: 30,
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 15,
        backgroundColor: '#E5E7EB'
    },
    name: {
        fontSize: 22,
        fontWeight: "800",
        color: "#111827",
        marginBottom: 4,
        textAlign: 'center'
    },
    nameInput: {
        fontSize: 22,
        fontWeight: "800",
        color: "#111827",
        marginBottom: 4,
        textAlign: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#1A73E8',
        minWidth: 200
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
        marginBottom: 25,
        elevation: 2,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: "700",
        color: "#1F2937",
    },
    editBtn: {
        padding: 5,
    },
    editLink: {
        color: "#1A73E8",
        fontWeight: "600",
    },
    infoRow: {
        marginBottom: 16,
    },
    label: {
        fontSize: 13,
        color: "#6B7280",
        marginBottom: 4,
    },
    value: {
        fontSize: 16,
        fontWeight: "500",
        color: "#111827",
    },
    input: {
        fontSize: 16,
        fontWeight: "500",
        color: "#111827",
        borderWidth: 1,
        borderColor: "#D1D5DB",
        borderRadius: 8,
        padding: 8,
        backgroundColor: "#F9FAFB"
    },
    actionButtons: {
        flexDirection: 'row',
        gap: 10,
        marginTop: 10
    },
    saveButton: {
        flex: 1,
        backgroundColor: "#1A73E8",
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
    },
    saveText: { color: "#FFF", fontWeight: "600" },
    cancelButton: {
        flex: 1,
        backgroundColor: "#FFF",
        borderWidth: 1,
        borderColor: "#EF4444",
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
    },
    cancelText: { color: "#EF4444", fontWeight: "600" },
    logoutButton: {
        backgroundColor: "#FFF",
        borderWidth: 1,
        borderColor: "#E5E7EB",
        padding: 16,
        borderRadius: 12,
        marginBottom: 12,
    },
    logoutText: {
        textAlign: "center",
        fontSize: 16,
        fontWeight: "600",
        color: "#374151",
    },
    deleteButton: {
        backgroundColor: "#FEE2E2",
        padding: 16,
        borderRadius: 12,
        marginBottom: 30,
    },
    deleteText: {
        textAlign: "center",
        fontSize: 16,
        fontWeight: "600",
        color: "#EF4444",
    },
});