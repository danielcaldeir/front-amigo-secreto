"use client"

import { login } from "@/api/admin";
import { ShowWarning } from "@/components/helpers/AlertHelpers";
import { ButtonDisabled, ShowButtonSubmit } from "@/components/helpers/ButtonHelpers";
import { Button } from "@/components/ui/button";
import { Card, CardFooter } from "@/components/ui/card";
import { 
    Form, 
    FormControl, 
    FormDescription, 
    FormField, 
    FormItem, 
    FormLabel, 
    FormMessage 
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { setCookie } from "cookies-next";
import { RotateCw } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
    // username: z.string().min(2, { message: "Username must be at least 2 characters.", }).max(50),
    password: z.string().min(2).max(50),
})

const Page = () => {
    const [warning, setWarning] = useState(false);
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            // username: "",
            password: "",
        },
    })
    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values);
        setLoading(true);
        setWarning(false);
        console.log(values.password);
        clickLogin(values.password);
    }
    const clickLogin = async (password: string) => {
        // console.log('password');
        const token = await login(password);
        setLoading(false);
        console.log(token);
        if (!token) {
            setWarning(true);
        } else {
            console.log(token);
            setCookie('token', token);
            router.push('/admin');
        }
        return token;
    } 

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-20">
            <Card>
                    {/* <p>Login - Pagina de Login do Amigo Secreto</p> */}
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            {/* <FormField control={form.control} name="username" */}
                                {/* render={({ field }) => ( */}
                                    {/* <FormItem> */}
                                        {/* <FormLabel>Username</FormLabel> */}
                                        {/* <FormControl> */}
                                        {/* <Input type="text" placeholder="Informe o usuario" className="outline-none bg-gray-500 text-white" {...field} /> */}
                                        {/* </FormControl> */}
                                        {/* <FormDescription>This is your public display name.</FormDescription> */}
                                        {/* <FormMessage /> */}
                                    {/* </FormItem> */}
                                {/* )} */}
                            {/* /> */}
                            <FormField 
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Senha</FormLabel>
                                        <FormControl>
                                        <Input 
                                            type="password" 
                                            placeholder="Digite a Senha" 
                                            disabled={loading}
                                            className="outline-none bg-gray-300 text-white" 
                                            {...field} />
                                        </FormControl>
                                        {/* <FormDescription>This is your public display name.</FormDescription> */}
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            {loading && <ButtonDisabled /> }
                            {!loading && <ShowButtonSubmit label="Entrar" /> }
                            {warning && <ShowWarning message="Acesso Negado!"/> }
                            {/* {loading &&  */}
                                {/* <Button disabled> */}
                                    {/* <RotateCw className="mr-2 h-4 w-4 animate-spin" /> */}
                                    {/* Please wait */}
                                {/* </Button> */}
                            {/* } */}
                            {/* {!loading && */}
                                {/* <Button  */}
                                    {/* type="submit"  */}
                                    {/* variant="default"  */}
                                    {/* size="lg"  */}
                                    {/* className="w-full uppercase font-bold"> */}
                                        {/* Entrar */}
                                {/* </Button> */}
                            {/* } */}
                            {/* <Alert variant="destructive"> */}
                                {/* <RocketIcon className="h-4 w-4" /> */}
                                {/* <MessageSquareWarningIcon className="h-4 w-4" /> */}
                                {/* <MessageCircleWarningIcon className="h-4 w-4" /> */}
                                {/* <AlertTriangleIcon className="h-4 w-4" /> */}
                                {/* <AlertTitle>Warning</AlertTitle> */}
                                {/* <AlertDescription> */}
                                    {/* Acesso Negado!! */}
                                {/* </AlertDescription> */}
                            {/* </Alert> */}
                        </form>
                    </Form>
            </Card>
            <Card>
                <CardFooter>
                    <Label>Criado por Daniel Caldeira</Label>
                </CardFooter>
            </Card>
        </main>
    );
}

export default Page;