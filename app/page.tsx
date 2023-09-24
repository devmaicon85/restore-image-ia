import { redirect } from "next/navigation";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CreateAccountForm } from "@/components/auth/create-account-form";
import { LoginAccountForm } from "@/components/auth/login-account-form";
import { getSessionAuthServer } from "@/lib/supabase/auth/getSessionAuthServer";

export default async function Home() {
    const { data, error } = await getSessionAuthServer();

    const session = data.session;
    if (session?.user.id) {
        redirect(`/user-app`);
    }

    return (
        <div className="flex flex-col h-screen w-full justify-center items-center">
            <Tabs defaultValue="create-account" className="w-[400px]">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger
                        value="create-account"
                        className="transition-all delay-150"
                    >
                        Criar Conta
                    </TabsTrigger>
                    <TabsTrigger
                        value="login"
                        className="transition-all delay-150"
                    >
                        Entrar
                    </TabsTrigger>
                </TabsList>
                <TabsContent value="create-account">
                    <Card>
                        <CardHeader>
                            <CardTitle>Criar Conta</CardTitle>
                            <CardDescription>
                                Crie sua conta agora e comece a usar
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <CreateAccountForm />
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="login">
                    <Card>
                        <CardHeader>
                            <CardTitle>Entrar no sistema</CardTitle>
                            <CardDescription>
                                Preencha com suas credenciais para entrar
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <LoginAccountForm />
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
