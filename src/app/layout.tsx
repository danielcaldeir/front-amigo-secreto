import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Amigo Secreto",
  description: "Aplicação de geraçao de uma lista de Amigos Secretos",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className={inter.className}>
        <div className='flex h-full flex-col'>
          {children}
        </div>
      </body>
    </html>
  );
}
