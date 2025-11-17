import React, { useState, useMemo } from "react";
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    StatusBar,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";

import RecomendacoesCard from "../../components/Cards";

const Colors = {
    primaryBlue: "#3B82F6",
    darkBlue: "#1A498D",
    lightBlue: "#DBEAFE",
    white: "#FFFFFF",
    grayText: "#6B7280",
    greenInsight: "#10B981",
    yellowInsight: "#F59E0B",
    redInsight: "#EF4444",
    lineThrough: "#9CA3AF",
    borderColor: "#E5E7EB",
    background: "#F9FAFB",
};

const moodBackgroundColors: { [key: string]: string } = {
    motivado: "#D1FAE5",
    bem: "#DBEAFE",
    neutro: "#F3F4F6",
    desmotivado: "#FEF3C7",
    estressado: "#FEE2E2",
    cansado: "#E0E7FF",
    triste: "#BFDBFE",
    ansioso: "#FFEDD5",
};

export default function HomeScreen() {
    const [humor, setHumor] = useState("neutro");

    const humorOptions = [
        { label: "😀 Motivado", value: "motivado", emoji: "😀" },
        { label: "🙂 Bem", value: "bem", emoji: "🙂" },
        { label: "😐 Neutro", value: "neutro", emoji: "😐" },
        { label: "😕 Desmotivado", value: "desmotivado", emoji: "😕" },
        { label: "😣 Estressado", value: "estressado", emoji: "😣" },
        { label: "😴 Cansado", value: "cansado", emoji: "😴" },
        { label: "😞 Triste", value: "triste", emoji: "😞" },
        { label: "😰 Ansioso", value: "ansioso", emoji: "😰" },
    ];

    const selectedHumor = useMemo(() => {
        return humorOptions.find((h) => h.value === humor);
    }, [humor]);

    const currentBackgroundColor = moodBackgroundColors[humor] || Colors.background;

    return (
        <View style={[styles.fullScreenContainer, { backgroundColor: currentBackgroundColor }]}>
            <StatusBar barStyle="dark-content" backgroundColor={currentBackgroundColor} />

            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={styles.heroSection}>
                    <Text style={styles.heroGreeting}>Olá, Pedro!</Text>
                    <Text style={styles.heroQuestion}>Como você está se sentindo hoje?</Text>
                    <Text style={styles.heroEmoji}>{selectedHumor?.emoji}</Text>
                </View>

                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.moodSelectorScroll}>
                    {humorOptions.map((op) => (
                        <TouchableOpacity
                            key={op.value}
                            style={[
                                styles.moodOptionButton,
                                humor === op.value && styles.moodOptionSelected,
                            ]}
                            onPress={() => setHumor(op.value)}
                            activeOpacity={0.7}
                        >
                            <Text style={styles.moodOptionEmoji}>{op.emoji}</Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>

                <View style={styles.card}>
                    <Text style={styles.cardTitle}>Ajustar Humor</Text>
                    <View style={styles.pickerContainer}>
                        <Picker
                            selectedValue={humor}
                            onValueChange={(value) => setHumor(value)}
                            mode="dropdown"
                            style={styles.picker}
                            itemStyle={styles.pickerItem}
                        >
                            {humorOptions.map((op) => (
                                <Picker.Item key={op.value} label={op.label} value={op.value} />
                            ))}
                        </Picker>
                    </View>
                </View>

                <View style={styles.card}>
                    <Text style={styles.cardTitle}>Insights da IA</Text>
                    <View style={styles.insightItem}>
                        <Feather name="search" size={18} color={Colors.primaryBlue} style={styles.insightIcon} />
                        <Text style={styles.insightText}>Seu engajamento está <Text style={{ fontWeight: '700', color: Colors.greenInsight }}>estável</Text> hoje.</Text>
                    </View>
                    <View style={styles.insightItem}>
                        <MaterialCommunityIcons name="lightbulb-outline" size={18} color={Colors.primaryBlue} style={styles.insightIcon} />
                        <Text style={styles.insightText}>Pequenas pausas ajudam sua produtividade.</Text>
                    </View>
                </View>

                <RecomendacoesCard />

            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    fullScreenContainer: {
        flex: 1,
    },
    scrollContent: {
        flexGrow: 1,
        padding: 20,
        paddingTop: 0,
    },
    heroSection: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 30,
        marginBottom: 20,
    },
    heroGreeting: {
        fontSize: 28,
        fontWeight: '800',
        color: Colors.darkBlue,
        marginBottom: 5,
    },
    heroQuestion: {
        fontSize: 18,
        fontWeight: '500',
        color: Colors.grayText,
        marginBottom: 15,
    },
    heroEmoji: {
        fontSize: 60,
    },
    moodSelectorScroll: {
        marginHorizontal: -20,
        marginBottom: 20,
    },
    moodOptionButton: {
        paddingHorizontal: 15,
        paddingVertical: 8,
        borderRadius: 25,
        backgroundColor: 'rgba(255,255,255,0.4)',
        marginHorizontal: 5,
        borderWidth: 1,
        borderColor: Colors.borderColor,
    },
    moodOptionSelected: {
        backgroundColor: Colors.white,
        borderColor: Colors.primaryBlue,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    moodOptionEmoji: {
        fontSize: 24,
    },
    card: {
        backgroundColor: Colors.white,
        borderRadius: 14,
        padding: 18,
        marginBottom: 20,
        shadowColor: "#000",
        shadowOpacity: 0.08,
        shadowRadius: 5,
        elevation: 2,
        borderWidth: 1,
        borderColor: Colors.borderColor,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: "700",
        color: Colors.darkBlue,
        marginBottom: 14,
    },
    pickerContainer: {
        borderWidth: 1,
        borderColor: Colors.borderColor,
        borderRadius: 10,
        overflow: 'hidden',
        backgroundColor: Colors.white,
    },
    picker: {
        height: 60,
        width: '100%',
        color: Colors.darkBlue,
    },
    pickerItem: {
        fontSize: 16,
        color: Colors.darkBlue,
    },
    insightItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    insightIcon: {
        marginRight: 10,
    },
    insightText: {
        fontSize: 15,
        color: Colors.grayText,
        flex: 1,
        lineHeight: 22,
    },
});