import {
    Session,
    createServerComponentClient,
} from "@supabase/auth-helpers-nextjs";
import { RedirectType, redirect } from "next/navigation";

import { cookies } from "next/headers";
import UserAppHeader from "@/components/user-app/header";
import { SideBar } from "@/components/user-app/sidebar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { ImageUploadPlaceholder } from "@/components/user-app/image-upload-placeholder";
import { ListImages } from "@/components/user-app/list-images";
import {
    BUCKET_IMAGE_URL,
    FOLDER_IMAGES,
    getPathImage,
} from "@/util/constants";
import { AuthProvider } from "@/providers/AuthProvider";
interface Props {
    params: { userId: string };
}
export default async function UserApp({ params }: Props) {
    const supabase = createServerComponentClient({ cookies });

    const { data, error: sessionError } = await supabase.auth.getSession();
    const session = data.session;

    if (!session || sessionError) {
        redirect("/", RedirectType.replace);
    }

    const { data: restoredImages, error } = await supabase.storage
        .from(FOLDER_IMAGES)
        .list(getPathImage(session.user.id, "Processing"), {
            limit: 10,
            offset: 0,
            sortBy: { column: "created_at", order: "desc" },
        });

    if (error) {
        alert("erro ao listar imagens");
    }

    return (
        <AuthProvider>
            <UserAppHeader />
            <div className="border-t">
                <div className="bg-background">
                    <div className="grid lg:grid-cols-5">
                        <SideBar className="hidden lg:block" />
                        <div className="col-span-3 lg:col-span-4 lg:border-l">
                            <div className="h-full px-4 py-6 lg:px-8">
                                <Tabs
                                    defaultValue="list"
                                    className="h-full space-y-6"
                                >
                                    <div className="space-between flex items-center">
                                        <TabsList>
                                            <TabsTrigger
                                                value="list"
                                                className="relative"
                                            >
                                                Restauradas
                                            </TabsTrigger>
                                            <TabsTrigger value="originals">
                                                Originais
                                            </TabsTrigger>
                                        </TabsList>
                                    </div>
                                    <TabsContent
                                        value="list"
                                        className="border-none p-0 outline-none"
                                    >
                                        <div className="flex items-center justify-between">
                                            <div className="space-y-1">
                                                <h2 className="text-2xl font-semibold tracking-tight">
                                                    Imagens Restauradas
                                                </h2>
                                                <p className="text-sm text-muted-foreground">
                                                    Listagem das imagens
                                                    restauradas pela IA
                                                </p>
                                            </div>
                                        </div>
                                        <Separator className="my-4" />
                                        <div className="relative">
                                            <ImageUploadPlaceholder />
                                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 m-10">
                                                {restoredImages?.map(
                                                    (image) => (
                                                        <ListImages
                                                            key={image.id}
                                                            image={image}
                                                            width={250}
                                                            height={250}
                                                            url={`${BUCKET_IMAGE_URL}/${getPathImage(
                                                                session.user.id,
                                                                "Restored",
                                                                image.name
                                                            )}`}
                                                        />
                                                    )
                                                )}
                                            </div>
                                        </div>

                                        <div className="relative"></div>
                                    </TabsContent>
                                    <TabsContent
                                        value="originals"
                                        className="h-full flex-col border-none p-0 data-[state=active]:flex"
                                    >
                                        <div className="flex items-center justify-between">
                                            <div className="space-y-1">
                                                <h2 className="text-2xl font-semibold tracking-tight">
                                                    Imagens Originas
                                                </h2>
                                                <p className="text-sm text-muted-foreground">
                                                    as imagens originais
                                                    enviadas por você
                                                </p>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 m-10">
                                            {restoredImages?.map((image) => (
                                                <ListImages
                                                    key={image.id}
                                                    image={image}
                                                    width={250}
                                                    height={250}
                                                    url={`${BUCKET_IMAGE_URL}/${getPathImage(
                                                        session.user.id,
                                                        "Processing",
                                                        image.name
                                                    )}`}
                                                />
                                            ))}
                                        </div>
                                        <Separator className="my-4" />
                                    </TabsContent>
                                </Tabs>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthProvider>
    );
}
