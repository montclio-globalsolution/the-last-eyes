import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';

const Colors = {
    primaryBlue: "#3B82F6",
    darkBlue: "#1A498D",
    lightBlue: "#DBEAFE",
    white: "#FFFFFF",
    grayText: "#6B7280",
    lineThrough: "#9CA3AF",
    borderColor: "#E5E7EB",
    background: "#F9FAFB",
};

const DADOS_INICIAIS = [
    { id: 1, texto: "Respire fundo por 1 minuto", feito: false },
    { id: 2, texto: "Faça uma pausa rápida de 5 minutos", feito: false },
    { id: 3, texto: "Beba água e se alongue", feito: false },
    { id: 4, texto: "Faça uma caminhada curta ao ar livre", feito: false },
    { id: 5, texto: "Ouça sua música favorita", feito: false },
];

// ⬇️⬇️ AQUI ESTÁ A CORREÇÃO IMPORTANTE ⬇️⬇️
// Estamos usando "export default" para casar com o import da sua HomeScreen
export default function RecomendacoesCard() {
    const [recomendacoes, setRecomendacoes] = useState(DADOS_INICIAIS);

    const toggleRecomendacao = (id: number) => {
        setRecomendacoes((prev) =>
            prev.map((item) =>
                item.id === id ? { ...item, feito: !item.feito } : item
            )
        );
    };

    return (
        <View style={styles.card}>
            <Text style={styles.cardTitle}>Recomendações personalizadas</Text>

            {recomendacoes.map((item) => (
                <TouchableOpacity
                    key={item.id}
                    style={[
                        styles.recomendacaoItem,
                        item.feito && styles.recomendacaoItemFeito,
                    ]}
                    onPress={() => toggleRecomendacao(item.id)}
                    activeOpacity={0.7}
                >
                    <Feather
                        name={item.feito ? "check-square" : "square"}
                        size={20}
                        color={item.feito ? Colors.lineThrough : Colors.primaryBlue}
                        style={styles.recomendacaoIcon}
                    />

                    <View style={styles.textContainer}>
                        <Text
                            style={[
                                styles.recomendacaoText,
                                item.feito
                                    ? styles.recomendacaoTextFeito
                                    : { color: Colors.darkBlue }
                            ]}
                        >
                            {item.texto}
                        </Text>
                    </View>

                </TouchableOpacity>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
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
    recomendacaoItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.lightBlue,
        borderRadius: 10,
        padding: 14,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: Colors.primaryBlue,
    },
    recomendacaoItemFeito: {
        backgroundColor: Colors.background,
        borderColor: Colors.borderColor,
    },
    recomendacaoIcon: {
        marginRight: 12,
    },
    textContainer: {
        flex: 1,
    },
    recomendacaoText: {
        fontSize: 15,
        lineHeight: 22,
    },
    recomendacaoTextFeito: {
        textDecorationLine: "line-through",
        color: Colors.lineThrough,
    },
});