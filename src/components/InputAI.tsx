import React, { useState } from "react";
import { View, TextInput, Button, Text, Alert } from "react-native";
import { generateText } from "../services/aiService";

interface AIInputProps {
    mood?: string;
    context?: string;
}

export default function AIInput({ mood = "neutral", context = "mobile-app" }: AIInputProps) {
    const [input, setInput] = useState("");
    const [response, setResponse] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSend = async () => {
        if (!input.trim()) return;

        setLoading(true);
        setResponse("");

        try {
            const data = await generateText({
                userId: "mobile-user",
                context,
                mood,
                request: input,
            });

            if (data?.generated_text) {
                setResponse(data.generated_text);
            } else {
                setResponse("A IA respondeu, mas sem texto.");
            }

        } catch (error: any) {
            const errorMessage = error.message || "Erro desconhecido";
            console.error("Erro na requisição:", errorMessage);
            setResponse(`Erro: ${errorMessage}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={{ padding: 20, gap: 16 }}>
            <TextInput
                value={input}
                onChangeText={setInput}
                placeholder="Digite algo para a IA"
                multiline
                style={{
                    borderWidth: 1,
                    borderColor: "#ccc",
                    borderRadius: 8,
                    padding: 12,
                    minHeight: 50
                }}
            />
            <Button
                title={loading ? "Enviando..." : "Enviar para IA"}
                onPress={handleSend}
                disabled={loading}
            />

            {response !== "" && (
                <View style={{ marginTop: 20, padding: 10, backgroundColor: "#f0f0f0", borderRadius: 8 }}>
                    <Text style={{ fontWeight: "bold", marginBottom: 5 }}>Resposta:</Text>
                    <Text>{response}</Text>
                </View>
            )}
        </View>
    );
}