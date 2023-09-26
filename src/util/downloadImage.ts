export async function downloadImageUrl(imageUrl: string, filename: string) {
    const a = document.createElement("a");
    document.body.appendChild(a);

    const fetchImage = await fetch(imageUrl);
    const response = await fetchImage.blob();

    const blob = new Blob([response], { type: "image/jpeg" });
    const url = window.URL.createObjectURL(blob);

    a.href = url;
    a.download = filename;
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);


}