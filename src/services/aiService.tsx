import api from "./api";

export interface AIResponse {
    generated_text: string;
}

export const checkHealth = async () => {
    const response = await api.get("/health/health/");
    return response;
};

export const getVersion = async () => {
    const response = await api.get("/version/");
    return response;
};

export const analyzeSentiment = async (payload: {
    userId: string;
    context: string;
    mood: string;
    request: string;
}) => {
    const response = await api.post("/api/analyze", payload);
    return response;
};

export const generateText = async (payload: {
    userId: string;
    context: string;
    mood: string;
    request: string;
}): Promise<AIResponse> => {
    const response = await api.post<AIResponse>("/api/generate", payload);

    return response as unknown as AIResponse;
};