
export async function openImageUrl(imageUrl: string) {
    const a = document.createElement("a");
    document.body.appendChild(a);
    
    a.href = imageUrl;
    a.target = "_blank";
    a.click();
    document.body.removeChild(a);
}
