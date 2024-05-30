import { Button } from "@/components/ui/button";

type ButtonType = "link" | "secondary" | "destructive" | "default" | "outline" | "ghost" ;
type Props = {
    value: string;
    variant: ButtonType;
    onClick?: () => void;
    disabled?: boolean;
}
export function ButtonDemo({value, variant, onClick, disabled}: Props) {
    return (
        <Button  
            variant={variant} 
            onClick={onClick} 
            disabled={disabled} 
            className="w-full uppercase font-bold"
        >
                {value}
        </Button>
    );
}