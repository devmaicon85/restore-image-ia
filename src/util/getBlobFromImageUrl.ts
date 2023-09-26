export async function getBlobFromImageUrl(imageUrl: string): Promise<Blob | null> {
    try {
        const response = await fetch(imageUrl);

        if (response.ok) {
            const blob = await response.blob();
            return blob;
        } else {
            console.error('Erro ao obter o blob da imagem:', response.status, response.statusText);
            return null;
        }
    } catch (error) {
        console.error('Erro ao obter o blob da imagem:', error);
        return null;
    }
}