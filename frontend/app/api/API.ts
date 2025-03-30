export const fetchApiData = async (
    setMessage: (msg: string) => void,
    setIsFetching: (status: boolean) => void
) => {
    setIsFetching(true);
    setMessage(""); // Réinitialiser le message avant la requête

    try {
        const response = await fetch("http://192.168.47.147:5000");
        if (!response.ok) {
            throw new Error(`Erreur HTTP: ${response.status}`);
        }
        const json = await response.json();

        setMessage(json?.message ?? "Message non disponible.");
    } catch (error) {
        console.error("Erreur :", error);
        setMessage("Erreur de connexion");
    } finally {
        setIsFetching(false);
    }
};

export default fetchApiData; // 🔹 Ajout d'une exportation par défaut
