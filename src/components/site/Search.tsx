"use client"

import { ResultSearch } from "@/types/ResultSearch";
import { InfoIcon, SearchCheck } from "lucide-react";
import { useState } from "react";
import { SearchForm } from "@/components/site/SearchForm";
import { searchCPF } from "@/api/site";
// import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, 
    AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, 
    AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { SearchReveal } from "./SearchReveal";
// import { AlertDialogAction } from "@radix-ui/react-alert-dialog";

export function AlertDialogDemo() {
    return (
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="outline">Show Dialog</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    )
}

type Props = {
    id: number;
}

export const Search = ({ id }: Props) => {
    const [result, setResult] = useState<ResultSearch>();
    const [loading, setLoading] = useState(false);

    const handleSearchButton = async (cpf: string) => {
        if (!cpf) return( alert('Nao foi informado um CPF'));
        setLoading(true);
        const cpfResult = await searchCPF(id, cpf);
        setLoading(false);
        if (!cpfResult) return ( alert('Nao Encontramos o seu CPF') );

        setResult(cpfResult);
    }

    return(
        <section className="bg-gray-900 p-5 rounded">
            {!result && <SearchForm onSearchButton={handleSearchButton} loading={loading} />}
            {result && <SearchReveal result={result} />}
        </section>
    );
}