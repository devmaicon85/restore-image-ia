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
    email: z.string().email("Informe um email válido"),
    password: z.string().min(6, "A senha deve ter no mínimo 6 caracteres"),
});

type FormDataType = z.infer<typeof formSchema>;

export function LoginAccountForm() {
    const router = useRouter();
    const form = useForm<FormDataType>({
        resolver: zodResolver(formSchema as any),
        defaultValues: { email: "", password: "" },
    });

    async function onSubmit(values: FormDataType) {
        try {
            const supabase = createClientComponentClient();
            const { email, password } = values;

            const {
                data: { session },
                error,
            } = await supabase.auth.signInWithPassword({ email, password });

            if (session) {
                form.reset();
                router.refresh();
            }

            if (error) {
                toast({
                    title: "Credenciais inválidas",
                    variant: "destructive",
                    description:
                        "O e-mail que você informou já está cadastrado. Faça Login",
                });
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
                    "Erro ao tentar efetuar o login. Consulte o log para mais informações",
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
                        Entrar
                    </Button>
                </form>
            </Form>
        </div>
    );
}
