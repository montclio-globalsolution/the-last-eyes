import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFFFFF",
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 24,
    },

    logo: {
        width: 140,
        height: 140,
        marginBottom: 20,
    },

    title: {
        fontSize: 26,
        fontWeight: "bold",
        color: "#1E4FFF",
        marginBottom: 24,
    },

    input: {
        width: "100%",
        height: 52,
        backgroundColor: "#F2F2F2",
        borderRadius: 12,
        paddingHorizontal: 16,
        fontSize: 16,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: "#D9D9D9",
    },

    button: {
        width: "100%",
        height: 52,
        backgroundColor: "#1E4FFF",
        borderRadius: 12,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 8,
    },

    buttonText: {
        color: "#FFF",
        fontSize: 18,
        fontWeight: "600",
    },

    link: {
        marginTop: 20,
        color: "#555",
        fontSize: 15,
    },

    linkBold: {
        color: "#1E4FFF",
        fontWeight: "bold",
    },
});
