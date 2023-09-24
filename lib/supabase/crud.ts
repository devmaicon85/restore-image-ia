import { FileToProcess } from "@/types";
import { FOLDER_IMAGES } from "@/util/constants";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
const supabase = createClientComponentClient();

export async function deleteImageSupabase(images: string[]) {
    if (!images) {
        throw new Error("Nenhum arquivo selecionado");

    }

    const { error } = await supabase.storage
        .from(FOLDER_IMAGES)
        .remove(images);

    if (error) {
        throw new Error("erro ao deletar imagem");
    }
}


export async function uploadImageSupabase(path: string, file: File | Blob) {
    if (!file) {
        throw new Error("Nenhum arquivo selecionado");
    }

    console.log("🚀 ~ file: crud.ts:30 ~ uploadImageSupabase ~ path:", path)
    console.log("🚀 ~ file: crud.ts:30 ~ uploadImageSupabase ~ file:", file)

    const { data, error } = await supabase.storage
        .from(FOLDER_IMAGES)
        .upload(path, file);

    if (error) {
        throw new Error("erro ao enviar imagem");
    }

    return { data }

}

export async function getImageSupabase(file: FileToProcess) {

    if (!file) {
        throw new Error("Nenhum arquivo selecionado");
    }

    const {
        data: { publicUrl },
    } = supabase.storage
        .from(FOLDER_IMAGES)
        .getPublicUrl(`${file?.path}`);


    return { publicUrl }
}