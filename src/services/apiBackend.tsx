import axios from "axios";

const apiBackend = axios.create({
    baseURL: "https://the-last-eyes-api-3v3p.onrender.com",
    headers: {
        "Content-Type": "application/json",
    },
    timeout: 60000,
});

apiBackend.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response) {
            console.error("ERRO BACKEND:", error.response.status, error.response.data);
        } else {
            console.error("ERRO CONEXÃO:", error.message);
        }
        return Promise.reject(error);
    }
);

export const registerUser = async (userData: any) => {
    const response = await apiBackend.post("/users", userData);
    return response.data;
};

export const loginUser = async (loginData: { email: string; password: string }) => {
    const payload = {
        login: loginData.email,
        password: loginData.password
    };

    console.log("Tentando Logar em /login com:", payload);

    const response = await apiBackend.post("/login", payload);

    return response.data;
};

export default apiBackend;