'use client'

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { escapeCPF } from "@/lib/escapeCPF";
import { useState } from "react";
import { ButtonDisabled, ShowButton } from "../helpers/ButtonHelpers";
import { ShowInformation, ShowWarning } from "../helpers/AlertHelpers";

type Props = {
    onSearchButton: (cpf: string) => void;
    loading: boolean;
    warning: boolean;
    info: boolean;
}

export const SearchForm = ({onSearchButton, loading, warning, info}: Props) => {
    const [cpfInput, setCpfInput] = useState('');

    return (
        <Card>
            <Label htmlFor="labelCPF" className="w-full mb-3 items-center">Qual o seu CPF</Label>
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
            {loading && <ButtonDisabled />}
            {!loading && <ShowButton label="Entrar" onClick={() => onSearchButton(cpfInput)}/>}
            {info && <ShowInformation message="Nao foi informado um CPF!"/> }
            {warning && <ShowWarning message="Nao Encontramos o seu CPF!"/> }
            {/* <Button  */}
                {/* onClick={ () => onSearchButton(cpfInput) } */}
                {/* disabled={loading} */}
                {/* className="w-full p-3 mt-3 rounded bg-blue-800 text-white border-b-4 border-blue-600 active:border-0" */}
            {/* > */}
                    {/* {loading?'Buscando...':'Entrar'} */}
            {/* </Button> */}
        </Card>
    );
}