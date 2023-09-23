"use client";

import { useDropzone } from "react-dropzone";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Folder, PlusCircle, Radio, Save } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

import { uuid } from "uuidv4";
import { useRouter } from "next/navigation";
import {
    FOLDER_IMAGES,
    FOLDER_PROCESSING,
    FOLDER_RESTORED,
} from "@/util/constants";
import { Skeleton } from "../ui/skeleton";

interface FilePreview {
    file: Blob;
    preview: string;
}

interface FileToProcess {
    path: string;
}

export function ImageUploadPlaceholder() {
    const [nameImage, setNameImage] = useState(`${uuid()}.png`);
    const router = useRouter();
    const [isMounted, setIsMounted] = useState(false);

    const [file, setFile] = useState<FilePreview | null>();
    const [restoredFile, setRestoredFile] = useState<FilePreview | null>();

    const [restoring, setRestoring] = useState(false);
    const [importing, setImporting] = useState(false);

    const onDrop = useCallback(async (accessFiles: File[]) => {
        try {
            setImporting(true);
            const file = accessFiles[0];

            const preview = URL.createObjectURL(file);

            setFile({ file, preview });

            const supabase = createClientComponentClient();

            const { data, error } = await supabase.storage
                .from(FOLDER_IMAGES)
                .upload(`${FOLDER_PROCESSING}/${nameImage}`, file);

            if (!error) {
                restauredImage(data);
                console.log("🚀 ~ onDrop ~ 65:", data);
            } else {
                alert(error.message);
            }
        } catch (error) {
            console.log("🚀~ onDrop ~ 70:", error);
        } finally {
            setImporting(false);
        }
    }, []);

    const { getInputProps, getRootProps, isDragActive } = useDropzone({
        onDrop: onDrop,
        maxFiles: 1,
        accept: {
            "image/png": [".png"],
            "image/jpeg": [".jpg"],
        },
    });

    useEffect(() => {
        setIsMounted(true);
        return () => {
            if (file) URL.revokeObjectURL(file.preview);
            if (restoredFile) URL.revokeObjectURL(restoredFile.preview);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    async function reset() {
        setFile(null);
        setRestoredFile(null);
        setNameImage(`${uuid()}.png`);
        router.refresh();
    }
    async function restauredImage(file: FileToProcess) {
        if (!file) {
            alert("Nenhum arquivo selecionado");
            return;
        }
        try {
            setRestoring(true);
            const supabase = createClientComponentClient();
            const {
                data: { publicUrl },
            } = supabase.storage
                .from(FOLDER_IMAGES)
                .getPublicUrl(`${file?.path}`);

            const res = await fetch("/api/ai/replicate", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ imageUrl: publicUrl }),
            });

            const restoredImageUrl = await res.json();
            const readImageRes = await fetch(restoredImageUrl.data);
            const imageBlob = await readImageRes.blob();
            setRestoredFile({
                file: imageBlob,
                preview: URL.createObjectURL(imageBlob),
            });

            const { data, error } = await supabase.storage
                .from(FOLDER_IMAGES)
                .upload(`${FOLDER_RESTORED}/${nameImage}`, imageBlob);

            if (error) {
                
                setRestoredFile(null);
                alert("Erro ao restaurar a foto");
            }
        } catch (error) {
            setFile(null);
            setRestoredFile(null);
            console.log(
                "🚀 ~ file: image-upload-placeholder.tsx:92 ~ handleSend ~ error:",
                error
            );
        } finally {
            setRestoring(false);
            reset();

        }
    }

    if (!isMounted) return null;

    return (
        <div className="flex  w-full shrink-0 items-center justify-center rounded-md ">
            <div className="mx-auto flex  flex-col items-center justify-center text-center">
                {!file && (
                    <div {...getRootProps()}>
                        <Input {...getInputProps()} />
                        {isDragActive ? (
                            <p className="flex items-center justify-center  opacity-70 border-2 cursor-pointer border-dashed p-6 h-36 rounded-md">
                                Solte a imagem para importar
                            </p>
                        ) : (
                            <div className="flex justify-center flex-col border-2 p-6 rounded-lg border-dashed cursor-pointer  opacity-70">
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
