export const FOLDER_IMAGES = process.env.NEXT_PUBLIC_FOLDER_IMAGES;
export const BUCKET_IMAGE_URL = process.env.NEXT_PUBLIC_SUPABASE_APP_BUCKET_IMAGE_URL;


type PathImage = "Processing" | "Restored"

export function getPathImage(userId: string, pathImagem: PathImage, imageName?: string) {

    let path = "";

    if (pathImagem === "Processing") {
        path = `${userId}/${process.env.NEXT_PUBLIC_FOLDER_PROCESSING}`;
    } else {
        path = `${userId}/${process.env.NEXT_PUBLIC_FOLDER_RESTORED}`;
    }

    if (imageName !== undefined) {
        path += `/${imageName}`
    }

    return path;
}

