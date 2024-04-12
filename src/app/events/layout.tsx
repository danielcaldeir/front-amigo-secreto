import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
// import "./globals.css";
import { ReactNode } from "react";

// const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Amigo Secreto",
  description: "Aplicação de geraçao de uma lista de Amigos Secretos",
};

type Props = {
    children: ReactNode;
}

const Layout = ({ children, }: Props) => {
  return (
    <Card className='flex h-full flex-col'>
        <CardHeader className="bg-slate-700 text-center py-5">
            <CardTitle>Amigo Secreto</CardTitle>
            {/* <CardDescription>Painel de Controle</CardDescription> */}
        </CardHeader>
        <main className="bg-slate-400">{children}</main>
        {/* <Card> */}
            {/* <CardFooter> */}
                {/* <Label>Criado por Daniel Caldeira</Label> */}
            {/* </CardFooter> */}
        {/* </Card> */}
    </Card>
  );
}
 export default Layout;