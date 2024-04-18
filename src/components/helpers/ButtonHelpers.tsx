import { RotateCw } from "lucide-react";
import { Button } from "@/components/ui/button";

type ButtonProps = {
    label: string;
    onClick?: () => void;
}
export const ShowButtonSubmit = ({label, onClick}: ButtonProps) => {
    return (
        <Button 
            type="submit"
            variant="default" 
            size="lg" 
            onClick={onClick} 
            className="w-full uppercase font-bold"
        >
                {label}
        </Button>
    );
}

export const ShowButtonReset = ({label, onClick}: ButtonProps) => {
    return (
        <Button 
            type="reset"
            variant="default" 
            size="lg" 
            onClick={onClick} 
            className="w-full uppercase font-bold"
        >
                {label}
        </Button>
    );
}

export const ShowButton = ({label, onClick}: ButtonProps) => {
    return (
        <Button 
            type="button"
            variant="default" 
            size="lg" 
            onClick={onClick} 
            className="w-full uppercase font-bold"
        >
                {label}
        </Button>
    );
}

export const ButtonDisabled = () => {
    return (
        <Button disabled>
            <RotateCw className="mr-2 h-4 w-4 animate-spin" />
            Por Favor Espere
        </Button>
    );
}

export const ItemButton = () => {
    return (
        <Button>

        </Button>
    );
}