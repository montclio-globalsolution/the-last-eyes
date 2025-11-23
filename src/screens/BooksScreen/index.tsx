import React from "react";
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    Linking,
    Alert
} from "react-native";

type Book = {
    id: string;
    title: string;
    author: string;
    description: string;
    link: string;
};

export default function BooksScreen() {

    const books: Book[] = [
        {
            id: "1",
            title: "Crime e Castigo",
            author: "Fiódor Dostoiévski",
            description: "A angústia psicológica de Raskólnikov após cometer um crime, explorando culpa, redenção e a moralidade humana.",
            link: "https://www.amazon.com.br/Crime-Castigo-Fiodor-Dostoievski/dp/8573266474"
        },
        {
            id: "2",
            title: "A Morte de Ivan Ilitch",
            author: "Liev Tolstói",
            description: "Uma novela magistral sobre a vida burocracia, a doença e a inevitável reflexão sobre o sentido da existência.",
            link: "https://www.amazon.com.br/morte-Ivan-Ilitch-Liev-Tolstoi/dp/8573263203"
        },
        {
            id: "3",
            title: "A Metamorfose",
            author: "Franz Kafka",
            description: "O absurdo e a alienação de Gregor Samsa, que acorda transformado em um inseto monstruoso.",
            link: "https://www.amazon.com.br/Metamorfose-Franz-Kafka/dp/8535902778"
        },
        {
            id: "4",
            title: "Livro do Desassossego",
            author: "Fernando Pessoa",
            description: "A obra-prima em prosa de Bernardo Soares. Reflexões profundas sobre a alma, o tédio e a existência.",
            link: "https://www.amazon.com.br/Livro-do-desassossego-Fernando-Pessoa/dp/8535920954"
        },
        {
            id: "5",
            title: "A Hora da Estrela",
            author: "Clarice Lispector",
            description: "A comovente história de Macabéa, uma nordestina ingênua no Rio de Janeiro.",
            link: "https://www.amazon.com.br/hora-da-estrela-Clarice-Lispector/dp/853253106X"
        }
    ];

    const handleOpenLink = async (url: string) => {
        try {
            await Linking.openURL(url);
        } catch (error) {
            Alert.alert("Erro", "Não foi possível abrir o link.");
        }
    };

    const renderBook = ({ item }: { item: Book }) => (
        <TouchableOpacity
            style={styles.card}
            activeOpacity={0.7}
            onPress={() => handleOpenLink(item.link)}
        >
            <View style={styles.infoContainer}>
                <View>
                    <Text style={styles.bookTitle}>{item.title}</Text>
                    <Text style={styles.author}>{item.author}</Text>
                </View>

                <Text style={styles.description}>
                    {item.description}
                </Text>

                <Text style={styles.linkText}>Ver na Amazon ↗</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.headerTitle}>Biblioteca Clássica</Text>
            <Text style={styles.subTitle}>Grandes obras da literatura mundial</Text>

            <FlatList
                data={books}
                keyExtractor={item => item.id}
                renderItem={renderBook}
                contentContainerStyle={styles.listContent}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F9FAFB",
        paddingHorizontal: 20,
        paddingTop: 40,
    },
    headerTitle: {
        fontSize: 28,
        fontWeight: "800",
        color: "#1A73E8",
        marginBottom: 5,
    },
    subTitle: {
        fontSize: 16,
        color: "#6B7280",
        marginBottom: 20,
    },
    listContent: {
        paddingBottom: 20,
    },
    card: {
        backgroundColor: "#FFF",
        borderRadius: 12,
        marginBottom: 16,
        padding: 20,
        elevation: 2,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.08,
        shadowRadius: 3,
        borderWidth: 1,
        borderColor: "#F3F4F6",
        // Altura automática (sem height fixo)
    },
    infoContainer: {
        flex: 1,
        justifyContent: "flex-start",
    },
    bookTitle: {
        fontSize: 18,
        fontWeight: "700",
        color: "#111827",
        marginBottom: 2,
    },
    author: {
        fontSize: 14,
        color: "#4B5563",
        fontWeight: "600",
        marginBottom: 10,
    },
    description: {
        fontSize: 14,
        color: "#6B7280",
        lineHeight: 20,
        marginBottom: 15,
    },
    linkText: {
        fontSize: 14,
        color: "#1A73E8",
        fontWeight: "700",
        alignSelf: 'flex-end'
    }
});