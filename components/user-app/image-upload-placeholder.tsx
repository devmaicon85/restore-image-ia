"use client";

import { useDropzone } from "react-dropzone";

import { Input } from "@/components/ui/input";
import { Radio } from "lucide-react";
import { useEffect, useState } from "react";
import Image from "next/image";

import { v4 as uuid } from "uuid";
import { useRouter } from "next/navigation";
import { Skeleton } from "../ui/skeleton";
import { useAuthProvider } from "@/providers/AuthProvider";

import { FileToProcess } from "@/types";
import { getBlobFromImageUrl } from "@/util/getBlobFromImageUrl";
import { uploadFileStorageClient } from "@/lib/supabase/storage/uploadFileStorageClient";
import { getFileStorageClient } from "@/lib/supabase/storage/getFileStorageClient";
import { deleteFilesStorageClient } from "@/lib/supabase/storage/deleteFilesStoreClient";
import { getPathFileStorage } from "@/util/getPathFileStorage";

export interface FilePreview {
    file: Blob;
    preview: string;
}

export function ImageUploadPlaceholder() {
    const [nameImage, setNameImage] = useState("");
    const { user } = useAuthProvider();

    const router = useRouter();
    const [isMounted, setIsMounted] = useState(false);

    const [file, setFile] = useState<FilePreview | null>();

    const [restoring, setRestoring] = useState(false);
    const [importing, setImporting] = useState(false);

    async function onDrop(accessFiles: File[]) {
        if (!user) {
            alert("Nenhum usuário logado");
            return;
        }

        try {
            setImporting(true);
            const file = accessFiles[0];
            const preview = URL.createObjectURL(file);
            setFile({ file, preview });

            const path = getPathFileStorage({
                userId: user.id,
                pathImagem: "Processing",
                imageName: nameImage,
            });
            // const path = getPathImage(user.id, "Processing", nameImage);

            const { data } = await uploadFileStorageClient(path, file);

            restauredImage(data);
        } catch (error: any) {
            alert(`Erro ao restaurar ${error.message}:${error.name}`);
            console.log("🚀~ onDrop ~ 70:", error);
            reset();
        } finally {
            setImporting(false);
        }
    }

    const { getInputProps, getRootProps, isDragActive } = useDropzone({
        onDrop: onDrop,
        maxFiles: 1,
        accept: {
            "image/png": [".png"],
            "image/jpeg": [".jpg"],
        },
    });

    useEffect(() => {
        reset();
        setIsMounted(true);
        return () => {
            if (file) URL.revokeObjectURL(file.preview);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    async function reset() {
        setFile(null);
        setRestoring(false);
        setImporting(false);
        setNameImage(`${uuid()}.png`);
        router.refresh();
    }
    async function restauredImage(file: FileToProcess) {
        if (!user) {
            throw new Error("Nenhum usuário logado");
        }

        try {
            if (!file) {
                throw new Error("Arquivo não encontrado");
            }

            setRestoring(true);

            const { publicUrl } = await getFileStorageClient(file);

            const res = await fetch("/api/ai/replicate", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ imageUrl: publicUrl }),
            });

            const restoredImageUrl = await res.json();

            if (restoredImageUrl.error) {
                throw new Error(restoredImageUrl.error);
            }
            const blob = await getBlobFromImageUrl(restoredImageUrl.data);
            if (!blob) {
                throw new Error("Arquivo Blob não foi montado");
            }

            // const path = getPathImage(user.id, "Restored", nameImage);
            const path = getPathFileStorage({
                userId: user.id,
                pathImagem: "Restored",
                imageName: nameImage,
            });

            await uploadFileStorageClient(path, blob);
        } catch (error: any) {
            alert(`Erro ao restaurar ${error.message}`);

            // exclui a imagem original caso a restauração falhe.
            // const path = getPathImage(user.id, "Processing", nameImage);
            const path = getPathFileStorage({
                userId: user.id,
                pathImagem: "Processing",
                imageName: nameImage,
            });
            deleteFilesStorageClient([path]);
        } finally {
            reset();
        }
    }

    if (!isMounted) return null;

    return (
        <div className="flex  w-full shrink-0 items-center justify-center rounded-md ">
            <div className="mx-auto flex]  flex-col items-center justify-center text-center">
                {!file && (
                    <div {...getRootProps()} className="w-96">
                        <Input {...getInputProps()} />
                        {isDragActive ? (
                            <p className="flex items-center justify-center  opacity-70 border-2 cursor-pointer border-dashed hover:border-blue-500 p-6 h-36 rounded-md">
                                Solte a imagem para importar
                            </p>
                        ) : (
                            <div className="flex justify-center flex-col border-2 p-6 rounded-lg border-dashed hover:border-blue-500 cursor-pointer  opacity-70">
                                <Radio className="h-12 w-12 mx-auto" />

                                <h3 className="mt-4 text-lg font-semibold">
                                    Restaure novas lembranças
                                </h3>
                                <p className="mb-4 mt-2 text-sm text-muted-foreground">
                                    Arraste ou Clique para importar
                                </p>
                            </div>
                        )}
                    </div>
                )}
                <div className="flex flex-col items-center justify-evenly sm:flex-row">
                    {file && (
                        <div className="flex flex-row  flex-wrap drop-shadow-md">
                            <div className="flex  relative flex-col gap-4 text-center">
                                <Skeleton>
                                    <Image
                                        width={256}
                                        height={256}
                                        src={file.preview}
                                        alt="preview"
                                        className=" rounded-md object-contain"
                                        onLoad={() => {
                                            URL.revokeObjectURL(file.preview);
                                        }}
                                    />
                                </Skeleton>

                                <div className="text-sm">
                                    {importing && "Importando..."}
                                    {restoring && "Restaurando..."}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
