import { ResultSearch } from "@/types/ResultSearch";
import { Card } from "../ui/card";
import { Label } from "../ui/label";

type Props ={
    result: ResultSearch;
}
export const SearchReveal = ({result}: Props) => {
    return (
        <Card className="w-[350px]">
            <div className="grid w-full items-center gap-1">
                <Label htmlFor="peopleName" className="my-10 text-3xl">{result.people.name}</Label>
            </div>
            <div className="grid w-full items-center gap-1">
                <Label htmlFor="congratulations" className="my-10">Parabens, voce tirou:</Label>
            </div>
            <div className="grid w-full items-center gap-1">
                <Label 
                    htmlFor="peopleMatched" 
                    className="text-4xl bg-blue-800 my-5 px-5 py-5 rounded border-2 border-blue-300">
                    {result.peopleMatched.name}
                </Label>
            </div>
        </Card>
    );
}