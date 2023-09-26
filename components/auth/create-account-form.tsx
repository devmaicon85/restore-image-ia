"use client";

import { Button } from "../ui/button";

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { toast } from "../ui/use-toast";

const formSchema = z.object({
    name: z
        .string()
        .min(2, "Informe seu nome")
        .max(50, "O nome deve ter no máximo 50 caracteres"),
    email: z.string().email("Informe um email válido"),
    password: z.string().min(6, "A senha deve ter no mínimo 6 caracteres"),
});

type FormDataType = z.infer<typeof formSchema>;

export function CreateAccountForm() {
    const router = useRouter();
    const form = useForm<FormDataType>({
        resolver: zodResolver(formSchema as any),
        defaultValues: { name: "", email: "", password: "" },
    });

    async function onSubmit(values: FormDataType) {
        try {
            const supabase = createClientComponentClient();
            const { email, name, password } = values;

            const {
                data: { user },
                error,
            } = await supabase.auth.signUp({
                email,
                password,
                // options: {
                //     emailRedirectTo: `${location.origin}/api/auth/callback`,
                //     data: {
                //         name,
                //     },
                // },
            });

            if (error?.status == 400) {
                toast({
                    title: "Usuário já cadastrado",
                    variant: "destructive",
                    description:
                        "O e-mail que você informou já está cadastrado. Faça Login",
                });
            }

            if (user) {
                form.reset();
                router.refresh();
            }
        } catch (error) {
            console.log(
                "🚀 ~ file: create-account-form.tsx:46 ~ onSubmit ~ error:",
                error
            );
            toast({
                title: "Erro",
                variant: "destructive",
                description:
                    "Erro ao registrar usuário. Consulte o log para mais informações",
            });
        }
    }

    return (
        <div className="flex flex-col justify-center items-center">
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className=" w-full  space-y-4 "
                >
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Nome</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="digite seu nome..."
                                        {...field}
                                    />
                                </FormControl>
                                <FormDescription></FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>E-mail</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="digite seu e-mail..."
                                        {...field}
                                    />
                                </FormControl>
                                <FormDescription></FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Senha</FormLabel>
                                <FormControl>
                                    <Input
                                        type="password"
                                        placeholder="digite uma senha..."
                                        {...field}
                                    />
                                </FormControl>
                                <FormDescription></FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button
                        type="submit"
                        className="flex justify-center w-full"
                    >
                        Criar minha conta
                    </Button>
                </form>
            </Form>
        </div>
    );
}
