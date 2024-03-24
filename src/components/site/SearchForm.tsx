'use client'

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { escapeCPF } from "@/lib/escapeCPF";
import { useState } from "react";

type Props = {
    onSearchButton: (cpf: string) => void;
    loading: boolean;
}

export const SearchForm = ({onSearchButton, loading}: Props) => {
    const [cpfInput, setCpfInput] = useState('');

    return (
        <Card>
            <Label htmlFor="labelCPF" className="mb-3 text-center">Qual o seu CPF</Label>
            <Input 
                type="text" 
                placeholder="Digite seu CPF" 
                inputMode="numeric" 
                className="w-full p-3 bg-white text-black text-center outline-none rounded"
                autoFocus
                value={cpfInput}
                disabled={loading}
                onChange={e => setCpfInput(escapeCPF(e.target.value))}
            />
            <Button 
                onClick={ () => onSearchButton(cpfInput) }
                disabled={loading}
                className="w-full p-3 mt-3 rounded bg-blue-800 text-white border-b-4 border-blue-600 active:border-0"
            >{loading?'Buscando...':'Entrar'}</Button>
        </Card>
    );
}