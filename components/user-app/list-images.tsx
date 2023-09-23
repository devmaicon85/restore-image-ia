"use client";

import Image from "next/image";

import { cn } from "@/lib/utils";
import {
    ContextMenu,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuSub,
    ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { RestoredImage } from "@/types";
import { downloadImageUrl, openImageUrl } from "@/util/downloadAndOpenImage";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
    image: RestoredImage;
    width?: number;
    height?: number;
    url: string;
}

export function ListImages({
    image,
    width,
    height,
    url,
    className,
    ...props
}: Props) {
    async function handleDownloadImage(image: string) {
        const urlFull = `${url}/${image}`;

        downloadImageUrl(urlFull, image);
        // const supabase = createClientComponentClient();
        // const { data, error } = await supabase.storage
        //     .from(folder)
        //     .download(url);
    }

    async function handleOpenImage(image: string) {
        const urlFull = `${url}/${image}`;
        openImageUrl(urlFull);
    }

    return (
        <div className={cn("space-y-3", className)} {...props}>
            <ContextMenu>
                <ContextMenuTrigger>
                    <Image
                        src={`${url}/${image.name}`}
                        alt={image.name}
                        width={width}
                        height={height}
                        className={cn(
                            " rounded-lg transition-all hover:scale-105"
                        )}
                    />
                </ContextMenuTrigger>
                <ContextMenuContent className="w-40">
                    <ContextMenuItem
                        onClick={() => {
                            handleOpenImage(image.name);
                        }}
                    >
                        Abrir Imagem
                    </ContextMenuItem>
                    <ContextMenuSub>
                        {/* <ContextMenuSubTrigger>
                            Adicionar a Coleção
                        </ContextMenuSubTrigger>
                        <ContextMenuSubContent className="w-48">
                            <ContextMenuItem>
                                <PlusCircle className="mr-2 h-4 w-4" />
                                Nova coleção
                            </ContextMenuItem>
                            <ContextMenuSeparator />
                           
                        </ContextMenuSubContent> */}
                    </ContextMenuSub>

                    <ContextMenuItem
                        onClick={() => {
                            handleDownloadImage(image.name);
                        }}
                    >
                        Download
                    </ContextMenuItem>
                    {/* <ContextMenuSeparator /> */}
                    {/* <ContextMenuItem>Copiar Link</ContextMenuItem> */}
                </ContextMenuContent>
            </ContextMenu>
            <div className="space-y-1 text-sm">
                {/* <h3 className="font-medium leading-none">{image.name}</h3> */}
            </div>
        </div>
    );
}
