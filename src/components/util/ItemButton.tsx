import Link from "next/link";
import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";

type Props = {
    IconElement: LucideIcon;
    label?: string;
    onClick?: () => void;
    href?: string;
    target?: string;
    replace?: boolean;
}
export const ItemButton = ({IconElement, label, onClick, href, target, replace}:Props) => {
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