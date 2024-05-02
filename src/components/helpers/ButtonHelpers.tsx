import { LucideIcon, RotateCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

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
            // onClick={onClick} 
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

type ItemButtonProps = {
    IconElement: LucideIcon;
    label?: string;
    onClick?: () => void;
    href?: string;
    target?: string;
    replace?: boolean;
}

export const ItemButton = ({IconElement, label, onClick, href, target, replace}:ItemButtonProps) => {
    const content = (
        <div className="p-3 flex flex-col justify-center items-center gap-2 md:flex-row">
            <div><IconElement /></div>
            {label && <div>{label}</div>}
        </div>
    );

    return (
        <div className="rounded hover:bg-gray-800">
            {href && !onClick && 
                <Link
                    href={href}
                    target={target}
                    replace={replace}
                >
                    {content}
                </Link>
            }
            {!href && onClick && !label && 
                <Button variant="ghost" size={"icon"} onClick={onClick} className="cursor-pointer">
                    {content}
                </Button>
            }
            {!href && onClick && label &&
                <Button variant="ghost" onClick={onClick} className="cursor-pointer">
                    {content}
                </Button>
            }
        </div>
    );
}